import React, { useEffect, useState } from "react";
import AchievementCard from "./components/AchievementCard";
import IconMedal from "../../assets/logo/IconMedal.png";
import IconNumber1 from "../../assets/logo/number1Icon.png";
import GoalIcon from "../../assets/logo/goalIcon.png";
import { Flex } from "antd";
import ModalAchievement from "./components/ModalAchievement";
import { fetchSeveralAchievements } from "../../service/api.service";

const AchievementPage = () => {

  const [dataCard, setDataCard] = useState([])

  useEffect(() => {
    loadAchivements()
  }, [])

  const loadAchivements = async () => {
    const res = await fetchSeveralAchievements()
    if (res.data) {
      setDataCard(res.data)
    }
  }

  // const dataCard = [
  //   {
  //     ImageUrl: IconMedal,
  //     desc: "Achievement of Completion",
  //   },
  //   {
  //     ImageUrl: IconNumber1,
  //     desc: "Achievement of Completion",
  //   },
  //   {
  //     ImageUrl: GoalIcon,
  //     desc: "Achievement of Completion",
  //   },
  // ];
  return (
    <div>
      <ModalAchievement />
      <Flex gap={30}>
        {dataCard.map((item, index) => (
          // eslint-disable-next-line react/jsx-key
          <AchievementCard img={item.image} desc={item.title} key={item.id} />
        ))}
      </Flex>
    </div>
  );
};

export default AchievementPage;
