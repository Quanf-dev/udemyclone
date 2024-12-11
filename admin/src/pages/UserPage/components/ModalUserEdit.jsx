import { useState } from "react";
import { Button, Flex, Modal, notification, Select } from "antd";
import {
  AimOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import { createUser, uploadFile } from "../../../service/api.service";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";

const ModalUserEdit = (props) => {
  const [fileList, setFileList] = useState([]);

  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const { isModalUpdateOpen, setIsModalUpdateOpen } = props

  const handleOk = async () => {
    await uploadFile(fileList[0].originFileObj, "user", 666)
  };

  const handleCancel = () => {
    setIsModalUpdateOpen(false);
    setName("");
    setPass("");
    setRole("ADMIN");
  };

  return (
    <>
      <Modal
        title="Detail user"
        open={isModalUpdateOpen}
        onClose={handleCancel}
        onCancel={() => handleCancel()}
        onOk={() => handleOk()}
        okText={"Update"}
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
              placeholder="Login Name"
              disabled="true"
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
        </Form>
        <AvatarUpload fileList={fileList} setFileList={setFileList} />
      </Modal>
    </>
  );
};

export default ModalUserEdit;
