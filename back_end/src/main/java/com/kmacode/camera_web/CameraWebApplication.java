package com.kmacode.camera_web;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class CameraWebApplication {

    public static void main(String[] args) {
        Dotenv dotenv = Dotenv.configure().directory("/mnt/data/DEV/Code/KMACODE/lap_trinh_web/test/back_end/").ignoreIfMissing().load();

        // Nạp tất cả biến môi trường vào hệ thống
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));


        SpringApplication.run(CameraWebApplication.class, args);
    }

}
