package com.kmacode.camera_web.repository;

import com.kmacode.camera_web.entity.Camera;
import com.kmacode.camera_web.entity.Laptop;
import com.kmacode.camera_web.entity.SmartPhone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SmartPhoneRepository extends JpaRepository<SmartPhone, Long> {
    List<SmartPhone> findByBrand(String brand);

    @Query(value = "select * from smart_phone where :minPrice<=price and price<=:maxPrice", nativeQuery = true)
    List<SmartPhone> findByPrice( @Param("minPrice") Long minPrice, @Param("maxPrice")Long maxPrice);

    @Query(value = "select * from smart_phone order by price asc ", nativeQuery = true)
    List<SmartPhone> findByPriceASC();

    @Query(value = "select * from smart_phone order by price desc ", nativeQuery = true)
    List<SmartPhone> findByPriceDESC();

    @Query("SELECT c FROM SmartPhone c WHERE c.brand IN :brands")
    List<SmartPhone> findSmartPhonesByManyBrand(@Param("brands") List<String> brand);
}
