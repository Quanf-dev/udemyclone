import React, { useEffect, useState } from "react";
import AchievementCard from "./components/AchievementCard";
import IconMedal from "../../assets/logo/IconMedal.png";
import IconNumber1 from "../../assets/logo/number1Icon.png";
import GoalIcon from "../../assets/logo/goalIcon.png";
import { Flex } from "antd";
<<<<<<< HEAD
import ModalAchievement from "./components/ModalAchievement";
=======
import { fetchASeveralAchievements } from "../../service/api.service";
>>>>>>> 35a9b15ec8db729731a399174bf54502061bf3ff

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
<<<<<<< HEAD
    <div>
      <ModalAchievement />
      <Flex gap={30}>
        {dataCard.map((item, index) => (
          <AchievementCard img={item.ImageUrl} desc={item.desc} />
        ))}
      </Flex>
    </div>
=======
    <Flex gap={30}>
      {dataCard.map((item, index) => (
        <AchievementCard desc={item.description} />
      ))}
    </Flex>
>>>>>>> 35a9b15ec8db729731a399174bf54502061bf3ff
  );
};

export default AchievementPage;
