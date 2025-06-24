package com.kmacode.camera_web.dto.response;



import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Setter
@Getter
public class CameraResponseDTO  {
    Long id;

    String name;
    String brand = "no";

    String type;

    String description = "no";

    String image = "no";

    Long price;

    Integer stock = 0;
    String yearOfManufacture;

    String resolution ;
    String wifiConnect ;
    String storage ;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;

}
