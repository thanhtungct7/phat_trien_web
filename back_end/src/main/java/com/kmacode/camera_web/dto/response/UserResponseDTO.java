package com.kmacode.camera_web.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Set; // THÊM IMPORT NÀY

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserResponseDTO {

    Long userId;
    String username;
    String firstname;
    String lastname;
    String email;
    String phone;
    Set<String> roles;
}