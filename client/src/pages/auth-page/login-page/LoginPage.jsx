/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Checkbox,
  Button,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login, sendEmailVerification } from "../../../service/api.service";
import { message, notification } from "antd";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // dùng để chuyển trang
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign-up data:", formData);

    const data = {
      loginName: formData.email,
      password: formData.password
    }

    const res = await login(data)
    if (res.data) {
      message.success("Đăng nhập thành công")

      // luu vao local storage
      localStorage.setItem("id", res.data.id)
      localStorage.setItem("token", res.data.accessToken)

      // redirect
      navigate("/")
    } else {
      notification.error({
        message: "Login failed",
        description: JSON.stringify(res.message)
      })
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://frontends.udemycdn.com/components/auth/desktop-illustration-x1.webp"
              alt="vleaning"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login and Start Learning
          </Typography>
          <form style={{ width: "100%" }} onSubmit={handleSignUpSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox id="newsletter" />}
                  label="Send me special offers, personalized recommendations, and learning tips."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ cursor: "pointer" }}>
                    {" "}
                    Sign up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
