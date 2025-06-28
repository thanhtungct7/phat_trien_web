package com.kmacode.camera_web.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class SmartPhoneRequestDTO {
     String name;
    String brand = "no";
     String type;

     String description = "no";

     String image = "no";

    Long price;
     Integer stock = 0;
    String yearOfManufacture;

    String screenSize = "0";

    String technology;

    String cpuCores = "no";

    String chipset = "no";

    String gpu = "no";

    String mainCamera;

    String cameraUltraWide;

    String cameraTelephoto;


}
