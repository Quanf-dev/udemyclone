import React from "react";
import SideMenu from "./SideMenu";
import { Flex, Layout } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <Flex
      gap={40}
      style={{
        Height: "100vh",
        Width: "100vw",
        paddingTop: "20px",
      }}
    >
      <SideMenu />
      <Flex vertical style={{ flex: 1 }}>
        <Header />
        <Outlet />
      </Flex>
    </Flex>
  );
}
