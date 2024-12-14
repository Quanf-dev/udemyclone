import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import OTP from "../../../../components/otp-ui/OTP";

const EmailVerification = ({ firstName, companyName }) => {
  const [otp, setOtp] = React.useState("");

  return (
    <Paper
      sx={{
        textAlign: "center",
        backgroundColor: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#a7281a",
          color: "white",
          padding: "20px",
        }}
      >
        <img
          src="vlearning-logo-removebg-preview (1).png"
          alt="Email Icon"
          style={{ width: "80px", height: "70px" }}
        />
      </Box>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ color: "#333" }}>
          Email Verification
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", margin: "10px 0" }}>
          Hi <span>{firstName}</span>,
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", margin: "10px 0" }}>
          You're almost set to start enjoying <span>{companyName}</span>. Simply
          click the link below to verify your email address and get started. The
          link expires in 48 hours.
        </Typography>
        <Button
          href="#"
          variant="contained"
          color="error"
          sx={{
            padding: "12px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            marginTop: "20px",
            transition: "background-color 0.3s",
          }}
        >
          Verify Email
        </Button>
      </Box>
      <OTP
        separator={<span>-</span>}
        value={otp}
        onChange={setOtp}
        length={5}
      />

      <Box
        sx={{
          padding: "10px",
          fontSize: "12px",
          color: "#888",
        }}
      >
        &copy; 2024 {companyName}
      </Box>
    </Paper>
  );
};

export default EmailVerification;
