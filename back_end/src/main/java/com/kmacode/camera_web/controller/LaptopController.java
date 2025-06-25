package com.kmacode.camera_web.controller;

import com.kmacode.camera_web.dto.request.LaptopRequestDTO;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.CameraResponseDTO;
import com.kmacode.camera_web.dto.response.LaptopResponseDTO;
import com.kmacode.camera_web.dto.response.SmartPhoneResponseDTO;
import com.kmacode.camera_web.service.LaptopService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/laptops")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LaptopController {

    LaptopService laptopService;

    @PostMapping("/")
    ApiResponse<LaptopResponseDTO> createLaptop(@RequestBody LaptopRequestDTO laptopRequestDTO) {
        return ApiResponse.<LaptopResponseDTO>builder()
                .result(laptopService.createLaptop(laptopRequestDTO))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<LaptopResponseDTO> getLaptopById(@PathVariable Long id) {
        return ApiResponse.<LaptopResponseDTO>builder()
                .result(laptopService.getLaptopById(id))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<LaptopResponseDTO> updateLaptop(@PathVariable Long id, @RequestBody LaptopRequestDTO laptopRequestDTO) {
        return ApiResponse.<LaptopResponseDTO>builder()
                .result(laptopService.updateLaptop(id, laptopRequestDTO))
                .build();
    }
    @DeleteMapping("/{id}")
    ApiResponse<String> deleteLaptop(@PathVariable Long id) {
        laptopService.deleteLaptop(id);
        return ApiResponse.<String>builder()
                .message("Deleted successfully")
                .build();
    }
    @GetMapping("/")
    ApiResponse<List<LaptopResponseDTO>> getAllLaptops() {
        return ApiResponse.<List<LaptopResponseDTO>>builder()
                .result(laptopService.getAllLaptops())
                .build();
    }

    @GetMapping("/asc")
    ApiResponse<List<LaptopResponseDTO>> getLaptopByASC() {
        return ApiResponse.<List<LaptopResponseDTO>>builder()
                .result(laptopService.getByPriceASC())
                .build();
    }

    @GetMapping("/desc")
    ApiResponse<List<LaptopResponseDTO>> getAllLaptopDesc() {
        return ApiResponse.<List<LaptopResponseDTO>>builder()
                .result(laptopService.getByPriceDESC())
                .build();
    }

    @GetMapping("/prices/")
    ApiResponse<List<LaptopResponseDTO>> getLaptopPrices(@RequestParam("minPrice") Long minPrice, @RequestParam("maxPrice") Long maxPrice) {
        return ApiResponse.<List<LaptopResponseDTO>>builder()
                .result(laptopService.getByPrice(minPrice, maxPrice))
                .build();
    }


    @GetMapping("/brands/{brand}")
    ApiResponse<List<LaptopResponseDTO>> getLaptopByBrand(@PathVariable String brand) {
        return ApiResponse.<List<LaptopResponseDTO>>builder()
                .result(laptopService.getAllByBrand(brand))
                .build();
    }

    @GetMapping("/many-brands/")
    ApiResponse<List<LaptopResponseDTO>> getLaptopsByMuchBrand(@RequestParam("brands") String brands) {
        List<String> brandList = List.of(brands.split(","));
        return ApiResponse.<List<LaptopResponseDTO>>builder()
                .result(laptopService.getLaptopsByManyBrand(brandList))
                .build();
    }
}
