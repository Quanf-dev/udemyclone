import React from "react";
import { Col, Flex, Row } from "antd";
import DashboardCard from "./../../components/Card/DashboardCard";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./styles.less";
import DashboardChart from "./DashboardChart";



export default function DashboardPage() {
  const data1 = [
    {
      title: "New Clients",
      value: "+1,200",
      growth: "-20%",
      icon: <UserAddOutlined />,
    },
    {
      title: "Today’s Users",
      value: "3,200",
      growth: "+20%",
      icon: <UserOutlined />,
    },
    {
      title: "Today’s Sales",
      value: "$53,000",
      growth: "+30%",
      icon: <DollarOutlined />,
    },
    {
      title: "New Orders",
      value: "$13,200",
      growth: "-10%",
      icon: <ShoppingCartOutlined />,
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Flex wrap="wrap" gap={50}>
          {data1.map((item, index) => (
            <DashboardCard key={index} data={item} />
          ))}
          <DashboardChart />
        </Flex>
      </Col>
    </Row>
  );
}
