import React, { useState } from "react";
import {
  FaWeightHanging,
  FaMapMarkerAlt,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { renderStars } from "../../methods/renderStars";
import userStore from "../../store/userStore/userStore";
import axios from "axios";
import { toast } from "sonner";

export const DeliveredPackCard = ({ pack }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showRatingOptions, setShowRatingOptions] = useState(false);
  console.log({ pack });
  const isClient = userStore.user?.role === "CLIENT";
  const onRateDelivery = async (id, rating) => {
    try {
      const data = rating != null ? { rating } : {};

      await axios.put(`${apiUrl}/v1/api/client/pack/${id}/rate`, data, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingHover = (rating) => {
    if (isClient) {
      setHoverRating(rating);
    }
  };

  const handleRatingSelect = (rating) => {
    if (isClient) {
      setSelectedRating(rating);
      onRateDelivery && onRateDelivery(pack.packId, rating);
      setShowRatingOptions(false);
    }
  };

  const handleSkipRating = () => {
    if (isClient) {
      onRateDelivery && onRateDelivery(pack.packId, null);
      setShowRatingOptions(false);
    }
  };

  return (
    <div
      key={pack.id}
      className="bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:border-indigo-500 hover:shadow-indigo-900/20 hover:shadow-xl"
    >
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-indigo-300" />
          <span className="font-medium text-white w-fit">
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

        {/*Delivery Guy Name */}
        <div className="mb-4 flex-col">
          <p className="text-gray-400 text-xs mb-1 flex">DeliveryGuy Name : </p>
          <p className="text-white text-sm text-left">{pack.deliveryGuyName}</p>
        </div>

        {/*Current Delivery Guy Rating */}
        <div className="mb-4 flex-col">
          <p className="text-gray-400 text-xs mb-1 flex">
            DeliveryGuy rating:{" "}
          </p>
          <div className="flex items-center ">
            <div
              className="flex"
              aria-label={`Rating: ${pack.deliveryGuyRatingCount} out of 5 stars`}
            >
              {renderStars(pack.deliveryGuyRatingCount)}
            </div>
            <span className="ml-1 text-xs text-violet-300">
              ({pack.deliveryGuyRatingCount})
            </span>
          </div>
        </div>

        {/*Number */}
        <div className="mb-4 flex-col">
          <p className="text-gray-400 text-xs mb-1 flex">
            DeliveryGuy Number :{" "}
          </p>
          <p className="text-white text-sm text-left">
            {pack.deliveryGuyPhone}
          </p>
        </div>
      </div>
      {/* Client Rating Input (Only for Clients) */}
      {isClient && (
        <div className="p-5 pt-0">
          {!showRatingOptions ? (
            <button
              onClick={() => setShowRatingOptions(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Rate Delivery Experience
            </button>
          ) : (
            <div className="bg-gray-700 rounded-lg p-4 relative">
              <button
                onClick={() => setShowRatingOptions(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
              <p className="text-gray-300 text-sm mb-3">
                How was your delivery experience?
              </p>
              <div className="flex justify-center items-center space-x-4 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`
                      cursor-pointer transition-colors duration-200
                      ${
                        star <= (hoverRating || selectedRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                      ${selectedRating ? "cursor-not-allowed" : ""}
                      hover:scale-110
                    `}
                    onMouseEnter={() =>
                      !selectedRating && handleRatingHover(star)
                    }
                    onMouseLeave={() => !selectedRating && handleRatingHover(0)}
                    onClick={() => !selectedRating && handleRatingSelect(star)}
                    size={32}
                  />
                ))}
              </div>
              {selectedRating > 0 && (
                <p className="text-center text-white mb-3">
                  You rated: {selectedRating}/5 stars
                </p>
              )}
              <div className="flex justify-between">
                <button
                  onClick={handleSkipRating}
                  className="w-full mr-2 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
