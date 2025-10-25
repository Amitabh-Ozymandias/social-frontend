import React, { useState } from "react";
import { createGuild } from "../apiCalls/guildCalls.js";
import { Box, TextField, Button } from "@mui/material";
const CreateGuild = ({ setGuilds }) => {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const newGuild = await createGuild({ name });
      setGuilds((prev) => [...prev, newGuild]);
      setName("");
    } catch (err) {
      console.error("Failed to create guild:", err);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mb: 1 }}
    >
      {" "}
      <TextField
        fullWidth
        size="small"
        placeholder="New guild"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ bgcolor: "background.default", borderRadius: 1 }}
      />{" "}
      <Button type="submit" variant="contained">
        {" "}
        Create{" "}
      </Button>{" "}
    </Box>
  );
};
export default CreateGuild;
