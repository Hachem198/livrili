import React, { useEffect, useState } from "react";
import { getPacks } from "../../hooks/useGetPacks";
import { DeliveryGuyPackageCard } from "../cards/DeliveryGuyPackageCard";
import { Link } from "react-router-dom";

export const DeliveryGuyHeroSection = () => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const data = await getPacks();
        setPackages(data);
        console.log(data);
      } catch (error) {
        console.log("Erreur Fetching Packages !", error);
      }
    };
    fetchPacks();
  }, []);
  return (
    <div className="w-full py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Available Packages
        </h2>
        <p className="text-white text-center mb-10">
          Browse available deliveries and make your offer
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 3).map((pkg) => (
            <DeliveryGuyPackageCard
              key={pkg.id}
              pkg={pkg}
            ></DeliveryGuyPackageCard>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/availablepacks">
            <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white hover:text-indigo-900 transition-colors duration-300">
              View All Packages
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
