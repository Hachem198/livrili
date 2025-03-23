import React from "react";

export const OfferCard = ({ offer }) => {
  const {
    name,
    offerPrice,
    deliveryDays,
    rating,
    onAccept,
    onDecline,
    onClose,
  } = offer || {
    name: "Hame",
    offerPrice: "$0",
    deliveryDays: 0,
    rating: 2,
  };

  // Get status styling

  // Calculate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-400" aria-hidden="true">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-400" aria-hidden="true">
            ⯨
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300" aria-hidden="true">
            ★
          </span>
        );
      }
    }

    return stars;
  };

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
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h3 className="text-base font-semibold truncate">{name}</h3>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex space-x-2 justify-between gap-y-3 sm:flex-1 sm:pl-4">
            <div className="flex flex-col">
              <span className="text-violet-300 text-xs">Offer</span>
              <span className="font-bold text-green-400">{offerPrice}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-violet-300 text-xs">Delivery</span>
              <span className="font-medium text-sm">{deliveryDays} days</span>
            </div>

            <div className="flex flex-col">
              <span className="text-violet-300 text-xs">Rating</span>
              <div className="flex items-center">
                <div
                  className="flex"
                  aria-label={`Rating: ${rating} out of 5 stars`}
                >
                  {renderStars()}
                </div>
                <span className="ml-1 text-xs text-violet-300">({rating})</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-3 sm:mt-0">
            <div className="flex space-x-2">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-violet-500"
                onClick={onDecline}
                aria-label="Decline offer"
              >
                Decline
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={onAccept}
                aria-label="Accept offer"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
