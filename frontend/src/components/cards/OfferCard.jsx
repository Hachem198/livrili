import React from "react";
import { renderStars } from "../../methods/renderStars";
export const OfferCard = ({ offer, handleDecision }) => {
  return (
    <div className="w-full max-w-6xl bg-violet-900 text-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="px-4 py-3 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Profile Section */}
          <div className="flex items-center space-x-3 sm:w-1/4">
            <div
              className="flex-shrink-0 h-10 w-10 bg-violet-700 rounded-full flex items-center justify-center text-sm font-bold"
              aria-hidden="true"
            >
              {offer.deliveryGuyName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h3 className="text-base font-semibold truncate">
                {offer.deliveryGuyName}
              </h3>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex space-x-2 justify-between gap-y-3 sm:flex-1 sm:pl-4">
            <div className="flex flex-col">
              <span className="text-violet-300 text-xs">Price</span>
              <span className="font-bold text-green-400">
                {offer.deliveryGuyPrice} DT
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-violet-300 text-xs">Delivery</span>
              <span className="font-medium text-sm">
                {offer.nbDaysToDeliver} days
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-violet-300 text-xs">Rating</span>
              <div className="flex items-center">
                <div
                  className="flex"
                  aria-label={`Rating: ${offer.rattingCount} out of 5 stars`}
                >
                  {renderStars(offer.rattingCount)}
                </div>
                <span className="ml-1 text-xs text-violet-300">
                  ({offer.rattingCount})
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {offer.offerStatus === "ACCEPTED" ? (
            <div>
              <h3>Accepted</h3>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-3 sm:mt-0">
              <div className="flex space-x-2">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  aria-label="Decline offer"
                  onClick={() => handleDecision(offer.offerId, "DECLINED")}
                >
                  Decline
                </button>
                <button
                  onClick={() => handleDecision(offer.offerId, "ACCEPTED")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Accept offer"
                >
                  Accept
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
