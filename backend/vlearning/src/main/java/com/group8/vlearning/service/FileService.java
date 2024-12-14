package com.group8.vlearning.service;

import java.io.File;
import java.io.InputStream;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.group8.vlearning.util.error.CustomException;

@Service
public class FileService {

    @Value("${storage-default-path}")
    private String defaultPath;

    // tạo các folder riêng cho người dùng, khóa học, ... dựa vào id
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
            // this.deleteFiles(storePath, purposeOfFile); // xóa các file cùng mục đích sử
            // dụng
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);

            return path.getFileName().toString();
        } catch (Exception e) {
            throw new CustomException("Store file failed");
        }
    }

    // public void deleteFiles(String storePath, String purposeOfFile) throws
    // CustomException {
    // try {
    // Path folderPath = Paths.get(storePath);

    // DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath,
    // purposeOfFile + "*"); // Mẫu "ava-*"
    // for (Path path : stream) {
    // if (Files.isRegularFile(path)) { // Kiểm tra nếu là tệp
    // Files.delete(path);
    // }
    // }

    // } catch (Exception e) {
    // throw new CustomException("Delete files failed");
    // }
    // }

    public void deleteFolder(String folderPath) {
        Path path = Paths.get(folderPath);

        // Xóa tệp hoặc thư mục
        FileSystemUtils.deleteRecursively(path.toFile());
    }
}
