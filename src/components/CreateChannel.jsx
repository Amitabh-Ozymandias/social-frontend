import React, { useState } from "react";
import { createChannel } from "../apiCalls/channelCalls.js";
import { Box, TextField, Button } from "@mui/material";

const CreateChannel = ({ guildId, setChannels }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    try {
      const newChannel = await createChannel(guildId, { name });
      setChannels((prev) => [...prev, newChannel]);
      setName("");
    } catch (err) {
      console.error("Failed to create channel:", err.response?.data || err);
      alert(err.response?.data?.message || "Channel creation failed");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1, mb: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="New channel"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ bgcolor: "background.default", borderRadius: 1 }}
      />
      <Button type="submit" variant="contained">Create</Button>
    </Box>
  );
};

export default CreateChannel;
