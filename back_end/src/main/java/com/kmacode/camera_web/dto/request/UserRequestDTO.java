package com.kmacode.camera_web.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequestDTO {
    @NotNull(message = "Tên người dùng không được để trống")
    @JsonProperty("username")
    String username;

    @NotNull(message = "Mật khẩu không được để trống")
    @JsonProperty("password")
    String password;

    @NotNull(message = "Tên không được để trống")
    @JsonProperty("firstname")
    String firstname;

    @NotNull(message = "Họ không được để trống")
    @JsonProperty("lastname")
    String lastname;

    @NotNull(message = "Email không được để trống")
    @JsonProperty("email")
    String email;

    @JsonProperty("phone")
    String phone;
}