import userStore from "../store/userStore/userStore";
import axios from "axios";

export const getDeliveredPacks = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  let endpoint = "";
  let token = userStore.token;

  if (userStore.user.role === "DELIVERY_PERSON") {
    endpoint = `${apiUrl}/v1/api/dg/pack/delivered`;
  } else if (userStore.user.role === "CLIENT") {
    if (!token) return [];
    endpoint = `${apiUrl}/v1/api/client/pack/delivered`;
  }

  const res = await axios.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data || [];
};
