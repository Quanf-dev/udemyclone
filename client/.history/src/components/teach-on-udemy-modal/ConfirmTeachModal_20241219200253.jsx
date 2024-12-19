import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import styles from "./ConfirmTeachModal.module.css"; // Import CSS Module

function ConfirmTeachModal({ isModalOpen, setIsModalOpen }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: localStorage.getItem("email"),
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    setIsModalOpen(false); // Close modal after submit
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={styles.modalContainer}
      >
        <Box className={styles.modalContent}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            className={styles.modalHeader}
          >
            User Information
          </Typography>
          <div className={styles.modalBody}>
            <div className={styles.inputField}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputField}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className={styles.button}>
              <Button className="cancel" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmTeachModal;
