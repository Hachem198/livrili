import React, { useEffect, useState } from "react";
import userStore from "../../store/userStore/userStore";
import { getApprovedPacks } from "../../hooks/useGetApprovedPacks";
import { ApprovedPackCard } from "../cards/ApprovedPackCard";

export const ApprovedPacks = () => {
  const [approvedPacks, setApprovedPacks] = useState([]);
  useEffect(() => {
    const fetchApprovedPacks = async () => {
      try {
        const data = await getApprovedPacks();
        console.log(data);
        setApprovedPacks(data);
      } catch (error) {
        console.error("Error fetching approved packages:", error);
      }
    };

    fetchApprovedPacks();
  }, []);
  console.log({ approvedPacks });
  return (
    <div className="container mx-auto py-8 pb-64">
      {approvedPacks.length === 0 ? (
        <div className="text-center text-gray-500">
          No approved packages yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedPacks.map((pack, index) => (
            <ApprovedPackCard
              key={index}
              pack={pack}
              setApprovedPacks={setApprovedPacks}
            ></ApprovedPackCard>
          ))}
        </div>
      )}
    </div>
  );
};
