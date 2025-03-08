import React from "react";

export const ServiceCard = ({ service, description }) => {
  return (
    <div className="flex items-center border-purple-600 shadow-lg rounded-lg overflow-hidden border-t-4 border lg:w-[400px] min-w-[400px] min-h-[200px]">
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
          {service}
        </h3>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};
