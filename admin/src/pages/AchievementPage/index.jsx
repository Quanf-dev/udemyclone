import React, { useEffect, useState } from "react";
import AchievementCard from "./components/AchievementCard";
import IconMedal from "../../assets/logo/IconMedal.png";
import IconNumber1 from "../../assets/logo/number1Icon.png";
import GoalIcon from "../../assets/logo/goalIcon.png";
import { Flex } from "antd";
import { fetchASeveralAchievements } from "../../service/api.service";

const AchievementPage = () => {

  const [dataCard, setDataCard] = useState([])

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    const res = await fetchASeveralAchievements()

    if (res.data) {
      setDataCard(res.data)
    }

  }

  return (
    <Flex gap={30}>
      {dataCard.map((item, index) => (
        <AchievementCard desc={item.description} />
      ))}
    </Flex>
  );
};

export default AchievementPage;
