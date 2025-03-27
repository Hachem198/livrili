import axios from "axios";
import userStore from "../store/userStore/userStore";

export const getPackOffer = async (id) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const res = await axios.get(`${apiUrl}/v1/api/dg/pack/offer`, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  });

  return res.data.find((offer) => offer.packId === id);
};
