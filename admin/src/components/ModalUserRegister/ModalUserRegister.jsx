import React, { useState } from 'react';
import { Button, Modal, Select } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {Form, Grid, Input,theme } from "antd";
import Link from 'antd/es/typography/Link';

const { useBreakpoint } = Grid;
const { useToken } = theme;



const ModalUserRegister = () => {
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
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Admin Register
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                message: "Please input your Name!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Login Name" />
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
            />
          </Form.Item>
          <Select
      defaultValue="admin"
      style={{ width: "100%", marginBottom: "30px" }}
      options={[
        { value: 'admin', label: 'Admin' },
        { value: 'root', label: 'Root' },
        { value: 'user', label: 'User' },
      ]}
    />
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block type="primary" htmlType="submit">
              Sign up
            </Button>
              </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUserRegister;