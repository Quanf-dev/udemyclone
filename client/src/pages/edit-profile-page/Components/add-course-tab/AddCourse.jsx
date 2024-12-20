import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CourseCard from "../course-card/CourseCard";
import { createCourse, fetchSeveralFields, uploadFile } from "../../../../service/api.service";
import { Description } from "@mui/icons-material";
import { notification } from "antd";

const AddCourse = () => {
  const [image, setImage] = useState("");
  const [dataField, setDataField] = useState(null);
  const [fields, setFields] = useState([]); // State to store fields
  const [skillsByField, setSkillsByField] = useState({}); // State for skills

  const [newCourse, setNewCourse] = useState({
    title: "",
    desc: "",
    image: "",
    price: "",
    field: "",
    skills: [],
  });
  const [editCourse, setEditCourse] = useState(null);

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    loadField();
  }, []);

  useEffect(() => {
    if (dataField) {
      const fieldsData = dataField.map(field => ({
        id: field.id,
        name: field.name,
      }));

      const skillsData = dataField.reduce((acc, field) => {
        // Map skills to an array of objects { id, name }
        acc[field.id] = field.skills.map(skill => ({
          id: skill.id,
          name: skill.name,
        }));
        return acc;
      }, {});

      setFields(fieldsData);
      setSkillsByField(skillsData);
    }
  }, [dataField]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0].originFileObj;
    if (file) {
      // If a file is selected, create a URL for the file
      const imageUrl = URL.createObjectURL(file);
      setNewCourse((prev) => ({ ...prev, image: imageUrl })); // For Create Course
      if (editCourse) {
        setEditCourse((prev) => ({ ...prev, image: imageUrl })); // For Edit Course
      }
    }
  };

  const loadField = async () => {
    const res = await fetchSeveralFields();
    setDataField(res.data); // Assuming the response data is in 'res.data'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (e) => {
    const { value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      field: value,
      skills: [], // Reset skills when field changes
    }));
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      skills: value,
    }));
  };

  const handleSave = async () => {
    console.log("New Course Created:", newCourse);

    const skillObjects = newCourse.skills.map(skill => ({ id: skill }));

    const data = {
      title: newCourse.title,
      description: newCourse.desc,
      ownBy: {
        id: +localStorage.getItem("id")
      },
      price: newCourse.price,
      status: "PENDING",
      field: {
        id: newCourse.field
      },
      skills: skillObjects,
      active: true
    }

    const res = await createCourse(data)

    if (res.data) {
      notification.success({
        title: "Create course",
        description: "Create course success"
      })
    }

    setOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCourse((prev) => ({ ...prev, [name]: value }));
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
      skills: ["Figma", "Prototyping", "Design Principles"],
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
            <CourseCard
              {...course}
              onEdit={() => setEditCourse(course) && setEditOpen(true)}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setOpen(true)}
        style={{ marginTop: "16px" }}
      >
        Add Course
      </Button>

      {/* Create Course Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2" style={{ marginBottom: "16px" }}>
            Create Course
          </Typography>
          <TextField label="Title" name="title" fullWidth margin="normal" onChange={handleInputChange} />
          <TextField label="Description" name="desc" fullWidth margin="normal" onChange={handleInputChange} />
          <TextField label="Price" name="price" fullWidth margin="normal" onChange={handleInputChange} />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e)}
            style={{ marginTop: "16px" }}
          />

          {/* Field Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Field</InputLabel>
            <Select value={newCourse.field} name="field" onChange={handleFieldChange} label="Field">
              {fields.map((field) => (
                <MenuItem key={field.id} value={field.id}>
                  {field.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Skills Dropdown */}
          {newCourse.field && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Skills</InputLabel>
              <Select
                multiple
                value={newCourse.skills}
                name="skills"
                onChange={handleSkillsChange}
                label="Skills"
              >
                {skillsByField[newCourse.field]?.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button variant="contained" color="primary" style={{ marginTop: "16px" }} onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>

      {/* Edit Course Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2" style={{ marginBottom: "16px" }}>
            Edit Course
          </Typography>
          <TextField label="Title" name="title" fullWidth margin="normal" value={editCourse?.title || ""} onChange={handleEditInputChange} />
          <TextField label="Description" name="desc" fullWidth margin="normal" value={editCourse?.desc || ""} onChange={handleEditInputChange} />
          <TextField label="Image URL" name="image" fullWidth margin="normal" value={editCourse?.image || ""} onChange={handleEditInputChange} />
          <TextField label="Price" name="price" fullWidth margin="normal" value={editCourse?.price || ""} onChange={handleEditInputChange} />

          {/* Edit Field Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Field</InputLabel>
            <Select value={editCourse?.field || ""} name="field" onChange={handleEditInputChange} label="Field">
              {fields.map((field) => (
                <MenuItem key={field.id} value={field.id}>
                  {field.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Edit Skills Dropdown */}
          {editCourse?.field && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Skills</InputLabel>
              <Select multiple value={editCourse?.skills || []} name="skills" onChange={(e) => handleEditInputChange({ target: { name: "skills", value: e.target.value } })} label="Skills">
                {skillsByField[editCourse?.field]?.map((skill) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button variant="contained" color="primary" style={{ marginTop: "16px" }} onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCourse;
