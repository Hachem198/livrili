export const getApprovedPacks = async () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  let endpoint = "";
  let token = userStore.token;

  if (userStore.user.role === "DELIVERY_PERSON") {
    endpoint = `${apiUrl}/v1/api/dg/pack/approved`;
  } else if (userStore.user.role === "CLIENT") {
    if (!token) return [];
    endpoint = `${apiUrl}/v1/api/client/pack/approved`;
  }

  const res = await axios.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data || [];
};
