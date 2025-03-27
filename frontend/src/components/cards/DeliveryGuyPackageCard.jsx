import React, { useEffect, useState, useCallback } from "react";
import { FaMapMarkerAlt, FaWeightHanging } from "react-icons/fa";
import { MakeOfferPopover } from "../MakeOfferPopover";
import axios from "axios";
import userStore from "../../store/userStore/userStore.js";
import { getPackOffer } from "../../hooks/useGetPackOffer.js";
import { toast } from "sonner";

export const DeliveryGuyPackageCard = ({ pkg }) => {
  return (
    <div
      key={pkg.id}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:border-indigo-500 hover:shadow-xl"
    >
      {/* Header */}
      <div className="bg-indigo-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center justify-between">
          <FaMapMarkerAlt className="text-white mr-2" />
          <span className="font-medium  text-white">
            {pkg.pickUpLocation} → {pkg.dropOffLocation}
          </span>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-300/80">
          {pkg.status}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Weight */}
        <div className="flex items-start mb-4">
          <FaWeightHanging className="text-gray-400 mt-1 mr-2" />
          <div>
            <p className="text-gray-400 text-xs">Weight</p>
            <p className="text-white">{pkg.weight}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-400 text-xs mb-1">Description</p>
          <p className="text-white text-sm">{pkg.description}</p>
        </div>

        <div className="justify-between mt-4 pt-3 border-t border-gray-700 ">
          <MakeOfferPopover id={pkg.id}></MakeOfferPopover>
        </div>
      </div>
    </div>
  );
};
