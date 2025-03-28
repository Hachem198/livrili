import axios from "axios";
import React, { useEffect, useState } from "react";
import { getOfferedPacks } from "../../hooks/useGetOfferedPacks";
import { DeliveredPackCard } from "../cards/DeliveredPackCard";
import { DeliveryGuyPackageCard } from "../cards/DeliveryGuyPackageCard";

export const OfferedPacks = () => {
  const [offeredPacks, setOfferedPacks] = useState([]);
  const fetchOfferedPacks = async () => {
    try {
      const data = await getOfferedPacks();
      setOfferedPacks(data);
    } catch (error) {
      console.error("Error fetching offered packages:", error);
    }
  };
  useEffect(() => {
    fetchOfferedPacks();
  }, []);

  return (
    <div className="container mx-auto py-8 pb-64">
      {offeredPacks.length === 0 ? (
        <div className="text-center text-gray-500">No Offered packages yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offeredPacks.map((pack, index) => (
            <DeliveryGuyPackageCard
              key={index}
              pkg={pack}
            ></DeliveryGuyPackageCard>
          ))}
        </div>
      )}
    </div>
  );
};
