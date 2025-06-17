package com.kmacode.camera_web.service;

import com.kmacode.camera_web.dto.request.LaptopRequestDTO;
import com.kmacode.camera_web.dto.response.LaptopResponseDTO;
import com.kmacode.camera_web.entity.Laptop;
import com.kmacode.camera_web.mapper.LaptopMapper;
import com.kmacode.camera_web.repository.LaptopRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
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
    public LaptopResponseDTO createLaptop(LaptopRequestDTO laptopRequestDTO) {
        Laptop laptop = laptopMapper.toLaptop(laptopRequestDTO);
        laptop = laptopRepository.save(laptop);
        return laptopMapper.toLaptopResponseDTO(laptop);
    }

    public LaptopResponseDTO updateLaptop(Long id, LaptopRequestDTO laptopRequestDTO) {
        Laptop laptop = laptopRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Laptop not found with id: " + id));
        laptopMapper.updateLaptop(laptop, laptopRequestDTO);
        laptop = laptopRepository.save(laptop);
        return laptopMapper.toLaptopResponseDTO(laptop);
    }
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
}
