package com.kmacode.camera_web.repository;

import com.kmacode.camera_web.entity.Camera;
import com.kmacode.camera_web.entity.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LaptopRepository extends JpaRepository<Laptop, Long> {
    List<Laptop> findByBrand(String brand);

    @Query("SELECT l FROM Laptop l WHERE :minPrice <= l.price AND l.price <= :maxPrice")
    List<Laptop> findByPrice(@Param("minPrice") Long minPrice, @Param("maxPrice") Long maxPrice);

    @Query(value = "select * from Laptop order by price asc ", nativeQuery = true)
    List<Laptop> findByPriceASC();

    @Query(value = "select * from Laptop order by price desc ", nativeQuery = true)
    List<Laptop> findByPriceDESC();

    @Query("SELECT c FROM Laptop c WHERE c.brand IN :brands")
    List<Laptop> findLaptopsByManyBrand(@Param("brands") List<String> brand);
}
