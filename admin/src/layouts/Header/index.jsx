import React from "react";
import "./styles.less";
import { Flex, Typography } from "antd";

export default function Header() {
  return (
    <Flex>
      <Typography.Text style={{ fontSize: "20px" }}>
        Pages/ <span>ddd</span>
      </Typography.Text>
    </Flex>
  );
}
