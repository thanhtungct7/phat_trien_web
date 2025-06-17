package com.kmacode.camera_web.service;

import com.kmacode.camera_web.dto.request.SmartPhoneRequestDTO;
import com.kmacode.camera_web.dto.response.SmartPhoneResponseDTO;
import com.kmacode.camera_web.entity.SmartPhone;
import com.kmacode.camera_web.mapper.SmartPhoneMapper;
import com.kmacode.camera_web.repository.SmartPhoneRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class SmartPhoneService {
    SmartPhoneRepository smartPhoneRepository;
     SmartPhoneMapper smartPhoneMapper;

    public SmartPhoneResponseDTO createSmartPhone(SmartPhoneRequestDTO smartPhoneRequestDTO) {
        SmartPhone smartPhone = smartPhoneMapper.toSmartPhone(smartPhoneRequestDTO);
        smartPhone = smartPhoneRepository.save(smartPhone);
        return smartPhoneMapper.toSmartPhoneResponseDTO(smartPhone);
    }

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
}
