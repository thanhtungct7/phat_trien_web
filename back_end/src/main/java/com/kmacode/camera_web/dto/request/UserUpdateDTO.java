package com.kmacode.camera_web.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateDTO {
    String firstname;
    String lastname;
    String email;
    String phone;
}