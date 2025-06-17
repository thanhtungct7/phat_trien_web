package com.kmacode.camera_web.repository;

import com.kmacode.camera_web.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, String> {
    Permission findByName(String name);
}
