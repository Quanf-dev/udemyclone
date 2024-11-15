import React from "react";
import { Badge, Col, Row, Space, Typography } from "antd";
import { useLocation } from "react-router-dom";
import {
  BellOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input/Input";
import "./styles.less";

/**
 * Thành phần Header
 * Hiển thị phần tiêu đề của ứng dụng bao gồm:
 * - Điều hướng Breadcrumb
 * - Tiêu đề trang
 * - Các hành động của người dùng (tìm kiếm, thông báo, cài đặt, hồ sơ người dùng)
 */

const { Text, Title } = Typography;

export default function Header() {
  const location = useLocation();

  // Làm sạch đường dẫn bằng cách xóa tất cả các dấu gạch chéo
  const cleanedPathname = location.pathname.replace(/\//g, "");

  return (
    <Row
      justify="space-between"
      align="middle"
      style={{ paddingRight: "20px", marginBottom: "30px" }}
    >
      <Col>
        {/* Hiển thị điều hướng Breadcrumb với đường dẫn đã làm sạch */}
        <Text type="secondary">
          Pages / <Text style={{ margin: "0 5px" }}>{cleanedPathname}</Text>
        </Text>
        <Title level={4} style={{ margin: 0 }}>
          Dashboard
        </Title>
      </Col>
      <Col
        span={10}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "20px",
          fontSize: "18px",
        }}
      >
        {/* Trường tìm kiếm */}
        <Input
          size="large"
          placeholder="Type Here"
          prefix={<SearchOutlined />}
          style={{ width: "200px" }}
        />
        {/* Hồ sơ người dùng và liên kết đăng nhập */}
        <Space>
          <UserOutlined />
          <Text>Sign in</Text>
        </Space>
        {/* Icon cài đặt */}
        <SettingOutlined />
        {/* Icon thông báo với huy hiệu */}
        <Badge count={5}>
          <BellOutlined style={{ fontSize: "18px" }} />
        </Badge>
      </Col>
    </Row>
  );
}
