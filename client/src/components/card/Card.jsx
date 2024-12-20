import React, { useState } from "react";
import styles from "./Card.module.css";
import { Link, Popover } from "@mui/material";
import PopoverCard from "../popover-card/PopoverCard";
import StarsRating from "../stars-rating/StarsRating";
import { useNavigate } from "react-router-dom";

const Card = ({ course }) => {
  // const { title, visible_instructors, image_304x171: image, rating } = course;
  const { title, ownBy: { email } } = course;
  // const instructors = visible_instructors
  //   .map((instructor) => instructor.title)
  //   .join(", ");

  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <>
      <div
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
        className={styles.courseWrapper}
        onClick={handleClick}
      >
        <article className={styles.card}>
          <figure className={styles.wrapper}>
            <img src="https://img-c.udemycdn.com/course/125_H/8324_fa84_13.jpg" alt="" />
          </figure>
          <section className={styles.body}>
            <Link to={`/courses/${course.id}`} className={styles.courseTitle}>
              <p>{title}</p>
            </Link>
            <p className={styles.instructors}>{email}</p>
            <p className={styles.rating}>{4.5123.toPrecision(2)}</p>
            <StarsRating rating={4.5123} />
            <p className={styles.price}>$15</p>
          </section>
        </article>
      </div>

      <Popover
        style={{ zIndex: 50000 }}
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{
          pointerEvents: "none",
        }}
        PaperProps={{
          onMouseEnter: openPopover,
          onMouseLeave: closePopover,
          sx: {
            pointerEvents: "auto",
          },
        }}
        disableRestoreFocus
        disableScrollLock
      >
        <PopoverCard course={course} />
      </Popover>
    </>
  );
};

export default Card;
