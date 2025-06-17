package com.kmacode.camera_web.service;

import com.kmacode.camera_web.dto.request.CameraRequestDTO;
import com.kmacode.camera_web.dto.response.CameraResponseDTO;
import com.kmacode.camera_web.entity.Camera;
import com.kmacode.camera_web.mapper.CameraMapper;
import com.kmacode.camera_web.repository.CameraRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CameraService {
    CameraRepository cameraRepository;
    CameraMapper cameraMapper;

    public CameraResponseDTO getCameraById(Long id) {
        return cameraMapper.toCameraResponseDTO(cameraRepository.findById(id).get());
    }

    public CameraResponseDTO createCamera(CameraRequestDTO cameraRequestDTO) {
        Camera camera = cameraMapper.toCamera(cameraRequestDTO);
        camera = cameraRepository.save(camera);
        return cameraMapper.toCameraResponseDTO(camera);
    }

    public CameraResponseDTO updateCamera(Long id, CameraRequestDTO cameraRequestDTO) {
        Camera camera = cameraRepository.findById(id).orElseThrow(() -> new RuntimeException("Camera not found"));
        cameraMapper.updateCameraFromDTO(camera, cameraRequestDTO);
        camera = cameraRepository.save(camera);
        return cameraMapper.toCameraResponseDTO(camera);
    }

    public void deleteCamera(Long id) {
        if (!cameraRepository.existsById(id)) {
            throw new RuntimeException("Camera not found");
        }
        cameraRepository.deleteById(id);
    }

    public List<CameraResponseDTO> getAllCameras() {
        return cameraRepository.findAll().stream()
                .map(cameraMapper::toCameraResponseDTO)
                .toList();
    }


}
