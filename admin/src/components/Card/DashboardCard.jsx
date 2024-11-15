import React, { Suspense, lazy } from "react";
import { Card, Flex, Space, Spin, Typography } from "antd";

const DashboardCard = ({ data: item }) => {
  return (
    <Card style={{ width: 350 }}>
      {" "}
      <Flex
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div>
          {" "}
          <Typography.Paragraph type="secondary">
            {item.title}
          </Typography.Paragraph>
          <Typography.Text style={{ fontSize: "30px" }} level={3}>
            {" "}
            {item.value}
            <span
              style={{
                fontSize: "15px",
                marginLeft: "10px",
                color: item.growth ? "green" : "red",
              }}
            >
              {item.growth}
            </span>
          </Typography.Text>
        </div>
        {item.icon}
      </Flex>
    </Card>
  );
};

export default DashboardCard;
