package com.kmacode.camera_web.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("LAPTOP")
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Laptop  {
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

    @Column(name = "graphics_card_type", nullable = true)
    private String graphicsCardType;

    @Column(name = "cpu_type", nullable = true)
    private String cpuType;

    @Column(name = "ram_capacity", nullable = true)
    private String ramCapacity;

    @Column(name = "storage", nullable = true)
    private String storage;

    @Column(name = "max_upgrade", nullable = true)
    private String maxUpgrade;

    @Column(name = "touch_screen", nullable = false)
    private boolean touchScreen = false;

    @Column(name = "panel_material", nullable = false)
    private String panelMaterial = "no";

    @Column(name = "screen_size", nullable = false)
    private String screenSize = "no";

    @Column(name = "screen_technology", nullable = false)
    private String screenTechnology = "no";

    @Column(name = "screen_resolution", nullable = false)
    private String screenResolution = "no";

    @Column(name = "audio_technology", nullable = true)
    private String audioTechnology;

    @Column(name = "dimensions", nullable = false)
    private String dimensions = "0 x 0 x 0 mm";

    @Column(name = "weight", nullable = false)
    private double weight = 0.0;

    @Column(name = "has_battery", nullable = false)
    private boolean hasBattery = false;

    @Column(name = "webcam", nullable = false)
    private boolean webcam = false;

    @Column(name = "operating_system", nullable = true)
    private String operatingSystem = "no";

    @Column(name = "wifi", nullable = false)
    private boolean wifi = false;

    @Column(name = "ports", nullable = false)
    private String ports = "0";

    @Column(name = "material", nullable = false)
    private String material = "no";

    @Column(name = "security", nullable = false)
    private String security = "no";

    @Column(name = "other_features", nullable = false)
    private String otherFeatures = "no";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


}
