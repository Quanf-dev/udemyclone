import React, { useState } from 'react';
import { Button, Modal, notification, Select } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Grid, Input, theme } from "antd";
import Link from 'antd/es/typography/Link';
import { createUser } from '../../service/api.service';

const { useBreakpoint } = Grid;
const { useToken } = theme;



const ModalUserRegister = () => {

  const [name, setName] = useState("")
  const [pass, setPass] = useState("")
  const [role, setRole] = useState("Admin")

  const { token } = useToken();
  const screens = useBreakpoint();
  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md ? `${token.paddingXL}px` : `${token.paddingXL}px ${token.padding}px`,
      width: "380px"
    },
    forgotPassword: {
      float: "right"
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center"
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
    },
    signup: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%"
    },
    text: {
      color: token.colorTextSecondary
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log(">>>> open : " + name)
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const res = await createUser(name, pass, role)

    if (res.data) {
      notification.success({
        message: "Success",
        description: "Create user success!"
      })
    } else {
      notification.error({
        message: "Failed",
        description: "Create user failed!"
      })
    }

    handleCancel()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setName("")
    setPass("")
    setRole("ADMIN")
  };

  return (
    <>
      <Button type="primary" onClick={() => showModal()}>
        Admin Register
      </Button>
      <Modal title="Basic Modal"
        open={isModalOpen} onClose={() => handleCancel()}
        onOk={() => handleOk()} onCancel={() => handleCancel()}
        okText={"Create"}
      >
        <Form
          name="normal_signup"
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input login name!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} value={name} placeholder="Login Name" onChange={(event) => { setName(event.target.value) }} />
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
            defaultValue="admin"
            style={{ width: "100%", marginBottom: "30px" }}
            options={[
              { value: 'ADMIN', label: 'Admin' },
              { value: 'ROOT', label: 'Root' },
              { value: 'STUDENT', label: 'User' },
            ]}
            value={role}
            onSelect={(value) => setRole(value)}
          />
        </Form>
      </Modal>
    </>
  );
};
export default ModalUserRegister;