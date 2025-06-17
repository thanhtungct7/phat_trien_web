package com.kmacode.camera_web.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("CAMERA")
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Camera {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "type", nullable = false)
    String type;

    @Column(name = "description", nullable = true)
    String description = "no";

    @Column(name = "image", nullable = true)
    String image = "no";

    @Column(name = "price", nullable = false)
    String price;

    @Column(name = "stock", nullable = false)
    Integer stock = 0;

    @Column(name = "year_of_manufacture", nullable = true)
    String yearOfManufacture;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;
    @Builder.Default
     String resolution = "no";
    @Builder.Default
     Integer horizontalAngle = 0;
    @Builder.Default
     Integer verticalAngle = 0;
    @Builder.Default
     String blindSpotAngle = "no";
    @Builder.Default
     Integer infraredRange = 0;
    @Builder.Default
     String waterproofStandard = "no";
    @Builder.Default
     Boolean motionDetection = false;
    @Builder.Default
     Boolean alarmSound = false;
    @Builder.Default
     Boolean sirenIntegration = false;
    @Builder.Default
     Boolean humanDetection = false;
    @Builder.Default
     Boolean smartTracking = false;
    @Builder.Default
     Boolean phoneAlert = false;
    @Builder.Default
     Boolean twoWayTalk = false;
    @Builder.Default
    // Kết nối & Lưu trữ
     String connectionType = "no";
    @Builder.Default
     String wifiBand = "no";
    @Builder.Default
     Integer concurrentUsers = 1;
    @Builder.Default
     String storage = "no";
    @Builder.Default
    // Nguồn điện & Điều kiện sử dụng
     String powerInput = "no";
    @Builder.Default
     String chargingPort = "no";
    @Builder.Default
     Boolean adapterIncluded = false;
    @Builder.Default
     String operatingTemperature = "no";
    @Builder.Default
     String humidity = "no";
    @Builder.Default
    // Lắp đặt & Thiết bị hỗ trợ
     String installationLocation = "no";
    @Builder.Default
     String supportedDevices = "no";
    @Builder.Default
     String controlApp = "no";
    @Builder.Default
     String dimensions = "no";
    @Builder.Default
     Float weight = 1.0f;
    @Builder.Default
     String brand = "no";
    @Builder.Default
     String manufacturer = "no";
    @Builder.Default
     String brandInfo = "no";
}
