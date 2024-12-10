import React from "react";
import { Card, Typography } from "antd";
const AchievementCard = ({ img, desc }) => (
  <Card
    style={{
      width: 200,
    }}
    cover={<img src={img} />}
  >
    <Typography>{desc} </Typography>
  </Card>
);
export default AchievementCard;
