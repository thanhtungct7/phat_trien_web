package com.kmacode.camera_web.service;

import com.kmacode.camera_web.dto.request.LaptopRequestDTO;
import com.kmacode.camera_web.dto.response.CameraResponseDTO;
import com.kmacode.camera_web.dto.response.LaptopResponseDTO;
import com.kmacode.camera_web.entity.Laptop;
import com.kmacode.camera_web.mapper.LaptopMapper;
import com.kmacode.camera_web.repository.LaptopRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)

public class LaptopService {
     LaptopRepository laptopRepository;
     LaptopMapper laptopMapper;

    public LaptopResponseDTO getLaptopById(Long id) {
        return laptopRepository.findById(id)
                .map(laptopMapper::toLaptopResponseDTO)
                .orElseThrow(() -> new RuntimeException("Laptop not found with id: " + id));
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public LaptopResponseDTO createLaptop(LaptopRequestDTO laptopRequestDTO) {
        Laptop laptop = laptopMapper.toLaptop(laptopRequestDTO);
        laptop = laptopRepository.save(laptop);
        return laptopMapper.toLaptopResponseDTO(laptop);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public LaptopResponseDTO updateLaptop(Long id, LaptopRequestDTO laptopRequestDTO) {
        Laptop laptop = laptopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Laptop not found with id: " + id));
        laptopMapper.updateLaptop(laptop, laptopRequestDTO);
        laptop = laptopRepository.save(laptop);
        return laptopMapper.toLaptopResponseDTO(laptop);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteLaptop(Long id) {
        if (!laptopRepository.existsById(id)) {
            throw new RuntimeException("Laptop not found with id: " + id);
        }
        laptopRepository.deleteById(id);
    }
    public List<LaptopResponseDTO> getAllLaptops() {
        return laptopRepository.findAll().stream()
                .map(laptopMapper::toLaptopResponseDTO)
                .toList();
    }
    public List<LaptopResponseDTO> getAllByBrand(String brand) {
        return laptopRepository.findByBrand(brand).stream()
                .map(laptopMapper::toLaptopResponseDTO)
                .toList();
    }

    public List<LaptopResponseDTO> getByPrice(Long minPrice, Long maxPrice) {
        return laptopRepository.findByPrice(minPrice, maxPrice).stream()
                .map(laptopMapper::toLaptopResponseDTO)
                .toList();
    }


    public List<LaptopResponseDTO> getByPriceASC() {
        return laptopRepository.findByPriceASC().stream()
                .map(laptopMapper::toLaptopResponseDTO)
                .toList();
    }

    public List<LaptopResponseDTO> getByPriceDESC() {
        return laptopRepository.findByPriceDESC().stream()
                .map(laptopMapper::toLaptopResponseDTO)
                .toList();
    }

    public List<LaptopResponseDTO> getLaptopsByManyBrand(List<String> brands) {
        return laptopRepository.findLaptopsByManyBrand(brands).stream()
                .map(laptopMapper::toLaptopResponseDTO)
                .toList();
    }
}
