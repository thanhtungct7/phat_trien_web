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
public class SmartPhoneResponseDTO  {
    Long id;

    String name;

    String type;

    String description = "no";

    String image = "no";

    String price;

    Integer stock = 0;

    String operatingSystem = "no";

    String language = "no";

    // Màn hình
    String screenType = "no";

    String screenColors = "0";

    String screenStandard = "no";

    String screenResolution = "0";

    String screenSize = "0";

    String screenProtection = "no";

    boolean alwaysOnDisplay = false;

    String touchTechnology = "no";

    // Camera
    String rearCamera = "no";
    String rearVideo = "no";

    String frontCamera = "no";

    String frontVideo = "no";

    boolean flash = false;

    String cameraFeatures = "no";

    boolean videoCall = false;

    // CPU & RAM
    String cpuSpeed = "no";

    String cpuCores = "no";

    String chipset = "no";

    String gpu = "no";

    String ram = "no";

    // Bộ nhớ & Lưu trữ
    String contactsStorage = "no";

    String internalStorage = "no";


    boolean externalStorage = false;

    String maxExternalStorage = "no";

    // Thiết kế & Trọng lượng
    String design = "no";

    String waterDustResistance = "no";

    String dimensions = "no";

    double weight = 0;

    // Pin
    String batteryType = "no";


    String batteryCapacity = "no";

    String fastCharging = "no";


    String wirelessCharging = "no";

    String reverseWirelessCharging = "no";

    boolean removableBattery = false;

    // Kết nối & Cổng giao tiếp

    String simType = "no";

    String simSlot = "no";

    String wifi = "no";

    String gps = "no";

    String bluetooth = "no";

    boolean gprsEdge = false;

    boolean headphoneJack = false;

    boolean nfc = false;

    String usb = "no";

    String chargingPort = "no";

    // Giải trí & Ứng dụng
    boolean recording = false;

    boolean fmRadio = false;

    String otherFeatures;

    LocalDateTime createdAt;
    LocalDateTime updatedAt;

}
