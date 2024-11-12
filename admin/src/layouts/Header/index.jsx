import React from "react";
import "./styles.less";
import { Flex, Typography } from "antd";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const cleanedPathname = location.pathname.replace(/\//g, "").charAt(0); // Sử dụng phương thức replace để xóa ký tự "/"
  return (
    <Flex>
      <Typography.Text style={{ fontSize: "25px" }}>
        Pages /<span style={{ margin: "0 5px" }}>{cleanedPathname}</span>
      </Typography.Text>
    </Flex>
  );
}
