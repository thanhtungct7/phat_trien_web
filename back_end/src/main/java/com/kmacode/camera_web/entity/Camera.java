package com.kmacode.camera_web.entity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

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

    @Builder.Default
    String brand = "no";

    @Column(name = "type", nullable = false)
    String type;

    @Column(name = "description", nullable = true)
    String description = "no";

    @Column(name = "image", nullable = true)
    String image = "no";

    @Column(name = "price", nullable = false)
    Long price;

    @Column(name = "stock", nullable = false)
    Integer stock = 0;

    @Column(name = "year_of_manufacture", nullable = true)
    String yearOfManufacture;
    @Column(name="resolution", nullable = true)
    @Builder.Default
     String resolution = "no";
    @Column(name="wifi_connect", nullable = true)
    @Builder.Default
     String wifiConnect = "no";

    @Column(name = "storage", nullable = true)
    @Builder.Default
     String storage = "no";
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    LocalDateTime updatedAt;
}
