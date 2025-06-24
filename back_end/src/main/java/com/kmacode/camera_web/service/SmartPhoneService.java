package com.kmacode.camera_web.service;

import com.kmacode.camera_web.dto.request.SmartPhoneRequestDTO;
import com.kmacode.camera_web.dto.response.LaptopResponseDTO;
import com.kmacode.camera_web.dto.response.SmartPhoneResponseDTO;
import com.kmacode.camera_web.entity.SmartPhone;
import com.kmacode.camera_web.mapper.SmartPhoneMapper;
import com.kmacode.camera_web.repository.SmartPhoneRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class SmartPhoneService {
    SmartPhoneRepository smartPhoneRepository;
     SmartPhoneMapper smartPhoneMapper;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public SmartPhoneResponseDTO createSmartPhone(SmartPhoneRequestDTO smartPhoneRequestDTO) {
        SmartPhone smartPhone = smartPhoneMapper.toSmartPhone(smartPhoneRequestDTO);
        smartPhone = smartPhoneRepository.save(smartPhone);
        return smartPhoneMapper.toSmartPhoneResponseDTO(smartPhone);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public SmartPhoneResponseDTO updateSmartPhone(Long id, SmartPhoneRequestDTO smartPhoneRequestDTO) {
        SmartPhone smartPhone = smartPhoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Smartphone not found"));
        smartPhoneMapper.updateSmartPhone(smartPhone, smartPhoneRequestDTO);
        smartPhone = smartPhoneRepository.save(smartPhone);
        return smartPhoneMapper.toSmartPhoneResponseDTO(smartPhone);
    }


    public SmartPhoneResponseDTO getSmartPhoneById(Long id) {
        SmartPhone smartPhone = smartPhoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Smartphone not found"));
        return smartPhoneMapper.toSmartPhoneResponseDTO(smartPhone);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteSmartPhone(Long id) {
        if (!smartPhoneRepository.existsById(id)) {
            throw new RuntimeException("Smartphone not found");
        }
        smartPhoneRepository.deleteById(id);
    }
    public List<SmartPhoneResponseDTO> getAllSmartPhones() {
        return smartPhoneRepository.findAll().stream()
                .map(smartPhoneMapper::toSmartPhoneResponseDTO)
                .toList();
    }

    public List<SmartPhoneResponseDTO> getAllByBrand(String brand) {
        return smartPhoneRepository.findByBrand(brand).stream()
                .map(smartPhoneMapper::toSmartPhoneResponseDTO)
                .toList();
    }

    public List<SmartPhoneResponseDTO> getByPrice(Long minPrice, Long maxPrice) {
        return smartPhoneRepository.findByPrice(minPrice, maxPrice).stream()
                .map(smartPhoneMapper::toSmartPhoneResponseDTO)
                .toList();
    }


    public List<SmartPhoneResponseDTO> getByPriceASC() {
        return smartPhoneRepository.findByPriceASC().stream()
                .map(smartPhoneMapper::toSmartPhoneResponseDTO)
                .toList();
    }

    public List<SmartPhoneResponseDTO> getByPriceDESC() {
        return smartPhoneRepository.findByPriceDESC().stream()
                .map(smartPhoneMapper::toSmartPhoneResponseDTO)
                .toList();
    }

    public List<SmartPhoneResponseDTO> getSmartPhonesByManyBrand(List<String> brands) {
        return smartPhoneRepository.findSmartPhonesByManyBrand(brands).stream()
                .map(smartPhoneMapper::toSmartPhoneResponseDTO)
                .toList();
    }


}
