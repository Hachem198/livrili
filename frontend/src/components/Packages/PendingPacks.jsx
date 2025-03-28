import React, { useEffect, useState } from "react";
import { ClientPackageCard } from "../ClientPackageCard.jsx";
import { getPacks } from "../../hooks/useGetPacks.js";
import { Link } from "react-router-dom";

export const PendingPacks = () => {
  const [packs, setPacks] = useState([]);
  const fetchPacks = async () => {
    try {
      const data = await getPacks();
      const pendingPacks = data.filter(
        (pack) => pack.status === "PENDING" || pack.status === "OFFERED"
      );
      console.log({ data });
      console.log({ pendingPacks });
      setPacks(pendingPacks);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  useEffect(() => {
    fetchPacks();
  }, []);
  return (
    <div className="container mx-auto py-8 pb-64">
      {packs.length === 0 ? (
        <div className="text-center text-gray-500">No packages available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packs.map((pack, index) => (
            <ClientPackageCard pack={pack} key={index} setPacks={setPacks} />
          ))}
        </div>
      )}
    </div>
  );
};
