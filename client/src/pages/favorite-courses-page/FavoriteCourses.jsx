import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./FavoriteCourses.module.css";
import NavBar from "../../components/nav-bar/NavBar";
import Footer from "../../components/footer/Footer";

const FavoriteCourses = () => {
  // Favorite courses data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "The Complete 2024 Web Development Bootcamp",
      author: "Dr. Angela Yu",
      image: "https://via.placeholder.com/120x80",
      rating: "4.7 ⭐ (415,779 ratings)",
    },
    {
      id: 2,
      title: "The Complete AI-Powered Copywriting Course",
      author: "Ing. Tomas Moravek",
      image: "https://via.placeholder.com/120x80",
      rating: "4.6 ⭐ (1,694 ratings)",
    },
  ]);

  // Handle removing a favorite course
  const handleRemove = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <>
      <NavBar />
      <Box className={styles.container}>
        <Typography className={styles.title}>Favorite Courses</Typography>

        {courses.length > 0 ? (
          courses.map((course) => (
            <Box key={course.id} className={styles.courseCard}>
              <img
                src={course.image}
                alt={course.title}
                className={styles.courseImage}
              />

              <Box className={styles.courseDetails}>
                <Typography className={styles.courseTitle}>
                  {course.title}
                </Typography>
                <Typography className={styles.courseMeta}>
                  {course.author} • {course.rating}
                </Typography>
              </Box>

              <IconButton
                onClick={() => handleRemove(course.id)}
                className={styles.removeButton}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography variant="body1">You have no favorite courses.</Typography>
        )}

        {/* Button to browse more courses */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, alignSelf: "flex-start" }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Browse More Courses
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default FavoriteCourses;
