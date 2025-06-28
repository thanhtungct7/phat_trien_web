package com.kmacode.camera_web.controller;


import com.kmacode.camera_web.dto.request.SmartPhoneRequestDTO;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.LaptopResponseDTO;
import com.kmacode.camera_web.dto.response.SmartPhoneResponseDTO;
import com.kmacode.camera_web.service.SmartPhoneService;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.repository.query.Param;
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

    @GetMapping("/asc")
    ApiResponse<List<SmartPhoneResponseDTO>> getAllSmartPhonesAsc() {
        return ApiResponse.<List<SmartPhoneResponseDTO>>builder()
                .result(smartPhoneService.getByPriceASC())
                .build();
    }

    @GetMapping("/desc")
    ApiResponse<List<SmartPhoneResponseDTO>> getAllSmartPhonesDesc() {
        return ApiResponse.<List<SmartPhoneResponseDTO>>builder()
                .result(smartPhoneService.getByPriceDESC())
                .build();
    }

    @GetMapping("/prices/")
    ApiResponse<List<SmartPhoneResponseDTO>> getSmartPhonesPrices(@RequestParam("minPrice") Long minPrice, @RequestParam("maxPrice") Long maxPrice) {
        return ApiResponse.<List<SmartPhoneResponseDTO>>builder()
                .result(smartPhoneService.getByPrice(minPrice, maxPrice))
                .build();
    }


    @GetMapping("/brands/{brand}")
    ApiResponse<List<SmartPhoneResponseDTO>> getSmartPhonesByBrand(@PathVariable String brand) {
        return ApiResponse.<List<SmartPhoneResponseDTO>>builder()
                .result(smartPhoneService.getAllByBrand(brand))
                .build();
    }

    @GetMapping("/many-brands/")
    ApiResponse<List<SmartPhoneResponseDTO>> getSmartPhonesByMuchBrand(@RequestParam("brands") String brands) {
        List<String> brandList = List.of(brands.split(","));
        return ApiResponse.<List<SmartPhoneResponseDTO>>builder()
                .result(smartPhoneService.getSmartPhonesByManyBrand(brandList))
                .build();
    }
}
