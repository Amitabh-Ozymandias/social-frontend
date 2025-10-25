import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError(""); // reset error
    try {
      const res = await handleSignUp(formData);
      if (res) navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
        Sign Up
      </Typography>

      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        sx={{ bgcolor: "background.default", borderRadius: 1 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        sx={{ bgcolor: "background.default", borderRadius: 1 }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        sx={{ bgcolor: "background.default", borderRadius: 1 }}
      />

      <Button variant="contained" onClick={submitForm} fullWidth>
        Sign Up
      </Button>

      <Typography textAlign="center" sx={{ mt: 1 }}>
        Already have an account? <Link to="/signin">Sign In</Link>
      </Typography>
    </Box>
  );
};

export default SignUp;
