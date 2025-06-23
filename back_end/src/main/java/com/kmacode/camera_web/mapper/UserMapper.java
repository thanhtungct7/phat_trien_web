package com.kmacode.camera_web.mapper;

import com.kmacode.camera_web.dto.request.UserRequestDTO;
import com.kmacode.camera_web.dto.response.UserResponseDTO;
import com.kmacode.camera_web.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserRequestDTO userRequestDTO);
    UserResponseDTO toUserResponseDTO(User user);

    void updateUser(@MappingTarget User user, UserRequestDTO userRequestDTO);
}
