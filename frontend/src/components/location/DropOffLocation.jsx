import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const DropOffLocation = ({ value, onChange }) => {
  const autocompleteRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      onChange(place.formatted_address);
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => {
        autocompleteRef.current = autocomplete;
        autocomplete.setComponentRestrictions({ country: "tn" }); // Restrict to Tunisia
      }}
      onPlaceChanged={handlePlaceSelect}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Lieu de livraison"
        className="w-full px-4 py-2 bg-blue-950 border border-purple-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </Autocomplete>
  );
};

export default DropOffLocation;
