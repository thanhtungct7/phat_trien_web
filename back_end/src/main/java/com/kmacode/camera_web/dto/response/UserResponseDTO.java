package com.kmacode.camera_web.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserResponseDTO {

    String username;
    String password;
    String firstname;
    String lastname;
    String email;
    String phone;
}
