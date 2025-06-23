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
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

//    String resolution = "no";
//
//    Integer horizontalAngle = 0;
//
//    Integer verticalAngle = 0;
//
//    String blindSpotAngle = "no";
//
//    Integer infraredRange = 0;
//
//    String waterproofStandard = "no";
//
//    Boolean motionDetection = false;
//
//    Boolean alarmSound = false;
//
//    Boolean sirenIntegration = false;
//
//    Boolean humanDetection = false;
//
//    Boolean smartTracking = false;
//
//    Boolean phoneAlert = false;
//
//    Boolean twoWayTalk = false;
//
//    // Kết nối & Lưu trữ
//    String connectionType = "no";
//
//    String wifiBand = "no";
//
//    Integer concurrentUsers = 1;
//
//    String storage = "no";
//
//    // Nguồn điện & Điều kiện sử dụng
//    String powerInput = "no";
//
//    String chargingPort = "no";
//
//    Boolean adapterIncluded = false;
//
//    String operatingTemperature = "no";
//
//    String humidity = "no";
//
//    // Lắp đặt & Thiết bị hỗ trợ
//    String installationLocation = "no";
//
//    String supportedDevices = "no";
//
//    String controlApp = "no";
//
//    String dimensions = "no";
//
//    Float weight = 1.0f;
//
//    String brand = "no";
//
//    String manufacturer = "no";
//
//    String brandInfo = "no";
}
