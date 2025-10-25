import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { getChannelMessages, sendMessage } from "../apiCalls/messageCalls.js";

const scrollStyle = {
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
};

const MessageList = ({ selectedChannel }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedChannel) return;

    const fetchMessages = async () => {
      try {
        const data = await getChannelMessages(selectedChannel._id);
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [selectedChannel]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    try {
      const sent = await sendMessage(selectedChannel._id, { content: newMsg });
      setMessages((prev) => [...prev, sent]);
      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (!selectedChannel) return <Typography>Select a channel</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Messages area */}
      <Box sx={{ flexGrow: 1, mb: 2, ...scrollStyle }}>
        {messages.map((msg) => (
          <Box
            key={msg._id}
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "background.paper",
              mb: 1,
            }}
          >
            <Typography variant="body2">
              <strong>{msg.sender?.username || "User"}:</strong> {msg.content}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input area */}
      <Box component="form" sx={{ display: "flex", gap: 1 }} onSubmit={handleSend}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          sx={{ bgcolor: "background.default", borderRadius: 1 }}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default MessageList;
