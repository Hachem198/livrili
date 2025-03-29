import axios from "axios";
import { useState } from "react";
import userStore from "../store/userStore/userStore";

export const getOfferedPacks = async () => {
  let packsIds = [];
  const apiUrl = import.meta.env.VITE_API_URL;

  const res1 = await axios.get(`${apiUrl}/v1/api/dg/pack/offer`, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  });

  packsIds = res1.data.map((offer) => offer.packId);

  const res2 = await axios.get(`${apiUrl}/v1/api/dg/pack`, {
    headers: { Authorization: `Bearer ${userStore.token}` },
  });

  return res2.data.filter((pack) => packsIds.includes(pack.id));
};
