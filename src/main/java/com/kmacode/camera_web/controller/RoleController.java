package com.kmacode.camera_web.controller;

//import com.kmacode.identityservice.dto.request.ApiResponse;
//import com.kmacode.identityservice.dto.request.RoleRequest;
//import com.kmacode.identityservice.dto.response.RoleResponse;
//import com.kmacode.identityservice.service.impl.RoleService;
import com.kmacode.camera_web.dto.request.RoleRequest;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.RoleResponse;
import com.kmacode.camera_web.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Slf4j
public class RoleController {
    RoleService roleService;


    @PostMapping("/create")
    public ApiResponse<RoleResponse> create(@RequestBody RoleRequest request){
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.create(request))
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<RoleResponse>> getAll(){
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getAll())
                .build();
    }

    @DeleteMapping("/{roleName}")
    public ApiResponse<Void> delete(@PathVariable String roleName){
        roleService.delete(roleName);
        return ApiResponse.<Void>builder().build();
    }
}
