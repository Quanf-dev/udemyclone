import React from "react";
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

const SignupPage = () => {
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
            Đăng ký và bắt đầu học
          </Typography>
          <form style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField id="fullname" label="Tên đầy đủ" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField id="email" label="Email" type="email" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Mật khẩu"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Mật khẩu"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox id="newsletter" />}
                  label="Gửi cho tôi các ưu đãi đặc biệt, đề xuất cá nhân hóa và bí quyết học tập."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Đăng ký
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Bằng việc đăng ký, bạn đồng ý với Điều khoản sử dụng và Chính
                  sách về quyền riêng tư.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Bạn đã có tài khoản chưa? <Link href="#">Đăng nhập</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupPage;
