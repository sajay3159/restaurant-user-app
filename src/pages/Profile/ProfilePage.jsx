import { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Avatar,
  Container,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const DATABASE_URL =
  "https://restaurent-app-e9615-default-rtdb.firebaseio.com/users/";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.uid);
  const [name, setName] = useState("");
  const [profileUrl, setProfileUrl] = useState("update your profile img url");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}${userId}.json`);
      const data = await response.json();
      if (data) {
        setName(data.name);
        setProfileUrl(data.profileUrl);
      }
    } catch (error) {
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setError("");
      const profileData = {
        name: name,
        profileUrl: profileUrl,
      };

      const response = await fetch(`${DATABASE_URL}${userId}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile data");
      }
      setSnackbarMessage("Profile saved successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile Page
      </Typography>
      <IconButton
        edge="start"
        color="inherit"
        onClick={handleBack}
        sx={{ position: "absolute", top: 70, left: 20 }}
      >
        <ArrowBack />
      </IconButton>
      <Avatar
        src={profileUrl}
        alt="Profile Image"
        sx={{ width: 150, height: 150, margin: "0 auto", mb: 3 }}
      />
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Profile Image URL"
        variant="outlined"
        fullWidth
        value={profileUrl}
        onChange={(e) => setProfileUrl(e.target.value)}
        sx={{ marginBottom: 3 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ padding: "10px 20px" }}
      >
        Save
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
