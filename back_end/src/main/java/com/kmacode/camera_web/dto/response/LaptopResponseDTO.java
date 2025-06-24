package com.kmacode.camera_web.dto.response;

//import com.kmacode.camera_web.dto.request.ProductRequestDTO;
import com.kmacode.camera_web.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class LaptopResponseDTO  {
    Long id;

    String name;
    String brand = "no";
    String type;

    String description = "no";

    String image = "no";

    Long price;

    Integer stock = 0;
    String yearOfManufacture;

    String screenSize ;

    String resolution ;

    String chipSet ;

    String cpuCores;

    String gpuCores;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;


}
