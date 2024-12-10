import { useState } from "react";
import { Button, Flex, Modal, notification, Select } from "antd";
import {
  AimOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input } from "antd";
import { createUser } from "../../../service/api.service";
import AvatarUpload from "../../../components/AvatarUpload/AvatarUpload";

const ModalUserEdit = () => {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log(">>>> open : " + name);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const res = await createUser(name, pass, role);
    if (res.data) {
      console.log(res);
      notification.success({
        message: "Success",
        description: res.message,
      });

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
        Detail user
      </Button>
      <Modal
        title="Detail user"
        open={isModalOpen}
        onClose={() => handleCancel()}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        okText={"Create"}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button color="primary">Update</Button>
          </>
        )}
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
        <AvatarUpload />
      </Modal>
    </>
  );
};

export default ModalUserEdit;
