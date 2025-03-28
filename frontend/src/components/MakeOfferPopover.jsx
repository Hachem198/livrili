import React, { useEffect, useState, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover.jsx";
import axios from "axios";
import userStore from "../store/userStore/userStore.js";
import { getPackOffer } from "../hooks/useGetPackOffer.js";
import { toast } from "sonner";
import { offerStore } from "../store/OfferStore.js";

export const MakeOfferPopover = ({ id }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [offer, setOffer] = useState({
    id: 0,
    price: 0,
    dayToDeliver: 0,
  });
  const [isExistingOffer, setIsExistingOffer] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffer((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleChangeOffer = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await axios.put(`${apiUrl}/v1/api/dg/pack/offer/${offer.id}`, offer, {
          headers: { Authorization: `Bearer ${userStore.token}` },
        });
        toast.success("Offer Changed Successfully!");
        setIsExistingOffer(true);
      } catch (error) {
        toast.error("Your offer has been already accepted !");
        console.error(error);
      }
    },
    [offer]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/v1/api/dg/pack/offer/${id}`, offer, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      await fetchOffer();
      toast.success("Offer Submitted Successfully!");
      setIsExistingOffer(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelOffer = async () => {
    try {
      await axios.delete(`${apiUrl}/v1/api/dg/pack/offer/${offer.id}`, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      toast.info("Offer Canceled.");
      setOffer({ id: 0, price: 0, dayToDeliver: 0 });
      setIsExistingOffer(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOffer = async () => {
    try {
      const data = await getPackOffer(id);
      if (data) {
        console.log({ data });
        setOffer((prev) => ({
          ...prev,
          id: data.id,
          price: data.price ?? 0,
          dayToDeliver: data.dayToDeliver ?? 0,
          status: data.status,
        }));
        setIsExistingOffer(data.price > 0 || data.dayToDeliver > 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOffer();
  }, []);

  return (
    <Popover>
      {offer.status === "DECLINED" && isExistingOffer ? (
        <h3 className="text-lg font-semibold text-red-600 flex justify-center">
          Your last offer has been declined
        </h3>
      ) : (
        <></>
      )}
      <PopoverTrigger className="w-full px-4 py-2 bg-purple-600/80 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-300 flex justify-center items-center mt-2">
        {isExistingOffer ? "Change Offer" : "Make Offer"}
      </PopoverTrigger>
      <PopoverContent className="p-5 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-white">
          {isExistingOffer ? "Change your Offer" : "Make an Offer"}
        </h3>

        <div className="mt-4 space-y-3">
          <div>
            <label
              htmlFor="offer-amount"
              className="block text-sm font-medium text-gray-300"
            >
              Your Offer (DT)
            </label>
            <input
              id="offer-amount"
              name="price"
              type="number"
              min="0"
              value={offer.price}
              placeholder="Enter amount"
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="delivery-days"
              className="block text-sm font-medium text-gray-300"
            >
              Days to Deliver
            </label>
            <input
              id="delivery-days"
              type="number"
              name="dayToDeliver"
              min="0"
              value={offer.dayToDeliver}
              placeholder="Number of days"
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {isExistingOffer ? (
            <>
              <button
                onClick={handleChangeOffer}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-300"
              >
                Change Offer
              </button>
              <button
                onClick={handleCancelOffer}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-300 mt-2"
              >
                Cancel Offer
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-300"
            >
              Submit Offer
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
