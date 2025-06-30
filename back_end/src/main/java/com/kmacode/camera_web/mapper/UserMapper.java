package com.kmacode.camera_web.mapper;

import com.kmacode.camera_web.dto.request.UserRequestDTO;
import com.kmacode.camera_web.dto.request.UserUpdateDTO;
import com.kmacode.camera_web.dto.response.UserResponseDTO;
import com.kmacode.camera_web.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "roles", ignore = true)
    User toUser(UserRequestDTO userRequestDTO);

    UserResponseDTO toUserResponseDTO(User user);

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "username", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserRequestDTO userRequestDTO);
    
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "username", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "roles", ignore = true)
    void updateUserFromDto(@MappingTarget User user, UserUpdateDTO dto);
}