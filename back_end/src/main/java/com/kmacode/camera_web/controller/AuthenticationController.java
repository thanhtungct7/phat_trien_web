package com.kmacode.camera_web.controller;

import com.kmacode.camera_web.dto.request.AuthenticationRequest;
import com.kmacode.camera_web.dto.request.ChangePasswordRequest;
import com.kmacode.camera_web.dto.request.IntrospectRequest;
import com.kmacode.camera_web.dto.request.LogoutRequest;
import com.kmacode.camera_web.dto.request.UserRequestDTO;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.AuthenticationResponse;
import com.kmacode.camera_web.dto.response.IntrospectResponse;
import com.kmacode.camera_web.dto.response.UserResponseDTO;
import com.kmacode.camera_web.service.AuthenticationService;
import com.kmacode.camera_web.service.UserService;
import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import java.text.ParseException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class AuthenticationController {

    AuthenticationService authenticationService;
   
    UserService userService;

    //endpoint để đổi mật khẩu, khớp với frontend
    @PutMapping("/change-password")
    ApiResponse<Void> changePassword(@RequestBody ChangePasswordRequest request) {
        authenticationService.changePassword(request);
        return ApiResponse.<Void>builder()
                .message("Password changed successfully")
                .build();
    }

    //endpoint đăng ký
    @PostMapping("/register")
    ApiResponse<UserResponseDTO> register(@RequestBody UserRequestDTO userRequestDTO) {
        var result = userService.createUser(userRequestDTO);
        return ApiResponse.<UserResponseDTO>builder().result(result).build();
    }

    @PostMapping("/outbound/authentication")
    ApiResponse<AuthenticationResponse> outboundAuthenticate(
            @RequestParam("code") String code
    ){
        var result = authenticationService.outboundAuthenticate(code);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }

    @PostMapping("/token")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }

    @PostMapping("/introspects")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().build();
    }
}