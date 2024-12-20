import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchPurchasedCourse } from "../../../service/api.service";
import CourseCard from "./course-card/CourseCard";

const PurchasedCourse = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const res = await fetchPurchasedCourse(+localStorage.getItem("id"))
    if (res.data) {
      setData(res.data)
    }


  }

  useEffect(() => {
    loadData();
  }, [])
  console.log("c", data);



  let arr = ["keke", "haha"];

  return (
    <div>
      {" "}
      <Typography variant="h6">PurchasedCourse </Typography>
      {data.map((item, index) => {
        const arrSkill = item.skills.map(skill => skill.name)
        return (
          <CourseCard
            key={index}
            title={item.title}
            desc={item.description}
            image="https://via.placeholder.com/300x200"
            price={item.price}
            field={item.field.name}
            skills={arrSkill}
          />
        )
      })}
    </div>
  );
};

export default PurchasedCourse;
