import React from "react";
import { Form, Input, Button, Checkbox, Flex, Typography, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "@assets/logo/Udemy.png";

export default function LoginPage() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Form
        name="normal_login"
        style={{ maxWidth: "300px" }}
        initialValues={{
          remember: true,
        }}
      >
        <Space>
          <Typography.Title level={2}>Udemy Admin</Typography.Title>
        </Space>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              width: "100%",
            }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
