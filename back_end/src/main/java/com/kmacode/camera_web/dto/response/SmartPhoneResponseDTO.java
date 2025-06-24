package com.kmacode.camera_web.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class SmartPhoneResponseDTO  {
    Long id;
    String name;
    String brand;
    String type;
    String description;
    String image;
    Long price;
    Integer stock = 0;
    String yearOfManufacture;
    String screenSize;
    String technology;
    String cpuCores;
    String chipset;
    String gpu;
    String mainCamera;
    String cameraUltraWide;
    String cameraTelephoto;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

}
