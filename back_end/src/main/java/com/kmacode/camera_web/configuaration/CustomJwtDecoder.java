package com.kmacode.camera_web.configuaration;

import com.kmacode.camera_web.dto.request.IntrospectRequest;
import com.kmacode.camera_web.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Objects;

@Component
public class CustomJwtDecoder implements JwtDecoder {
    private static final Logger log = LoggerFactory.getLogger(CustomJwtDecoder.class);
    
    @Value("${jwt.signer.key}")
    private String signerKey;

    @Autowired
    private AuthenticationService authenticationService;

    private NimbusJwtDecoder nimbusJwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {
        log.info("Decoding token: {}", token);
        try {
            var response = authenticationService.introspect(IntrospectRequest.builder()
                    .token(token)
                    .build());
            if (!response.isValid()) {
                log.error("Token is invalid");
                throw new JwtException("Token invalid");
            }
            log.info("Token is valid");
        } catch (JOSEException | ParseException e) {
            log.error("Error validating token: {}", e.getMessage());
            throw new JwtException(e.getMessage());
        }

        if (Objects.isNull(nimbusJwtDecoder)) {
            SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
            nimbusJwtDecoder = NimbusJwtDecoder
                    .withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
            log.info("Created new NimbusJwtDecoder");
        }

        Jwt jwt = nimbusJwtDecoder.decode(token);
        log.info("Decoded JWT claims: {}", jwt.getClaims());
        return jwt;
    }
}
