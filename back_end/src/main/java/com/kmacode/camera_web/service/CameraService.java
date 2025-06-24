package com.kmacode.camera_web.service;

import com.kmacode.camera_web.dto.request.CameraRequestDTO;
import com.kmacode.camera_web.dto.response.CameraResponseDTO;
import com.kmacode.camera_web.entity.Camera;
import com.kmacode.camera_web.mapper.CameraMapper;
import com.kmacode.camera_web.repository.CameraRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CameraService {
    CameraRepository cameraRepository;
    CameraMapper cameraMapper;

    public CameraResponseDTO getCameraById(Long id) {
        return cameraMapper.toCameraResponseDTO(cameraRepository.findById(id).get());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CameraResponseDTO createCamera(CameraRequestDTO cameraRequestDTO) {
        Camera camera = cameraMapper.toCamera(cameraRequestDTO);
        camera = cameraRepository.save(camera);
        return cameraMapper.toCameraResponseDTO(camera);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CameraResponseDTO updateCamera(Long id, CameraRequestDTO cameraRequestDTO) {
        Camera camera = cameraRepository.findById(id).orElseThrow(() -> new RuntimeException("Camera not found"));
        cameraMapper.updateCameraFromDTO(camera, cameraRequestDTO);
        camera = cameraRepository.save(camera);
        return cameraMapper.toCameraResponseDTO(camera);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    public List<CameraResponseDTO> getAllCamerasByBrand(String brand) {
        return cameraRepository.findByBrand(brand).stream()
                .map(cameraMapper::toCameraResponseDTO)
                .toList();
    }

//    public List<CameraResponseDTO> getCamerasByPrice(Long minPrice, Long maxPrice) {
//        return cameraRepository.findByPrice(minPrice, maxPrice).stream()
//                .map(cameraMapper::toCameraResponseDTO)
//                .toList();
//    }
    public List<CameraResponseDTO> getCamerasByPrice(Long minPrice, Long maxPrice) {
        log.info(">> getCamerasByPrice called with minPrice = {}, maxPrice = {}", minPrice, maxPrice);
        List<Camera> cameras = cameraRepository.findByPrice(minPrice, maxPrice);
        log.info(">> Result size: {}", cameras.size());
        return cameras.stream()
                .map(cameraMapper::toCameraResponseDTO)
                .toList();
    }


    public List<CameraResponseDTO> getCamerasByPriceASC() {
        return cameraRepository.findCameraByPriceASC().stream()
                .map(cameraMapper::toCameraResponseDTO)
                .toList();
    }

    public List<CameraResponseDTO> getCamerasByPriceDESC() {
        return cameraRepository.findCameraByPriceDESC().stream()
                .map(cameraMapper::toCameraResponseDTO)
                .toList();
    }

}
