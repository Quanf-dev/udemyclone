import { useState } from "react";
import { Button, Modal, Form, Input, Select, notification } from "antd";
import {
  UserOutlined,
  AimOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";
import { createUser, updateUser, uploadFile } from "../../../service/api.service";

const ModalUserRegister = ({ loadData }) => {
  const [fileList, setFileList] = useState([]);
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm(); // Khởi tạo form từ Ant Design

  const showModal = () => {
    setIsModalOpen(true);
    // Đặt giá trị cho các trường khi mở modal
    form.setFieldsValue({
      name,
      fullName,
      address,
      phone,
      pass,
      role,
    });
  };

  const handleOk = async () => {
    const values = form.getFieldsValue();
    const profile = {
      fullName: values.fullName,
      avatar: "default-ava.jpg",
      address: values.address,
      phone: values.phone,
    };

    const user = {
      email: values.name,
      password: values.password,
      role: values.role,
      profile: profile,
    };

    const res = await createUser(user);

    if (res.data) {
      notification.success({ message: "Success", description: res.message });
      if (fileList.length > 0) {
        const resUpload = await uploadFile(fileList[0].originFileObj, "user", res.data.id);

        if (resUpload.data) {
          const userAva = {
            id: res.data.id,
            profile: {
              avatar: resUpload.data
            }
          }
          await updateUser(userAva)
        }
      }

      await loadData();
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
    form.resetFields(); // Đặt lại tất cả các trường trong form
    setFileList([]); // Xóa danh sách file

    // Cập nhật các giá trị state tương ứng
    setName("");
    setFullName("");
    setAddress("");
    setPhone("");
    setPass("");
    setRole("ADMIN");
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create user
      </Button>
      <Modal
        title="Register User"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Create"
      >
        <Form
          form={form}
          name="normal_signup"
          layout="vertical"
          requiredMark="optional"
          initialValues={{
            role: "ADMIN",
          }}
        >
          <Form.Item
            name="name"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input
              value={name}
              prefix={<UserOutlined />}
              placeholder="Login name (Email required for user)"
              onChange={(event) => {
                setName(event.target.value);
                form.setFieldsValue({ name: event.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Please input full name!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              value={fullName}
              placeholder="Full Name"
              onChange={(event) => {
                setFullName(event.target.value);
                form.setFieldsValue({ fullName: event.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              prefix={<AimOutlined />}
              value={address}
              placeholder="Your Address"
              onChange={(event) => {
                setAddress(event.target.value);
                form.setFieldsValue({ address: event.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input
              prefix={<PhoneOutlined />}
              value={phone}
              placeholder="Your Phone"
              onChange={(event) => {
                setPhone(event.target.value);
                form.setFieldsValue({ phone: event.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            extra="Password needs to be at least 8 characters."
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              value={pass}
              placeholder="Password"
              onChange={(event) => {
                setPass(event.target.value);
                form.setFieldsValue({ password: event.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select
              style={{ width: "100%" }}
              options={[
                { value: "ADMIN", label: "Admin" },
                { value: "ROOT", label: "Root" },
                { value: "STUDENT", label: "User" },
              ]}
              value={role}
              onChange={(value) => {
                setRole(value);
                form.setFieldsValue({ role: value });
              }}
            />
          </Form.Item>
          <AvatarUpload fileList={fileList} setFileList={setFileList} />
        </Form>
      </Modal>
    </>
  );
};

export default ModalUserRegister;
