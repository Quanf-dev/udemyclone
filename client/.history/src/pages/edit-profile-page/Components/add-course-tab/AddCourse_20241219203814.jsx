import React, { useState } from "react";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import CourseCard from "../course-card/CourseCard";

const AddCourse = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    desc: "",
    image: "",
    price: "",
    field: "",
    skills: "",
  });
  const [editCourse, setEditCourse] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (course) => {
    setEditCourse(course);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("New Course Created:", newCourse);
    handleClose();
  };

  const handleUpdate = () => {
    console.log("Course Updated:", editCourse);
    setEditOpen(false);
  };

  const courses = [
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
  ];

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
            <CourseCard {...course} />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditOpen(course)}
              style={{ marginTop: "8px" }}
            >
              Edit
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Button to open Create Modal */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
        style={{ marginTop: "16px" }}
      >
        Add Course
      </Button>

      {/* Modal for creating course */}
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
            Create Course
          </Typography>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="desc"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Field"
            name="field"
            fullWidth
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            label="Skills (comma-separated)"
            name="skills"
            fullWidth
            margin="normal"
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
            Save
          </Button>
        </Box>
      </Modal>

      {/* Modal for editing course */}
      <Modal open={editOpen} onClose={handleEditClose}>
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
            Edit Course
          </Typography>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={editCourse?.title || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Description"
            name="desc"
            fullWidth
            margin="normal"
            value={editCourse?.desc || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Image URL"
            name="image"
            fullWidth
            margin="normal"
            value={editCourse?.image || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            margin="normal"
            value={editCourse?.price || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Field"
            name="field"
            fullWidth
            margin="normal"
            value={editCourse?.field || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Skills (comma-separated)"
            name="skills"
            fullWidth
            margin="normal"
            value={editCourse?.skills?.join(",") || ""}
            onChange={(e) =>
              setEditCourse((prev) => ({
                ...prev,
                skills: e.target.value.split(","),
              }))
            }
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCourse;
