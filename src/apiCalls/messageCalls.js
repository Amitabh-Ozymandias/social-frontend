import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL + "/api/message";

export const getChannelMessages = async (channelId) => {
  const res = await axios.get(`${API}/${channelId}`, { withCredentials: true });
  return res.data.messages;
};

export const sendMessage = async (channelId, messageData) => {
  const res = await axios.post(`${API}/send/${channelId}`, messageData, { withCredentials: true });
  return res.data.newMessage;
};
