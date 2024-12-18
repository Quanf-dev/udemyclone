import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import styles from "./AccountSecurity.module.css"; // Import CSS Module

export default function AccountSecurity() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountProtection, setAccountProtection] = useState(false);

  const handleSubmit = () => {
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    console.log("Account Protection:", accountProtection);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Account Security</h2>

      <TextField
        fullWidth
        label="Current Password"
        type="password"
        variant="outlined"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="New Password"
        type="password"
        variant="outlined"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Confirm New Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={accountProtection}
            onChange={(e) => setAccountProtection(e.target.checked)}
          />
        }
        label="Enable Account Protection"
        className={styles.switchLabel}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className={styles.submitButton}
      >
        Save Changes
      </Button>
    </div>
  );
}
