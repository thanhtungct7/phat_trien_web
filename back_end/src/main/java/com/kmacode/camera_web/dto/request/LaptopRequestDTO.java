package com.kmacode.camera_web.dto.request;

import com.kmacode.camera_web.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class LaptopRequestDTO{

     String name;
     String brand = "no";
     String type;

     String description = "no";

     String image = "no";

     Long price;

     Integer stock = 0;
     String yearOfManufacture;


//
//     String graphicsCardType;
//
//     String cpuType;
//
//     String ramCapacity;
//
//     String storage;
//
//     String maxUpgrade;
//
//     boolean touchScreen = false;
//
//     String panelMaterial = "no";
//
//     String screenSize = "no";
//
//     String screenTechnology = "no";
//
//     String screenResolution = "no";
//
//     String audioTechnology;
//
//     String dimensions = "0 x 0 x 0 mm";
//
//     double weight = 0.0;
//
//     boolean hasBattery = false;
//
//     boolean webcam = false;
//
//     String operatingSystem = "no";
//
//     boolean wifi = false;
//
//     String ports = "0";
//
//     String material = "no";
//
//     String security = "no";
//
//     String otherFeatures = "no";


}
