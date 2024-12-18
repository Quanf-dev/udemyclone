import { Card, CardContent, Typography } from "@mui/material";
import styles from "./CourseCard.module.css";

const CourseCard = ({ title, desc, image, price, field, skills }) => {
  return (
    <Card className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <CardContent>
        <Typography className={styles.title}>{title}</Typography>
        <Typography className={styles.desc}>{desc}</Typography>
        <Typography className={styles.price}>${price}</Typography>
        <Typography className={styles.field}>{field}</Typography>
        <div className={styles.skills}>
          {skills.map((skill, index) => (
            <span key={index} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
