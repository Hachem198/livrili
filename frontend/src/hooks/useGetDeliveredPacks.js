export const getDeliveredPacks = async () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
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
