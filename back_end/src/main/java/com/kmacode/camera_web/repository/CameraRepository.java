package com.kmacode.camera_web.repository;

import com.kmacode.camera_web.entity.Camera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CameraRepository extends JpaRepository<Camera, Long> {
    List<Camera> findByBrand(String brand);

    @Query("SELECT c FROM Camera c WHERE c.price >= :minPrice AND c.price <= :maxPrice")
    List<Camera> findByPrice(@Param("minPrice") Long minPrice, @Param("maxPrice") Long maxPrice);

    @Query(value = "select * from camera order by price asc ", nativeQuery = true)
    List<Camera> findCameraByPriceASC();

    @Query(value = "select * from camera order by price desc ", nativeQuery = true)
    List<Camera> findCameraByPriceDESC();

    @Query("SELECT c FROM Camera c WHERE c.brand IN :brands")
    List<Camera> findCameraByManyBrand(@Param("brands") List<String> brand);


}
