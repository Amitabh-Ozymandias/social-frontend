import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getGuildChannels } from "../apiCalls/channelCalls.js";
import CreateChannel from "./CreateChannel.jsx";

const scrollStyle = {
  overflowY: "auto",
  "&::-webkit-scrollbar": { width: "8px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
};

const ChannelList = ({ selectedGuild, channels, setChannels, setSelectedChannel }) => {
  useEffect(() => {
    if (!selectedGuild) return;

    const fetchChannels = async () => {
      try {
        const data = await getGuildChannels(selectedGuild._id);
        setChannels(data);
        if (data.length > 0) setSelectedChannel(data[0]);
      } catch (err) {
        console.error("Failed to fetch channels:", err);
      }
    };

    fetchChannels();
  }, [selectedGuild, setChannels, setSelectedChannel]);

  if (!selectedGuild) return <Typography>Select a server to view channels</Typography>;

  return (
    <Box sx={{ width: "100%" }}>
      <CreateChannel guildId={selectedGuild._id} setChannels={setChannels} />
      <Box sx={{ mt: 1, ...scrollStyle, maxHeight: "60vh" }}>
        {channels.map((ch) => (
          <Box
            key={ch._id}
            sx={{ p: 2, borderRadius: 1, bgcolor: "background.paper", mb: 1, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
            onClick={() => setSelectedChannel(ch)}
          >
            <Typography>{ch.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChannelList;
