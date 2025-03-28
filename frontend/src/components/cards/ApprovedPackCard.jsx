import React, { useState } from "react";
import { FaWeightHanging, FaMapMarkerAlt } from "react-icons/fa";
import { renderStars } from "../../methods/renderStars";
import userStore from "../../store/userStore/userStore";
import axios from "axios";
import { toast } from "sonner";

export const ApprovedPackCard = ({ pack, setApprovedPacks }) => {
  const [isDelivered, setIsDelivered] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleDeliveryChange = async () => {
    try {
      setIsDelivered(!isDelivered);
      await axios.put(
        `${apiUrl}/v1/api/dg/pack/${pack.packId}/delivered`,
        {},
        {
          headers: { Authorization: `Bearer ${userStore.token}` },
        }
      );
      setApprovedPacks((prevPacks) =>
        prevPacks.filter((p) => p.packId !== pack.packId)
      );

      toast.success("Package is marked as delivered");
    } catch (error) {
      console.error("Error marking package as delivered:", error);
      toast.error("Failed to mark package as delivered");
    }
  };

  console.log({ pack });
  return (
    <div
      key={pack.packId}
      className="bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:border-indigo-500 hover:shadow-indigo-900/20 hover:shadow-xl"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-indigo-300" />
          <span className="font-medium text-white  w-fit">
            {pack.packPickUpLocation} → {pack.packDropOffLocation}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Weight */}
        <div className="flex items-start mb-4">
          <FaWeightHanging className="text-gray-400 mt-1 mr-2" />
          <div>
            <p className="text-gray-400 text-xs">Weight : </p>
            <p className="text-white">{pack.packWeight}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4 flex-col">
          <p className="text-gray-400 text-xs mb-1 flex">Description : </p>
          <p className="text-white text-sm text-left">{pack.packDescription}</p>
        </div>
        {userStore.user.role === "CLIENT" ? (
          // Delivery Guy Name
          <div className="mb-4 flex-col">
            <p className="text-gray-400 text-xs mb-1 flex">
              Delivery Guy Name :
            </p>
            <p className="text-white text-sm text-left">
              {pack.deliveryGuyName}
            </p>
          </div>
        ) : (
          // Client Name
          <div className="mb-4 flex-col">
            <p className="text-gray-400 text-xs mb-1 flex">Client Name :</p>
            <p className="text-white text-sm text-left">{pack.clientName}</p>
          </div>
        )}

        {userStore.user.role === "CLIENT" ? (
          //Rating
          <div className="mb-4 flex-col">
            <p className="text-gray-400 text-xs mb-1 flex">
              Delivery Guy rating:
            </p>
            <div className="flex items-center">
              <div className="flex">
                {pack.deliveryGuyRating === -1
                  ? renderStars(0)
                  : renderStars(pack.deliveryGuyRating)}
              </div>
              <span className="ml-1 text-xs text-violet-300">
                ({pack.deliveryGuyRatingCount})
              </span>
            </div>
          </div>
        ) : null}

        {/*Number */}
        {userStore.user.role === "CLIENT" ? (
          <div className="mb-4 flex-col">
            <p className="text-gray-400 text-xs mb-1 flex">
              Delivery Guy Number :
            </p>
            <p className="text-white text-sm text-left">
              {pack.deliveryGuyPhone}
            </p>
          </div>
        ) : (
          <div className="mb-4 flex-col">
            <p className="text-gray-400 text-xs mb-1 flex">Client Number :</p>
            <p className="text-white text-sm text-left">{pack.clientPhone}</p>
          </div>
        )}

        {/* Mark as Delivered Checkbox */}
        {userStore.user.role === "DELIVERY_PERSON" && (
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id={`delivered-${pack.id}`}
              className="mr-2"
              checked={isDelivered}
              onChange={handleDeliveryChange}
            />
            <label htmlFor={`delivered-${pack.id}`} className="text-white">
              Mark as Delivered
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
