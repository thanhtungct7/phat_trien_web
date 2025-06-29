package com.kmacode.camera_web.mapper;

import com.kmacode.camera_web.dto.request.LaptopRequestDTO;
import com.kmacode.camera_web.dto.response.LaptopResponseDTO;
import com.kmacode.camera_web.entity.Laptop;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LaptopMapper {
    Laptop toLaptop(LaptopRequestDTO laptopRequestDTO);
    LaptopResponseDTO toLaptopResponseDTO(Laptop laptop);
    void updateLaptop(@MappingTarget Laptop laptop, LaptopRequestDTO laptopRequestDTO);

}
