import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "./styles.less";

const AvatarUpload = ({ text }) => {
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotationSlider>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        onChange={onChange}
        onPreview={onPreview}
        style={{ width: "1000px", display: "flex", justifyContent: "left" }}
      >
        {fileList.length < 1 && `+ ${text}`}
      </Upload>
    </ImgCrop>
  );
};
export default AvatarUpload;
