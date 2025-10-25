import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL + "/api/guild";

export const getUserGuilds = async () => {
  const res = await axios.get(`${API}/my-guilds`, { withCredentials: true });
  return res.data.guilds;
};

export const createGuild = async (guildData) => {
  const res = await axios.post(`${API}/create`, guildData, { withCredentials: true });
  return res.data.guild;
};

export const joinGuild = async (guildId) => {
  const res = await axios.post(
    `${API}/join/${guildId}`,
    {},
    { withCredentials: true }
  );
  return res.data.guild;
};
