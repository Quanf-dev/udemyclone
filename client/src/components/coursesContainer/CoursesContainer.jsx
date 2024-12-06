import React from "react";
import Card from "../card/Card";

const CoursesContainer = ({ courses }) => {
  const coursesCards = courses.map((course) => {
    return <Card key={course.id} course={course}></Card>;
  });
  return (
    <section style={{ display: "flex", flexWrap: "wrap" }}>
      {coursesCards}
    </section>
  );
};

export default CoursesContainer;
