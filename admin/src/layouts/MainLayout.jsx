import React from "react";
import SideMenu from "./SideMenu";
import { Flex, Layout } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <Flex gap={50} style={{ minHeight: "100vh" }}>
      <SideMenu />
      <Flex vertical>
        <Header />
        <Outlet />
      </Flex>
    </Flex>
  );
}
