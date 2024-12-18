import React from "react";
import { Box, Typography, Button } from "@mui/material";
import styles from "./SuccessPayment.module.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SuccessPayment = () => {
  return (
    <Box className={styles.container}>
      <CheckCircleOutlineIcon className={styles.icon} />
      <Typography variant="h4" className={styles.title}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" className={styles.message}>
        Thank you for your purchase. Your payment was processed successfully.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default SuccessPayment;
