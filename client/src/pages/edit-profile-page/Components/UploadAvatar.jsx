import React, { useState } from "react";
import { Typography, Button, Box, Avatar } from "@mui/material";

const UploadAvatar = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    // Giả lập xử lý upload ảnh (có thể gọi API tại đây)
    console.log("Uploaded image:", image);
    alert("Avatar uploaded successfully!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Preview Avatar */}
      <Avatar
        src={preview || "https://via.placeholder.com/150"} // Hiển thị preview nếu có, không thì dùng placeholder
        alt="Avatar"
        sx={{ width: 120, height: 120 }}
      />
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-avatar"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="upload-avatar">
        <Button variant="outlined" component="span">
          Choose Image
        </Button>
      </label>
      {preview && (
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      )}
    </Box>
  );
};

export default UploadAvatar;
