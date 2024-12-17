import React, { useContext } from "react";
import styles from "./CoursesBox.module.css";
import CoursesContainer from "../coursesContainer/CoursesContainer";
import { Data } from "../../App";

const CoursesBox = ({ sectionData }) => {
  // const {
  //   header: title,
  //   description,
  //   items: courses,
  //   title: sectionName,
  // } = sectionData;
  const coursesData = useContext(Data);
  return (
    <section className={styles.wrapper}>
      {/* <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <button className={styles.exploreButton}>Explore {sectionName}</button> */}
      <CoursesContainer courses={coursesData}></CoursesContainer>
    </section>
  );
};

export default CoursesBox;
