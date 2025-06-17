package com.kmacode.camera_web.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("SMARTPHONE")
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class SmartPhone {
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

    // Thông tin chung
    @Column(name = "operating_system", nullable = false)
     String operatingSystem = "no";

    @Column(name = "language", nullable = false)
     String language = "no";

    // Màn hình
    @Column(name = "screen_type", nullable = false)
     String screenType = "no";

    @Column(name = "screen_colors", nullable = false)
     String screenColors = "0";

    @Column(name = "screen_standard", nullable = false)
     String screenStandard = "no";

    @Column(name = "screen_resolution", nullable = false)
     String screenResolution = "0";

    @Column(name = "screen_size", nullable = false)
     String screenSize = "0";

    @Column(name = "screen_protection", nullable = false)
     String screenProtection = "no";

    @Column(name = "always_on_display", nullable = false)
     boolean alwaysOnDisplay = false;

    @Column(name = "touch_technology", nullable = false)
     String touchTechnology = "no";

    // Camera
    @Column(name = "rear_camera", nullable = false)
     String rearCamera = "no";
    @Column(name = "rear_video", nullable = false)
     String rearVideo = "no";

    @Column(name = "front_camera", nullable = false)
     String frontCamera = "no";

    @Column(name = "front_video", nullable = false)
     String frontVideo = "no";

    @Column(name = "flash", nullable = false)
     boolean flash = false;

    @Column(name = "camera_features", nullable = false)
     String cameraFeatures = "no";

    @Column(name = "video_call", nullable = false)
     boolean videoCall = false;

    // CPU & RAM
    @Column(name = "cpu_speed", nullable = false)
     String cpuSpeed = "no";

    @Column(name = "cpu_cores", nullable = false)
     String cpuCores = "no";

    @Column(name = "chipset", nullable = false)
     String chipset = "no";

    @Column(name = "gpu", nullable = false)
     String gpu = "no";

    @Column(name = "ram", nullable = false)
     String ram = "no";

    // Bộ nhớ & Lưu trữ
    @Column(name = "contacts_storage", nullable = false)
     String contactsStorage = "no";

    @Column(name = "internal_storage", nullable = false)
     String internalStorage = "no";


    @Column(name = "external_storage", nullable = false)
     boolean externalStorage = false;

    @Column(name = "max_external_storage", nullable = false)
     String maxExternalStorage = "no";

    // Thiết kế & Trọng lượng
    @Column(name = "design", nullable = false)
     String design = "no";

    @Column(name = "water_dust_resistance", nullable = false)
     String waterDustResistance = "no";

    @Column(name = "dimensions", nullable = false)
     String dimensions = "no";

    @Column(name = "weight", nullable = false)
     double weight = 0;

    // Pin
    @Column(name = "battery_type", nullable = false)
     String batteryType = "no";


    @Column(name = "battery_capacity", nullable = false)
     String batteryCapacity = "no";

    @Column(name = "fast_charging", nullable = false)
     String fastCharging = "no";


    @Column(name = "wireless_charging", nullable = false)
     String wirelessCharging = "no";

    @Column(name = "reverse_wireless_charging", nullable = false)
     String reverseWirelessCharging = "no";

    @Column(name = "removable_battery", nullable = false)
     boolean removableBattery = false;

    // Kết nối & Cổng giao tiếp
  
    @Column(name = "sim_type", nullable = false)
     String simType = "no";

    @Column(name = "sim_slot", nullable = false)
     String simSlot = "no";

    @Column(name = "wifi", nullable = false)
     String wifi = "no";

    @Column(name = "gps", nullable = false)
     String gps = "no";

    @Column(name = "bluetooth", nullable = false)
     String bluetooth = "no";

    @Column(name = "gprs_edge", nullable = false)
     boolean gprsEdge = false;

    @Column(name = "headphone_jack", nullable = false)
     boolean headphoneJack = false;

    @Column(name = "nfc", nullable = false)
     boolean nfc = false;

    @Column(name = "usb", nullable = false)
     String usb = "no";

    @Column(name = "charging_port", nullable = false)
     String chargingPort = "no";

    // Giải trí & Ứng dụng
    @Column(name = "recording", nullable = false)
     boolean recording = false;

    @Column(name = "fm_radio", nullable = false)
     boolean fmRadio = false;

    @Column(name = "other_features", nullable = true)
     String otherFeatures;

    // Timestamps
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
     LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
     LocalDateTime updatedAt;
}
