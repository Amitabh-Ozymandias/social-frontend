import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getUserGuilds } from "../apiCalls/guildCalls.js";
import CreateGuild from "./CreateGuild.jsx";
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
const GuildList = ({ setSelectedGuild }) => {
  const [guilds, setGuilds] = useState([]);
  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const data = await getUserGuilds();
        setGuilds(data);
        if (data.length > 0) setSelectedGuild(data[0]);
      } catch (err) {
        console.error("Failed to fetch guilds:", err);
      }
    };
    fetchGuilds();
  }, [setSelectedGuild]);
  return (
    <Box sx={{ width: "100%" }}>
      {" "}
      <CreateGuild setGuilds={setGuilds} />{" "}
      <Box sx={{ mt: 1, ...scrollStyle, maxHeight: "60vh" }}>
        {" "}
        {guilds.map((guild) => (
          <Box
            key={guild._id}
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: "background.paper",
              mb: 1,
              cursor: "pointer",
              "&:hover": { bgcolor: "action.hover" },
            }}
            onClick={() => setSelectedGuild(guild)}
          >
            {" "}
            <Typography>{guild.name}</Typography>{" "}
          </Box>
        ))}{" "}
      </Box>{" "}
    </Box>
  );
};
export default GuildList;
