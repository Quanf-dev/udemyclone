import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Checkbox,
  Button,
  Typography,
  Link,
  FormControlLabel,
} from "@mui/material";
import EmailVerification from "./components/email-verification-form/EmailVerification";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-up data:", formData);
    setStep(2);
  };

  return (
    <Container maxWidth="xl">
      {step === 1 ? (
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
              Sign Up and Start Learning
            </Typography>
            <form style={{ width: "100%" }} onSubmit={handleSignUpSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="fullname"
                    label="Full Name"
                    fullWidth
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                </Grid>
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
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" align="center">
                    By signing up, you agree to the Terms of Use and Privacy
                    Policy.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" align="center">
                    Already have an account? <Link href="#">Log In</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      ) : (
        <EmailVerification email={formData.email} />
      )}
    </Container>
  );
};

export default SignupPage;
