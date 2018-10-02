package com.akalanka.backend.controller;

import com.akalanka.backend.config.NumberGenerator;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "api/uploades")
public class UploadController {

     private String imageUrl;

    @PostMapping(value = "/images",consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadFile(@RequestParam("file")MultipartFile file) throws IOException {
        // String imageUrl = NumberGenerator.NumberGenerators();
        System.out.println(file.getOriginalFilename());
        System.out.println(file.getName());
        System.out.println(file.getContentType());
         //Optional<String> fileExtension = NumberGenerator.getExtensionByStringHandling(file.getOriginalFilename());
        System.out.println(NumberGenerator.getExtensionByStringHandling(file.getContentType()));
         System.out.println(StringUtils.substringBetween(String.valueOf(file.getContentType()), "/" ));
        System.out.println(file.getContentType().substring(6));
        String extension = StringUtils.substringBetween(String.valueOf(file.getContentType()), "/");
        File convertFile = new File("K:\\Github-Daily-Projects\\Angular-Dashboard-Version6\\Angular6Dashboard\\src\\assets\\img\\student\\"+file.getOriginalFilename() );
        convertFile.createNewFile();
        FileOutputStream fout = new FileOutputStream(convertFile);
        fout.write(file.getBytes());
        fout.close();
        return new ResponseEntity<HttpStatus>( HttpStatus.OK);
    }
}

