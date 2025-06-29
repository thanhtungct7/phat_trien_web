package com.kmacode.camera_web.controller;

import com.kmacode.camera_web.dto.request.CameraRequestDTO;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.CameraResponseDTO;
import com.kmacode.camera_web.service.CameraService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cameras")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
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

    @GetMapping("/asc")
    ApiResponse<List<CameraResponseDTO>> getAllCameraAsc() {
        return ApiResponse.<List<CameraResponseDTO>>builder()
                .result(cameraService.getCamerasByPriceASC())
                .build();
    }

    @GetMapping("/desc")
    ApiResponse<List<CameraResponseDTO>> getAllCameraDesc() {
        return ApiResponse.<List<CameraResponseDTO>>builder()
                .result(cameraService.getCamerasByPriceDESC())
                .build();
    }

    @GetMapping("/prices")
    ApiResponse<List<CameraResponseDTO>> getCameraPrices( @RequestParam("minPrice") Long minPrice, @RequestParam("maxPrice") Long maxPrice) {
        return ApiResponse.<List<CameraResponseDTO>>builder()
                .result(cameraService.getCamerasByPrice(minPrice, maxPrice))
                .build();
    }


    @GetMapping("/brands/{brand}")
    ApiResponse<List<CameraResponseDTO>> getCameraByBrand(@PathVariable String brand) {
        return ApiResponse.<List<CameraResponseDTO>>builder()
                .result(cameraService.getAllCamerasByBrand(brand))
                .build();
    }

    @GetMapping("/many-brands/")
    ApiResponse<List<CameraResponseDTO>> getCamerasByManyBrand(@RequestParam("brands") String brands) {
        List<String> brandList = List.of(brands.split(","));
        return ApiResponse.<List<CameraResponseDTO>>builder()
                .result(cameraService.getCamerasByManyBrand(brandList))
                .build();
    }


}
