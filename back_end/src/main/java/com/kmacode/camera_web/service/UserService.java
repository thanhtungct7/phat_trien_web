package com.kmacode.camera_web.service;

import com.kmacode.camera_web.constant.PredefinedRole;
import com.kmacode.camera_web.dto.request.UserRequestDTO;
import com.kmacode.camera_web.dto.request.UserUpdateDTO; // THÊM MỚI
import com.kmacode.camera_web.dto.response.UserResponseDTO;
import com.kmacode.camera_web.entity.User;
import com.kmacode.camera_web.mapper.UserMapper;
import com.kmacode.camera_web.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    UserMapper userMapper;

    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByUsername((userRequestDTO.getUsername()))) {
            throw new RuntimeException("Username already exists");
        }
        User user = userMapper.toUser(userRequestDTO);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));

        Set<String> roles = new HashSet<>();
        roles.add(PredefinedRole.USER_ROLE);
        user.setRoles(roles);

        userRepository.save(user);
        return userMapper.toUserResponseDTO(user);
    }

    public UserResponseDTO updateUser(Long id, UserUpdateDTO userUpdateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userMapper.updateUserFromDto(user, userUpdateDTO);

        User updatedUser = userRepository.save(user);

        return userMapper.toUserResponseDTO(updatedUser);
    }

    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toUserResponseDTO(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(userMapper::toUserResponseDTO)
                .toList();
    }
}