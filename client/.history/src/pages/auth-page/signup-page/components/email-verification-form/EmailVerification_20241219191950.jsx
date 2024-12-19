/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Box, Typography, Button, Container, Link } from "@mui/material";
import OTPInput from "../../../../../components/otp-ui/OTP-input";
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';
import { createUser, sendEmailVerification } from "../../../../../service/api.service";
import { useNavigate } from "react-router-dom";

const EmailVerification = ({ email, fullName, password }) => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); // chặn hành vi mặc định
    // Handle OTP verification logic here
    const code = Cookies.get('code');
    console.log(code)
    if (code) { // Cookie không tồn tại hoặc đã hết hạn
      const isMatch = await bcrypt.compare(otp, code);
      if (isMatch === true) {
        const data = {
          email,
          password,
          role: "STUDENT",
          profile: {
            fullName,
            avatar: "default-ava.jpg"
          },
          active: true,
          protect: false
        }
        const res = await createUser(data)
        // neu dang ky thanh cong
        if (res.data) {
          Cookies.remove('code');
          navigate("/")
        } else {
          alert("dang ky that bai")
        }
      } else {
        alert("Ma sai hoac het han")
      }
    }
  };

  const handleResendCode = () => {
    sendEmailVerification(email)
  };

  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5">VLearning</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Help us protect your account
        </Typography>
        <Typography sx={{ mt: 1 }}>
          You are signed in as {email}. For added security, you'll need to
          verify your identity. We've sent a verification code to {email}.
        </Typography>
        <Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmit}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Verification code
          </Typography>
          <OTPInput
            separator={<span>-</span>}
            value={otp}
            onChange={setOtp}
            length={5}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Verify code
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Link href="#" onClick={handleResendCode}>
              Resend code
            </Link>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ mt: 3 }}>
          If you don't have access to the primary email address, you can send a
          code to another address associated with this account, or you can try
          to verify another way.
        </Typography>
      </Box>
    </Container>
  );
};

export default EmailVerification;
