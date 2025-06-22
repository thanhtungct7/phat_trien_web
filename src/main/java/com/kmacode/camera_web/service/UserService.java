package com.kmacode.camera_web.service;

import com.kmacode.camera_web.constant.PredefinedRole;
import com.kmacode.camera_web.dto.request.UserRequestDTO;
import com.kmacode.camera_web.dto.response.UserResponseDTO;
import com.kmacode.camera_web.entity.Role;
import com.kmacode.camera_web.entity.User;
import com.kmacode.camera_web.mapper.UserMapper;
import com.kmacode.camera_web.repository.RoleRepository;
import com.kmacode.camera_web.repository.UserRepository;
import jakarta.transaction.Transactional;
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
    RoleRepository roleRepository;
    UserMapper userMapper;

    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByUsername((userRequestDTO.getUsername()))) {
            throw new RuntimeException("Username already exists");
        }
        User user = userMapper.toUser(userRequestDTO);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));

        Set<String> roles = new HashSet<>();
        roles.add(PredefinedRole.USER_ROLE); // Default role
        user.setRoles(roles);

        // Convert saved entity back to DTO
        return userMapper.toUserResponseDTO(user);
    }

    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) {
        // Find the existing user
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update the user entity with new data
        userMapper.updateUser(user, userRequestDTO);

        // Save the updated user entity
        user = userRepository.save(user);

        // Convert saved entity back to DTO
        return userMapper.toUserResponseDTO(user);
    }

    public UserResponseDTO getUserById(Long id) {
        // Find the user by ID
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Convert entity to DTO
        return userMapper.toUserResponseDTO(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(Long id) {
        // Check if user exists
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        // Delete the user by ID
        userRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponseDTO> getAllUsers() {
        // Fetch all users from the repository
        List<User> users = userRepository.findAll();

        // Convert list of User entities to list of UserResponseDTO
        return users.stream()
                .map(userMapper::toUserResponseDTO)
                .toList();
    }
}

// loc san pham theo hang va gia tien, hang co san,
