package com.kmacode.camera_web.controller;

import com.kmacode.camera_web.dto.request.CameraRequestDTO;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.CameraResponseDTO;
import com.kmacode.camera_web.service.CameraService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cameras")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CameraController {
    CameraService cameraService;

    @PostMapping("/")
    ApiResponse<CameraResponseDTO> createCamera(@RequestBody CameraRequestDTO cameraRequestDTO) {
        return ApiResponse.<CameraResponseDTO>builder()
                .result(cameraService.createCamera(cameraRequestDTO))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<CameraResponseDTO> updateCamera(@PathVariable Long id,@RequestBody CameraRequestDTO cameraRequestDTO) {
        return ApiResponse.<CameraResponseDTO>builder()
                .result(cameraService.updateCamera(id, cameraRequestDTO))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<CameraResponseDTO> getCameraById(@PathVariable Long id) {
        return ApiResponse.<CameraResponseDTO>builder()
                .result(cameraService.getCameraById(id))
                .build();
    }
    @DeleteMapping("/{id}")
    ApiResponse<String> deleteCamera(@PathVariable Long id) {
        cameraService.deleteCamera(id);
        return ApiResponse.<String>builder()
                .message("Deleted successfully")
                .build();
    }
    @GetMapping("/")
    ApiResponse<List<CameraResponseDTO>> getAllCameras() {
        return ApiResponse.<List<CameraResponseDTO>>builder()
                .result(cameraService.getAllCameras())
                .build();
    }
}
