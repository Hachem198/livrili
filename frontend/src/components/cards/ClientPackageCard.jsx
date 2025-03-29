import React, { useCallback, useState } from "react";
import { X, Edit } from "lucide-react";
import { FaMapMarkerAlt, FaWeightHanging, FaInfoCircle } from "react-icons/fa";
import userStore from "../../store/userStore/userStore.js";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { OfferCard } from "./OfferCard.jsx";
import { handleDeletePack } from "../../hooks/useDeletePack.js";
import axios from "axios";
import { toast } from "sonner";

export const ClientPackageCard = ({ pack, setPacks, onEdit }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [offers, setOffers] = useState(() => [...pack.offers]);
  const getStatusStyle = (status) => {
    const statusStyles = {
      PENDING: "bg-yellow-600/80 text-yellow-100",
      OFFERED: "bg-green-600 text-green-100",
    };

    return statusStyles[status] || "bg-gray-600 text-gray-100";
  };
  const handleDecision = useCallback(
    async (id, status) => {
      try {
        const res = await axios.put(
          `${apiUrl}/v1/api/client/pack/offer/${id}/decision`,
          { status },
          {
            headers: { Authorization: `Bearer ${userStore.token}` },
          }
        );

        setOffers((prevOffers) => {
          let updatedOffers;
          if (status === "ACCEPTED") {
            toast.success("Offer Accepted");
            updatedOffers = prevOffers.filter((offer) => offer.offerId === id);
            setPacks((prevPacks) => prevPacks.filter((p) => p.id !== pack.id));
          } else if (status === "DECLINED") {
            toast.info("Offer Declined");
            updatedOffers = prevOffers.filter((offer) => offer.offerId !== id);
          } else {
            updatedOffers = prevOffers;
          }

          return updatedOffers;
        });
      } catch (error) {
        console.error(error);
      }
    },
    [setOffers, setPacks, pack.id]
  );
  return (
    <div className="relative group">
      {/* Action buttons container */}
      <div className="absolute -top-2 -right-2 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200">
        {/* Delete button */}
        <button
          onClick={() => handleDeletePack(pack.id, pack.status, setPacks)}
          className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-all duration-200 transform scale-90 group-hover:scale-100"
          title="Delete package"
        >
          <X size={14} />
        </button>
      </div>

      <Popover>
        <PopoverTrigger className="w-full h-full">
          <div
            key={pack.id}
            className="bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:border-indigo-500 hover:shadow-indigo-900/20 hover:shadow-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-indigo-300" />
                <span className="font-medium text-white  w-fit">
                  {pack.pickUpLocation} → {pack.dropOffLocation}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                  pack.status
                )}`}
              >
                {pack.status}
              </span>
            </div>

            {/* Body */}
            <div className="p-5">
              {/* Weight */}
              <div className="flex items-start mb-4">
                <FaWeightHanging className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-gray-400 text-xs">Weight : </p>
                  <p className="text-white">{pack.weight}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 flex-col">
                <p className="text-gray-400 text-xs mb-1 flex">
                  Description :{" "}
                </p>
                <p className="text-white text-sm text-left">
                  {pack.description}
                </p>
              </div>
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-full p-5 bg-gradient-to-b from-purple-950 to-purple-900 text-purple-100 border border-purple-700/50 rounded-xl shadow-2xl">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Choose an Offer
            </h3>
            {offers.map((offer) => (
              <OfferCard
                key={offer.offerId}
                offer={offer}
                handleDecision={handleDecision}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
