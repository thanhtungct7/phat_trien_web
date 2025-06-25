package com.kmacode.camera_web.repository;

import com.kmacode.camera_web.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
    Role findByName(String name);
}
