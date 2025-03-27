import React, { useEffect, useState } from "react";
import { ClientPackageCard } from "../ClientPackageCard.jsx";
import { getPacks } from "../../hooks/useGetPacks.js";
import { Link } from "react-router-dom";

export const ClientPackagesPage = () => {
  const [packs, setPacks] = useState([]);
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const data = await getPacks();
        setPacks(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPacks();
  }, []);
  return (
    <div className="container mx-auto py-8 pb-64">
      <Link to="/packages/approved-packs">
        <h1 className="text-white underline flex justify-end pb-4">
          &rarr; Check Approved packs
        </h1>
      </Link>
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
