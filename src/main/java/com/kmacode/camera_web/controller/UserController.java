package com.kmacode.camera_web.controller;

import com.kmacode.camera_web.dto.request.UserRequestDTO;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.UserResponseDTO;
import com.kmacode.camera_web.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService userService;

    @PostMapping("/")
    ApiResponse<UserResponseDTO> createUser(@RequestBody UserRequestDTO userRequestDTO) {
        return ApiResponse.<UserResponseDTO>builder()
                .result(userService.createUser(userRequestDTO))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<UserResponseDTO> updateUser(@RequestBody UserRequestDTO userRequestDTO, @PathVariable Long id) {
        return ApiResponse.<UserResponseDTO>builder()
                .result(userService.updateUser(id, userRequestDTO))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<UserResponseDTO> getUserById(@PathVariable(name = "id") Long id) {
        return ApiResponse.<UserResponseDTO>builder()
                .result(userService.getUserById(id))
                .build();
    }
    @DeleteMapping("/{id}")
    ApiResponse<String> deleteUser(@PathVariable(name = "id")Long id) {
        userService.deleteUser(id);
        return ApiResponse.<String>builder()
                .message("deleted user successfully")
                .build();
    }

    @GetMapping("/")
    ApiResponse<List<UserResponseDTO>> getAllUsers() {
        return ApiResponse.<List<UserResponseDTO>>builder()
                .result(userService.getAllUsers())
                .build();
    }
}
