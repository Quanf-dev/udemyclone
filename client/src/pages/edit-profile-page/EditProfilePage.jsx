import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, TextField, Button } from "@mui/material";
import styles from "./EditProfilePage.module.css";
import UploadAvatar from "./Components/UploadAvatar";
import NavBar from "../../components/nav-bar/NavBar";
import PurchasedCourse from "./Components/PurchasedCourse";
import { useState } from "react";
import { fetchUser, updateUser } from "../../service/api.service";
import { message, notification } from "antd";
import { useEffect } from "react";

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// a11yProps function for tab accessibility
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EditProfilePage = () => {
  const [value, setValue] = useState(0);
  const [nestedValue, setNestedValue] = useState(0); // State for nested tabs

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const id = localStorage.getItem("id")

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const res = await fetchUser(id)

    if (res.data && res.data.profile) {
      setEmail(res.data.email)
      setFullName(res.data.profile.fullName)
      setBio(res.data.profile.bio)
      setPhone(res.data.profile.phone)
      setAddress(res.data.profile.address)
    }
  }

  const handleUpdate = async () => {
    const data = {
      id,
      profile: {
        fullName,
        bio,
        address,
        phone
      }
    }


    const res = await updateUser(data)
    if (res.data) {
      notification.success({
        message: "Cập nhật thành công",
        description: JSON.stringify(res.message)
      })

      await loadUser()
    } else {
      notification.error({
        message: "Login failed",
        description: JSON.stringify(res.message)
      })
    }
  }

  // side menu
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // tab
  const handleNestedChange = (event, newValue) => {
    setNestedValue(newValue);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" className={styles.container}>
        <Box sx={{ display: "flex" }}>
          {/* Sidebar with tabs */}
          <Box className={styles.sidebar} sx={{ flexShrink: 0, width: 200 }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Profile settings tabs"
              sx={{ borderRight: 1, borderColor: "divider", width: "100%" }}
            >
              <Tab label="Profile" {...a11yProps(0)} />
              <Tab label="Avatar" {...a11yProps(1)} />
              <Tab label="Account Security" {...a11yProps(2)} />
              <Tab label="My Course" {...a11yProps(3)} />
            </Tabs>
          </Box>

          {/* Form content */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Profile Tab */}
            <TabPanel value={value} index={0}>
              <Typography variant="h4" gutterBottom>
                Public Profile
              </Typography>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                disabled={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={4}
                variant="outlined"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" fullWidth onClick={() => handleUpdate()}>
                Update
              </Button>
            </TabPanel>

            {/* Avatar Tab */}
            <TabPanel value={value} index={1}>
              <Typography variant="h4" gutterBottom>
                Update Avatar
              </Typography>
              <UploadAvatar />
            </TabPanel>

            {/* Account Security Tab */}
            <TabPanel value={value} index={2}>
              <Typography variant="h4" gutterBottom>
                Account Security
              </Typography>
              <Typography>
                Secure your account with two-factor authentication, password
                updates, and more.
              </Typography>
            </TabPanel>

            {/* My Course Tab */}
            <TabPanel value={value} index={3}>
              <Typography variant="h4" gutterBottom>
                My Course
              </Typography>
              <Tabs
                value={nestedValue}
                onChange={handleNestedChange}
                aria-label="My Course Tabs"
                sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
              >
                <Tab label="PurchasedCourse" {...a11yProps(0)} />
                <Tab label="Tab Empty" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={nestedValue} index={0}>
                <PurchasedCourse />
              </TabPanel>
              <TabPanel value={nestedValue} index={1}></TabPanel>
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditProfilePage;
