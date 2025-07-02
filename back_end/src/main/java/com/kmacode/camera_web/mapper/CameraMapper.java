package com.kmacode.camera_web.mapper;

import com.kmacode.camera_web.dto.request.CameraRequestDTO;
import com.kmacode.camera_web.dto.response.CameraResponseDTO;
import com.kmacode.camera_web.entity.Camera;
import org.mapstruct.Builder;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CameraMapper  {
    Camera toCamera(CameraRequestDTO cameraRequestDTO);
    CameraResponseDTO toCameraResponseDTO(Camera camera);
    void updateCameraFromDTO( @MappingTarget Camera camera, CameraRequestDTO cameraRequestDTO);
}
