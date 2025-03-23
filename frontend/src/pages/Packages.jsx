import React, { useEffect, useState } from "react";
import { PackageCard } from "../components/PackageCard";
import axios from "axios";
import userStore from "../store/userStore/userStore";

export const Packages = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [packs, setPacks] = useState([]);

  useEffect(() => {
    async function getPacks() {
      try {
        if (!userStore.token) return; // Prevents request if no token
        const res = await axios.get(`${apiUrl}/v1/api/client/pack`, {
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        setPacks(res.data);
      } catch (error) {
        console.log("Error fetching packages:", error);
      }
    }

    getPacks();
  }, [packs]); // Fetch only once when the component mounts

  return (
    <div className="container mx-auto py-8 pb-64">
      {packs.length === 0 ? (
        <div className="text-center text-gray-500">No packages available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packs.map((pack, index) => (
            <PackageCard pack={pack} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};
