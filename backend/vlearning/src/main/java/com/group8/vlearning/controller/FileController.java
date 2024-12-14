package com.group8.vlearning.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.group8.vlearning.domain.dto.response.ResponseDTO;
import com.group8.vlearning.service.FileService;
import com.group8.vlearning.util.error.CustomException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/v1")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/file")
    public ResponseEntity<ResponseDTO<String>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("folder") String folder,
            @RequestParam("id") long id)
            throws CustomException {

        ResponseDTO<String> res = new ResponseDTO<>();
        res.setStatus(HttpStatus.CREATED.value());
        res.setMessage("Upload success");
        res.setData(this.fileService.storeFile(file, fileService.createFolder(folder, id)));

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    // @DeleteMapping("/file")
    // public String updateFile(@RequestParam("file") MultipartFile file,
    // @RequestParam("folder") String folder,
    // @RequestParam("id") long id, @RequestParam("purpose") String pp) throws
    // CustomException {

    // // xóa tất cả các file có ava- ở đầu
    // this.fileService.deleteFiles("ava-", fileService.createFolder(folder, id));

    // return "";
    // }

}
