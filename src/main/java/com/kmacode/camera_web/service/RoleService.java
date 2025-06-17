package com.kmacode.camera_web.service;

//import com.kmacode.identityservice.dto.request.RoleRequest;
//import com.kmacode.identityservice.dto.response.RoleResponse;
//import com.kmacode.identityservice.mapper.RoleMapper;
//import com.kmacode.identityservice.repository.PermissionRepository;
//import com.kmacode.identityservice.repository.RoleRepository;
import com.kmacode.camera_web.dto.request.RoleRequest;
import com.kmacode.camera_web.dto.response.RoleResponse;
import com.kmacode.camera_web.mapper.RoleMapper;
import com.kmacode.camera_web.repository.PermissionRepository;
import com.kmacode.camera_web.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        var role = roleMapper.toRole(request);
        var permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));
        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        var roles = roleRepository.findAll();
        return roles.stream().map(roleMapper::toRoleResponse).toList();
    }

    public void delete(String roleName) {
        roleRepository.deleteById(roleName);
    }
}
