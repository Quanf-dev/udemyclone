import React, { useState } from "react";
import {
  BarChartOutlined,
  BulbOutlined,
  GoldOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "@assets/logo/Udemy.png";
import "./styles.less";

import { useNavigate } from "react-router-dom";
import { Button, Flex, Menu, Space, Typography } from "antd";
const items = [
  {
    label: "Dashboard",
    icon: <BarChartOutlined />,
    key: "/dashboard",
  },
  {
    label: "User Management",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    label: "Course Management",
    key: "/course",
    icon: <BulbOutlined />,
  },
  {
    label: "Prize Management",
    key: "/prize",
    icon: <GoldOutlined />,
  },
];
const SideMenu = () => {

  const navigate = useNavigate();
  const onClick = (e) => navigate(e.key);
  return (
    <Flex
      vertical
      gap={30}
      style={{
        width: "250px",
      }}
    >
      <Space>
        <img src={logo}></img>
        <Typography.Text
          strong
          style={{
            fontSize: "20px",
            marginLeft: "-20px",
          }}
        >
          Udemy Admin
        </Typography.Text>
      </Space>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["/dashboard"]}
        items={items}
      />
    </Flex>
  );
};
export default SideMenu;
