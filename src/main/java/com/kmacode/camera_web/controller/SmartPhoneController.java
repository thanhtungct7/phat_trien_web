package com.kmacode.camera_web.controller;


import com.kmacode.camera_web.dto.request.SmartPhoneRequestDTO;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.SmartPhoneResponseDTO;
import com.kmacode.camera_web.service.SmartPhoneService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/smartphones")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SmartPhoneController {
    SmartPhoneService smartPhoneService;

    @PostMapping("/")
    ApiResponse<SmartPhoneResponseDTO> createSmartPhone(@RequestBody SmartPhoneRequestDTO smartPhoneRequestDTO) {
        return ApiResponse.<SmartPhoneResponseDTO>builder()
                .result(smartPhoneService.createSmartPhone(smartPhoneRequestDTO))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<SmartPhoneResponseDTO> updateSmartPhone(@PathVariable Long id,@RequestBody SmartPhoneRequestDTO smartPhoneRequestDTO) {
        return ApiResponse.<SmartPhoneResponseDTO>builder()
                .result(smartPhoneService.updateSmartPhone(id, smartPhoneRequestDTO))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<SmartPhoneResponseDTO> getSmartPhoneById(@PathVariable Long id) {
        return ApiResponse.<SmartPhoneResponseDTO>builder()
                .result(smartPhoneService.getSmartPhoneById(id))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> deleteSmartPhone(@PathVariable Long id) {
        smartPhoneService.deleteSmartPhone(id);
        return ApiResponse.<String>builder()
                .message("Deleted successfully")
                .build();
    }
    @GetMapping("/")
    ApiResponse<List<SmartPhoneResponseDTO>> getAllSmartPhones() {
        return ApiResponse.<List<SmartPhoneResponseDTO>>builder()
                .result(smartPhoneService.getAllSmartPhones())
                .build();
    }
}
