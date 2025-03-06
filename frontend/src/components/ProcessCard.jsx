import React from "react";

export const ProcessCard = ({ icon: Icon, process, description }) => {
  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition">
      <div className="w-16 h-16 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-white text-center">
        {process}
      </h3>
      <p className="text-gray-400 text-center">{description}</p>
    </div>
  );
};
