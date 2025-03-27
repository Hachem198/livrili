import React, { useEffect, useState } from "react";
import { FaWeightHanging } from "react-icons/fa";
import { DeliveryGuyPackageCard } from "../components/cards/DeliveryGuyPackageCard";
import { getPacks } from "../hooks/useGetPacks";

const PAGE_SIZE = 6;

const AvailablePackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPacks = async () => {
    try {
      const data = await getPacks();
      setPackages(data);
    } catch (error) {
      console.log("Erreur Fetching Packages !", error);
    }
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  const totalPages = Math.ceil(packages.length / PAGE_SIZE);
  const paginatedPackages = packages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Available Packages</h1>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPackages.map((pkg) => (
            <DeliveryGuyPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Empty state */}
        {paginatedPackages.length === 0 && (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWeightHanging className="text-gray-500 text-2xl" />
            </div>
            <h3 className="text-white text-xl font-medium mb-2">
              No packages found
            </h3>
            <p className="text-gray-400">
              Try adjusting your filters or check back later for new delivery
              opportunities.
            </p>
          </div>
        )}

        {/* Pagination */}
        {packages.length > PAGE_SIZE && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-indigo-700 text-white"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailablePackagesPage;
