import React, { useContext, useState } from "react";
import { Form, Input, Button, Checkbox, Flex, Typography, Space, message, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../service/api.service";
import { Navigate, useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  // dùng để chuyển trang
  const navigate = useNavigate()

  const handleLogin = async () => {

    const data = {
      loginName: name,
      password: password
    }

    const res = await login(data)
    if (res.data) {
      message.success("Đăng nhập thành công")

      // luu vao local storage
      localStorage.setItem("id", res.data.id)
      localStorage.setItem("email", res.data.email)
      localStorage.setItem("fullName", res.data.fullName)
      localStorage.setItem("avatar", res.data.avatar)
      localStorage.setItem("role", res.data.role)
      localStorage.setItem("active", res.data.active)
      localStorage.setItem("token", res.data.accessToken)

      // redirect
      navigate("/dashboard")
    } else {
      notification.error({
        message: "Login failed",
        description: JSON.stringify(res.message)
      })
    }
  }

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
          <Typography.Title level={2}>VLearning Admin</Typography.Title>
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
          <Input prefix={<UserOutlined />} placeholder="Username" onChange={(event) => setName(event.target.value)} />
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
            onChange={(event) => setPassword(event.target.value)}
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
            onClick={() => handleLogin()}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
