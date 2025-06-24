package com.kmacode.camera_web.dto.request;

import com.kmacode.camera_web.entity.User;
import jakarta.persistence.Column;
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

     String screenSize = "0";

     String resolution = "no";

     String chipSet = "no";

     String cpuCores = "no";

     String gpuCores = "no";



}
