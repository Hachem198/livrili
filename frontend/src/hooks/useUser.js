import { useQuery } from "react-query";
import axios from "axios";
import userStore from "../stores/userStore";
import { observer } from "mobx-react-lite";
const apiUrl = import.meta.env.VITE_API_URL;
const getUserApi = async () => {
  if (!userStore.token) return null; // No token, no request

  const response = await axios.get("/api/user", {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
    },
  });
};

// Custom Hook to fetch user and update the store
const useUser = () => {
  return useQuery("user", getUserApi, {
    onSuccess: (data) => {
      userStore.setUser(data);
    },
    onError: () => {
      userStore.setUser(null);
    },
    enabled: !!userStore.token, // Only fetch if token exists
    retry: false, // Avoid retrying if it fails
  });
};

export default observer(useUser);
