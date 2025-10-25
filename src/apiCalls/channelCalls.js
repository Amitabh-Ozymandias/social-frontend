import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL + "/api/channel";

export const getGuildChannels = async (guildId) => {
  const res = await axios.get(`${API}/guild/${guildId}`, { withCredentials: true });
  return res.data.channels;
};

export const createChannel = async (guildId, channelData) => {
  const res = await axios.post(`${API}/create/${guildId}`, channelData, { withCredentials: true });
  return res.data.channel;
};
