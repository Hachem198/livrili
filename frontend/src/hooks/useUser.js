import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import userStore from "../store/userStore/userStore";

const apiUrl = import.meta.env.VITE_API_URL;

const useUser = () => {
  const [loading, setLoading] = useState(true);

  const getUserApi = useCallback(async () => {
    if (!userStore.token) {
      setLoading(false);
      return null;
    }

    try {
      const response = await axios.get(`${apiUrl}/v1/api/auth`, {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }, [userStore.token]);

  useEffect(() => {
    let isMounted = true;

    getUserApi()
      .then((user) => {
        if (isMounted) {
          userStore.setUser(user || null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          userStore.setUser(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [getUserApi]);

  return loading ? undefined : userStore.user;
};
export default useUser;
