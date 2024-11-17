import React, { useState } from "react";
import { Badge, Col, Drawer, Row, Space, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
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

const { Search } = Input;


export default function Header() {
  const location = useLocation();
  const [NoficationOpen, setNoficationOpen] = useState(false);
  const [SettingOpen, setSettingOpen] = useState(false);

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
        <Search
          size="large"
          placeholder="Type Here"
          style={{ width: "200px" }}
        />
        {/* Hồ sơ người dùng và liên kết đăng nhập */}
        <Space>
          <UserOutlined />
          <Link to="/login" style={{fontSize: "1rem", color:"black"}}>Sign in</Link>
        </Space>
        {/* Icon cài đặt */}
        <SettingOutlined onClick={() => setSettingOpen(true)}/>
        {/* Icon thông báo với huy hiệu */}
        <Badge count={5}>
          <BellOutlined style={{ fontSize: "18px" }} onClick={() => setNoficationOpen(true)} />
        </Badge>
        <Drawer title="Nofication" onClose={() => setNoficationOpen(false)} open={NoficationOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
        <Drawer title="Setting" onClose={() => setSettingOpen(false)} open={SettingOpen}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      </Col>
    </Row>
  );
}
