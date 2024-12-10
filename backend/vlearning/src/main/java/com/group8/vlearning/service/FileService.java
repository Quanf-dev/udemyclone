package com.group8.vlearning.service;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.group8.vlearning.util.error.CustomException;

@Service
public class FileService {

    @Value("${storage-default-path}")
    private String defaultPath;

    public String createFolder(String directFolder, long id) throws CustomException {
        try {
            Path storagePath = Paths.get(defaultPath);

            File folder = new File(storagePath.toAbsolutePath().toString() + "/" + directFolder + "/" + id);

            // check folder tồn tại
            if (!folder.exists()) {
                folder.mkdirs();
            }

            return folder.getAbsolutePath().toString();
        } catch (Exception e) {
            throw new CustomException("Create folder failed");
        }

    }

    public String storeFile(MultipartFile file, String storePath) throws CustomException {
        try {
            String newFilePath = storePath + "/" + file.getOriginalFilename();

            Path path = Paths.get(newFilePath);

            InputStream inputStream = file.getInputStream();
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);

            return path.toAbsolutePath().toString();
        } catch (Exception e) {
            throw new CustomException("Store file failed");
        }
    }
}
