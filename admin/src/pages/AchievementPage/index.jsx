import React from "react";
import AchievementCard from "./components/AchievementCard";
import IconMedal from "../../assets/logo/IconMedal.png";
import IconNumber1 from "../../assets/logo/number1Icon.png";
import GoalIcon from "../../assets/logo/goalIcon.png";
import { Flex } from "antd";
import ModalAchievement from "./components/ModalAchievement";

const AchievementPage = () => {
  const dataCard = [
    {
      ImageUrl: IconMedal,
      desc: "Achievement of Completion",
    },
    {
      ImageUrl: IconNumber1,
      desc: "Achievement of Completion",
    },
    {
      ImageUrl: GoalIcon,
      desc: "Achievement of Completion",
    },
  ];
  return (
    <div>
      <ModalAchievement />
      <Flex gap={30}>
        {dataCard.map((item, index) => (
          <AchievementCard img={item.ImageUrl} desc={item.desc} />
        ))}
      </Flex>
    </div>
  );
};

export default AchievementPage;
