import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

const CourseCard = ({ course, onEdit }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.desc}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${course.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Field: {course.field}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Skills: {course.skills.join(", ")}
        </Typography>
        {/* Edit Button */}
        <Button
          variant="outlined"
          color="primary"
          onClick={onEdit}
          style={{ marginTop: "8px" }}
        >
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
