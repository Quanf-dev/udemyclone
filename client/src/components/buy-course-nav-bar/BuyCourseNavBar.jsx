import React, { useEffect, useState } from "react";
import styles from "./BuyCourseNavBar.module.css";
import StarsRating from "../stars-rating/StarsRating";

function BuyCourseNavBar({ details }) {
  const [hidden, toggleHidden] = useState(true);

  const hideNav = () => {
    if (window.scrollY > 150 && hidden) {
      toggleHidden(false);
    }
    if (window.scrollY <= 150) {
      toggleHidden(true);
    }
  };
  /* editMargin Only display on mobile screens  */
  const editMargin = () => {
    const footer = document.querySelector("#page-footer");
    if (window.innerWidth >= 1080) {
      footer.style.marginBottom = 0;
    } else {
      footer.style.marginBottom = "4rem";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", hideNav);
    window.addEventListener("resize", editMargin);
  }, []);

  const { title, rating, num_subscribers: subscribers } = details;

  return (
    <div id="buyBar" className={hidden ? styles.hide : styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barLeftContent}>
          <p className={styles.courseTitle}>{title}</p>
          <span>
            <StarsRating rating={rating} />{" "}
            <span className={styles.ratingDetails}>
              <span className={styles.numOfRatings}>(3,322 ratings)</span>{" "}
              {subscribers} students
            </span>
          </span>
        </div>
        {/* barRightContent Only display on mobile screens  */}{" "}
        <div className={styles.barRightContent}>
          <div className={styles.price}>
            <span className={styles.newPrice}>$199.99</span>
            <span className={styles.oldPrice}>$679.99</span>
          </div>
          <button type="button" className={styles.buyNowButton}></button>
        </div>
      </div>
    </div>
  );
}

export default BuyCourseNavBar;
