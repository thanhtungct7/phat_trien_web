package com.kmacode.camera_web.dto.request;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CameraRequestDTO  {


    String name;
    String brand = "no";
    String type;

    String description = "no";

    String image = "no";

    Long price;

    Integer stock = 0;

    String yearOfManufacture;

    String resolution = "no";
    String wifiConnect = "no";
    String storage = "no";

}
