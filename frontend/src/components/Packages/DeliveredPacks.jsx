import React, { useEffect, useState } from "react";
import { ApprovedPackCard } from "../cards/ApprovedPackCard";
import { getDeliveredPacks } from "../../hooks/useGetDeliveredPacks";
import userStore from "../../store/userStore/userStore";
import { DeliveredPackCard } from "../cards/DeliveredPackCard";

export const DeliveredPacks = () => {
  const [deliveredPacks, setDeliveredPacks] = useState([]);
  const fetchDeliveredPacks = async () => {
    try {
      const data = await getDeliveredPacks();
      setDeliveredPacks(data);
    } catch (error) {
      console.error("Error fetching delivered packages:", error);
    }
  };
  useEffect(() => {
    fetchDeliveredPacks();
  }, []);
  return (
    <div className="container mx-auto py-8 pb-64">
      {deliveredPacks.length === 0 ? (
        <div className="text-center text-gray-500">
          No Delivered packages yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliveredPacks.map((pack, index) => (
            <DeliveredPackCard key={index} pack={pack}></DeliveredPackCard>
          ))}
        </div>
      )}
    </div>
  );
};
