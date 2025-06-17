package com.kmacode.camera_web.repository;

import com.kmacode.camera_web.entity.Camera;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CameraRepository extends JpaRepository<Camera, Long> {
}
