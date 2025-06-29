package com.kmacode.camera_web.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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

    @Column(name = "screen_size", nullable = true)
    String screenSize = "0";

    @Column(name = "resolution", nullable = true)
    String resolution = "no";

    @Column(name = "chip_set", nullable = true)
    String chipSet = "no";

    @Column(name = "cpu_cores", nullable = true)
    String cpuCores = "no";

    @Column(name = "gpu_cores", nullable = true)
    String gpuCores = "no";

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    LocalDateTime updatedAt;


}
