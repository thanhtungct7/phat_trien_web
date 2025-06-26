package com.kmacode.camera_web.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


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

    @Builder.Default
    String brand = "no";

    @Column(name = "type")
    String type;

    @Column(name = "description", nullable = true)
    String description = "no";

    @Column(name = "image", nullable = true)
    String image = "no";


    @Column(name = "price" )
    Long price;

    @Column(name = "stock" )

    Integer stock = 0;

    @Column(name = "year_of_manufacture", nullable = true)
    String yearOfManufacture;




    @Column(name = "screen_size")
     String screenSize = "0";

    @Column(name = "technology")
    String technology;

    @Column(name = "cpu_cores")
     String cpuCores = "no";

    @Column(name = "chipset")
     String chipset = "no";

    @Column(name = "gpu")
     String gpu = "no";

    @Column(name = "main_camera")
    String mainCamera;

    @Column(name = "camera_ultra_wide")
    String cameraUltraWide;

    @Column(name = "camera_telephoto")
    String cameraTelephoto;
    
    @Column(name = "created_at",  updatable = false)
    @CreationTimestamp
     LocalDateTime createdAt;

    @Column(name = "updated_at" )
    @UpdateTimestamp
     LocalDateTime updatedAt;
}
