import React, { useState } from "react";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import CourseCard from "../course-card/CourseCard";

const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // Track which course is being edited
  const [newCourse, setNewCourse] = useState({
    title: "",
    desc: "",
    image: "",
    price: "",
    field: "",
    skills: "",
  });

  const handleOpen = (course) => {
    setEditingCourse(course); // Set course to be edited
    setNewCourse({ ...course }); // Populate modal with course values
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCourse(null); // Reset editing state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingCourse) {
      const updatedCourses = courses.map((course) =>
        course.title === editingCourse.title
          ? { ...course, ...newCourse }
          : course
      );
      setCourses(updatedCourses); // Update the courses array
    }
    handleClose();
  };

  const [courses, setCourses] = useState([
    {
      title: "React for Beginners",
      desc: "Learn the basics of React, a popular JavaScript library for building user interfaces.",
      image: "https://via.placeholder.com/300x200",
      price: "49.99",
      field: "Web Development",
      skills: ["JavaScript", "React", "UI Design"],
    },
    {
      title: "Advanced JavaScript",
      desc: "Deep dive into JavaScript concepts and patterns.",
      image: "https://via.placeholder.com/300x200",
      price: "59.99",
      field: "Programming",
      skills: ["JavaScript", "ES6+", "Debugging"],
    },
    {
      title: "UI/UX Design Basics",
      desc: "Get started with UI/UX design principles.",
      image: "https://via.placeholder.com/300x200",
      price: "39.99",
      field: "Design",
      skills: ["Figma", "Prototyping", "Design Pri"],
    },
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CourseCard {...course} onClick={() => handleOpen(course)} />
          </Grid>
        ))}
      </Grid>

      {/* Button to open Modal */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleOpen(null)} // Open an empty modal for adding new course
        style={{ marginTop: "16px" }}
      >
        Add Course
      </Button>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            style={{ marginBottom: "16px" }}
          >
            {editingCourse ? "Edit Course" : "Create Course"}
          </Typography>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={newCourse.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="desc"
            fullWidth
            margin="normal"
            value={newCourse.desc}
            onChange={handleInputChange}
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            margin="normal"
            value={newCourse.image}
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            margin="normal"
            value={newCourse.price}
            onChange={handleInputChange}
          />
          <TextField
            label="Field"
            name="field"
            fullWidth
            margin="normal"
            value={newCourse.field}
            onChange={handleInputChange}
          />
          <TextField
            label="Skills (comma-separated)"
            name="skills"
            fullWidth
            margin="normal"
            value={newCourse.skills.join(",")}
            onChange={(e) =>
              setNewCourse((prev) => ({
                ...prev,
                skills: e.target.value.split(","),
              }))
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
            onClick={handleSave}
          >
            {editingCourse ? "Save Changes" : "Save"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCourse;
