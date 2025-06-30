package com.kmacode.camera_web.service;


import com.kmacode.camera_web.constant.PredefinedRole;
import com.kmacode.camera_web.dto.request.AuthenticationRequest;
import com.kmacode.camera_web.dto.request.ChangePasswordRequest;
import com.kmacode.camera_web.dto.request.ExchangeTokenRequest;
import com.kmacode.camera_web.dto.request.IntrospectRequest;
import com.kmacode.camera_web.dto.request.LogoutRequest;
import com.kmacode.camera_web.dto.response.AuthenticationResponse;
import com.kmacode.camera_web.dto.response.IntrospectResponse;
import com.kmacode.camera_web.dto.response.UserResponseDTO;
import com.kmacode.camera_web.entity.InvalidatedToken;
import com.kmacode.camera_web.entity.User;
import com.kmacode.camera_web.exception.AppException;
import com.kmacode.camera_web.exception.ErrorCode;
import com.kmacode.camera_web.mapper.UserMapper; 
import com.kmacode.camera_web.repository.InvalidatedTokenRepository;
import com.kmacode.camera_web.repository.UserRepository;
import com.kmacode.camera_web.repository.httpclient.OutboundIdentityClient;
import com.kmacode.camera_web.repository.httpclient.OutboundUserClient;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.StringJoiner;


@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Slf4j
public class AuthenticationService {

    UserRepository userRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;

    OutboundIdentityClient outboundIdentityClient;
    OutboundUserClient outboundUserClient;

    @NonFinal
    @Value("${jwt.signer.key}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${outbound.identity.client-id}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${outbound.identity.client-secret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${outbound.identity.redirect-uri}")
    protected String REDIRECT_URI;

    @NonFinal
    protected final String GRANT_TYPE = "authorization_code";


    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expityTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(verifier);
        return IntrospectResponse.builder()
                .valid(verified && expityTime.after(new Date()))
                .build();
    }


    public AuthenticationResponse outboundAuthenticate(String code){
        var response = outboundIdentityClient.exchangeToken(ExchangeTokenRequest.builder()
                .code(code)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_SECRET)
                .redirectUri(REDIRECT_URI)
                .grantType(GRANT_TYPE)
                .build());

        log.info("TOKEN RESPONSE {}", response);
        var userInfo = outboundUserClient.getUserInfo("json", response.getAccessToken());
        log.info("User Info {}", userInfo);

        Set<String> roles = new HashSet<>();
        roles.add(PredefinedRole.USER_ROLE);

        var user = userRepository.findByUsername(userInfo.getEmail()).orElseGet(
                () -> userRepository.save(User.builder()
                        .username(userInfo.getEmail())
                        .firstname(userInfo.getGivenName())
                        .lastname(userInfo.getFamilyName())
                        .roles(roles)
                        .build()));

        var token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken());
            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
            InvalidatedToken invalidatedToken =
                    InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();
            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException exception){
            log.info("Token already expired");
        }
    }

    public void changePassword(ChangePasswordRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USERNAME_NOT_EXISTED));

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCHED);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        log.info("Password for user {} changed successfully", request.getUsername());
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USERNAME_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if( !authenticated ) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        var token = generateToken(user);

        UserResponseDTO userResponseDTO = userMapper.toUserResponseDTO(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .user(userResponseDTO) 
                .build();
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("kmacode.tung")
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        boolean isSignatureValid = signedJWT.verify(verifier);
        if (!isSignatureValid) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        if (expiryTime == null || new Date().after(expiryTime)) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String tokenId = signedJWT.getJWTClaimsSet().getJWTID();
        if (tokenId != null && invalidatedTokenRepository.existsById(tokenId)) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        return signedJWT;
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if(!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(stringJoiner::add);
        }
        return stringJoiner.toString();
    }
}