import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";
import { getUserGuilds } from "../apiCalls/guildCalls.js";
import GuildList from "../components/GuildList.jsx";
import ChannelList from "../components/ChannelList.jsx";
import MessageList from "../components/MessageList.jsx";
import CreateGuild from "../components/CreateGuild.jsx";

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

const Home = () => {
  const { user } = useContext(AuthContext);
  const [guilds, setGuilds] = useState([]);
  const [selectedGuild, setSelectedGuild] = useState(null);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchGuilds = async () => {
        try {
          const data = await getUserGuilds();
          setGuilds(data);
        } catch (err) {
          console.error("Failed to fetch guilds:", err);
        }
      };
      fetchGuilds();
    }
  }, [user]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", bgcolor: "background.default", color: "text.primary", p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Welcome to Home!</Typography>

      {user ? (
        <Typography sx={{ mb: 3 }}>
          Logged in as: <strong>{user.username}</strong>
        </Typography>
      ) : (
        <Typography sx={{ mb: 3, color: "error.main" }}>You are not logged in!</Typography>
      )}

      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: 0 }}>
        {/* ===== Guilds ===== */}
        <Grid item xs={3}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: "background.paper", height: "100%", display: "flex", flexDirection: "column", "&:hover": { bgcolor: "action.hover" } }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Servers</Typography>
            <CreateGuild refreshGuilds={setGuilds} />
            <Box sx={{ flexGrow: 1, mt: 1, ...scrollStyle }}>
              <GuildList guilds={guilds} setSelectedGuild={setSelectedGuild} />
            </Box>
          </Box>
        </Grid>

        {/* ===== Channels ===== */}
        <Grid item xs={3}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: "background.paper", height: "100%", display: "flex", flexDirection: "column", "&:hover": { bgcolor: "action.hover" } }}>
            {selectedGuild ? (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>{selectedGuild.name} Channels</Typography>
                <ChannelList
                  selectedGuild={selectedGuild}
                  channels={channels}
                  setChannels={setChannels}
                  setSelectedChannel={setSelectedChannel}
                />
              </>
            ) : (
              <Typography>Select a server to see its channels</Typography>
            )}
          </Box>
        </Grid>

        {/* ===== Messages ===== */}
        <Grid item xs={6}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: "background.paper", height: "100%", display: "flex", flexDirection: "column", "&:hover": { bgcolor: "action.hover" } }}>
            {selectedChannel ? (
              <>
                <Typography variant="h6" sx={{ mb: 1 }}>#{selectedChannel.name}</Typography>
                <Box sx={{ flexGrow: 1, ...scrollStyle }}>
                  <MessageList selectedChannel={selectedChannel} />
                </Box>
              </>
            ) : (
              <Typography>Select a channel to view messages</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
