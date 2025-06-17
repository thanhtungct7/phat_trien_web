package com.kmacode.camera_web.controller;

//import com.kmacode.identityservice.dto.request.ApiResponse;
//import com.kmacode.identityservice.dto.request.PermissionRequest;
//import com.kmacode.identityservice.dto.response.PermissionResponse;
//import com.kmacode.identityservice.service.impl.PermissionService;
import com.kmacode.camera_web.dto.request.PermissionRequest;
import com.kmacode.camera_web.dto.response.ApiResponse;
import com.kmacode.camera_web.dto.response.PermissionResponse;
import com.kmacode.camera_web.service.PermissionService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@Slf4j
public class PermissionController {
    PermissionService permissionService;

    @PostMapping
    ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest request){
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.create(request))
                .build();
    }

    @GetMapping("/all")
    ApiResponse<List<PermissionResponse>> getAll(){
        return ApiResponse.<List<PermissionResponse>>builder()
                .result(permissionService.getAll())
                .build();
    }

    @DeleteMapping("/{permissionName}")
    ApiResponse<Void> delete(@PathVariable String permissionName){
        permissionService.delete(permissionName);
        return ApiResponse.<Void>builder().build();
    }

}
