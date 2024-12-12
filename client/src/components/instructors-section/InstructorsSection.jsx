import React from "react";
import styles from "./InstructorsSection.module.css";
import { List, ListItem } from "@mui/material";
import InstructorCard from "../instructor-card/InstructorCard";

function InstructorsSection({ details }) {
  const { visible_instructors: instructors } = details;
  return (
    <main className={styles.mainContainer}>
      <p className={styles.sectionTitle}>Instructors</p>
      <List>
        {instructors.map((instructor, idx) => {
          return (
            <ListItem key={idx} disablePadding>
              <InstructorCard details={instructor} />
            </ListItem>
          );
        })}
      </List>
    </main>
  );
}

export default InstructorsSection;
