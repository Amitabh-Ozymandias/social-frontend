import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // context hook
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// ...existing code...
const SignIn = () => {
  const { handleSignIn } = useAuth(); // get signIn function
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const user = await handleSignIn(formData);
    console.log("Signin response:", user);

    if (user) {
      navigate("/home");
    } else {
      setError("Signin failed: Invalid response from server");
    }
  } catch (err) {
    console.error("Signin error:", err);
    setError(err.response?.data?.message || "Signin failed");
  } finally {
    setLoading(false);
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
        Sign In
      </Typography>

      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
      />

      <Button
        variant="contained"
        onClick={submitForm}
        fullWidth
        disabled={loading}
        sx={{ mt: 1 }}
      >
        {loading ? <CircularProgress size={24} /> : "Sign In"}
      </Button>

      <Typography textAlign="center" sx={{ mt: 1 }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
};

export default SignIn;
// ...existing code...
