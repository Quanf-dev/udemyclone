package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.group8.vlearning.service.FileService;
import com.group8.vlearning.util.error.CustomException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/v1")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/file")
    public String uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("folder") String folder,
            @RequestParam("id") long id)
            throws CustomException {

        String rs = this.fileService.storeFile(file, fileService.createFolder(folder, id));

        return rs;
    }

}
