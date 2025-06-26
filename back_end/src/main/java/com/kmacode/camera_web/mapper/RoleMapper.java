package com.kmacode.camera_web.mapper;

import com.kmacode.camera_web.dto.request.RoleRequest;
import com.kmacode.camera_web.dto.response.RoleResponse;
import com.kmacode.camera_web.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleRequest request);
    RoleResponse toRoleResponse(Role role);
}
