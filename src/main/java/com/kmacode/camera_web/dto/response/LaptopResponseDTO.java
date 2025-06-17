package com.kmacode.camera_web.dto.response;

//import com.kmacode.camera_web.dto.request.ProductRequestDTO;
import com.kmacode.camera_web.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class LaptopResponseDTO  {
    Long id;

    String name;

    String type;

    String description = "no";

    String image = "no";

    String price;

    Integer stock = 0;

    String graphicsCardType;

    String cpuType;

    String ramCapacity;

    String storage;

    String maxUpgrade;

    boolean touchScreen = false;

    String panelMaterial = "no";

    String screenSize = "no";

    String screenTechnology = "no";

    String screenResolution = "no";

    String audioTechnology;

    String dimensions = "0 x 0 x 0 mm";

    double weight = 0.0;

    boolean hasBattery = false;

    boolean webcam = false;

    String operatingSystem = "no";

    boolean wifi = false;

    String ports = "0";

    String material = "no";

    String security = "no";

    String otherFeatures = "no";

}
