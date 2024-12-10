import { useState } from "react";
import { Button, Modal, notification, Select, Upload } from "antd";
import {
  AimOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import { createUser, uploadFile } from "../../../service/api.service";
import ImgCrop from "antd-img-crop";

const ModalUserRegister = () => {

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList }) => {
    setFileList(fileList);
    console.log(fileList)
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

  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {

    const profile = {
      fullName: fullName,
      avatar: "default-ava.jpg",
      address: address,
      phone: phone
    }

    if (fileList.length > 0) {
      profile.avatar = fileList[0].name
    }

    const user = {
      email: name,
      password: pass,
      role: role,
      profile: profile
    }

    const res = await createUser(user);

    if (res.data) {
      console.log(res);
      notification.success({
        message: "Success",
        description: res.message,
      });

      if (fileList.length > 0) {
        await uploadFile(fileList[0].originFileObj, "user", res.data.id)
      }

      handleCancel();
    } else {
      notification.error({
        message: "Failed",
        description:
          typeof res === "object" ? JSON.stringify(res.message) : res,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setName("");
    setPass("");
    setRole("ADMIN");
  };

  return (
    <>
      <Button type="primary" onClick={() => showModal()}>
        Create user
      </Button>
      <Modal
        title="Register User"
        open={isModalOpen}
        onClose={() => handleCancel()}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        okText={"Create"}
      >
        <Form name="normal_signup" layout="vertical" requiredMark="optional">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input login name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              value={name}
              placeholder="Login name (Email require for user)"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input login name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              value={fullName}
              placeholder="Full Name"
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            {" "}
            <Input
              prefix={<AimOutlined />}
              placeholder="Your Address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            {" "}
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Your Phone"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            extra="Password needs to be at least 8 characters."
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(event) => setPass(event.target.value)}
            />
          </Form.Item>
          <Select
            style={{ width: "100%", marginBottom: "30px" }}
            options={[
              { value: "ADMIN", label: "Admin" },
              { value: "ROOT", label: "Root" },
              { value: "STUDENT", label: "User" },
            ]}
            defaultValue={role}
            value={role}
            onSelect={(value) => setRole(value)}
          />
          <ImgCrop rotationSlider>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </Form>

      </Modal>
    </>
  );
};

export default ModalUserRegister;
