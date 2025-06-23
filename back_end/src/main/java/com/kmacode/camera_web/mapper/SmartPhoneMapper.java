package com.kmacode.camera_web.mapper;

import com.kmacode.camera_web.dto.request.SmartPhoneRequestDTO;
import com.kmacode.camera_web.dto.response.SmartPhoneResponseDTO;
import com.kmacode.camera_web.entity.SmartPhone;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SmartPhoneMapper {
    SmartPhone toSmartPhone(SmartPhoneRequestDTO smartPhoneRequestDTO);
    SmartPhoneResponseDTO toSmartPhoneResponseDTO(SmartPhone smartPhone);
    void updateSmartPhone(@MappingTarget SmartPhone smartPhone, SmartPhoneRequestDTO smartPhoneRequestDTO);
}
