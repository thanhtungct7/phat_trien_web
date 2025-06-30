package com.kmacode.camera_web.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    
    INVALID_KEY(1001, "Invalid message key", HttpStatus.BAD_REQUEST),
    
    USER_EXISTED(1002, "User already exists",HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least 3 characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least 6 characters", HttpStatus.BAD_REQUEST),
    USERNAME_NOT_EXISTED(1005, "Username does not exist", HttpStatus.NOT_FOUND),
    
    UNAUTHENTICATED(1006, "You are not authenticated", HttpStatus.UNAUTHORIZED), // HTTP 401
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN), // HTTP 403
    
    PASSWORD_NOT_MATCHED(1008, "Old password is not correct", HttpStatus.BAD_REQUEST),
    INVALID_CREDENTIALS(1009, "Invalid username or password", HttpStatus.UNAUTHORIZED),
    
    ;
    
    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}