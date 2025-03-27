import axios from "axios";
import userStore from "../store/userStore/userStore";
import { useEffect, useCallback } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

// Custom Hook to fetch user and update the store
const useUser = () => {
  const getUserApi = useCallback(async () => {
    if (!userStore.token) return null; // No token, no request

    const response = await axios.get(apiUrl + "/v1/api/auth", {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    });

    return response.data;
  }, [userStore.token]); // Add token as a dependency to avoid stale closures

  useEffect(() => {
    getUserApi()
      .then((user) => {
        console.log(user);
        if (user) {
          userStore.setUser(user);
        } else {
          userStore.setUser(null);
        }
      })
      .catch(() => {
        userStore.setUser(null);
      });
  }, [getUserApi]); // Re-run if the function changes

  // Optionally, return the user or loading/error states
  return userStore.user;
};

export default useUser;
