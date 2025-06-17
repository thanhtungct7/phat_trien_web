package com.kmacode.camera_web.mapper;


import com.kmacode.camera_web.dto.request.PermissionRequest;
import com.kmacode.camera_web.dto.response.PermissionResponse;
import com.kmacode.camera_web.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);



}
