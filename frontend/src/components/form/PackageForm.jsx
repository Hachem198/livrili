import React from "react";
import { useState } from "react";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import axios from "axios";
import { set } from "react-hook-form";
import userStore from "../../store/userStore/userStore";
import { toast } from "sonner";

export const PackageForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [pack, setPack] = useState({
    description: "",
    weight: 0,
    pickUpLocation: "",
    dropOffLocation: "",
  });
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPack((prevData) => ({
      ...prevData,
      [name]:
        name === "weight" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/v1/api/client/pack`, pack, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      toast.success("Package created succesfully !");
      setPack({
        description: "",
        weight: 0,
        pickUpLocation: "",
        dropOffLocation: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Hero Text */}
          <div className="w-full lg:w-1/2 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Simple and Efficient Transport
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Our platform connects you with reliable carriers for all your
              delivery needs.
            </p>
            <div className="hidden lg:block">
              <p className="text-gray-400 mb-2">Our Advantages:</p>
              <ul className="list-disc pl-5 text-gray-300">
                <li className="mb-1">Competitive and transparent pricing</li>
                <li className="mb-1">Real-time tracking of your packages</li>
                <li className="mb-1">Network of verified carriers</li>
                <li className="mb-1">
                  Customer support available 7 days a week
                </li>
              </ul>
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full lg:w-1/2">
            <div className="bg-purple-800/40 ring-purple-700 ring bg-opacity-80 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Transport Request
              </h2>
              <form onSubmit={handleSubmit}>
                {/*PickUpLocation/DropOffLocation*/}
                <GeoapifyContext apiKey="c741f1e11aa7477c85f61e99d0c9fc51">
                  {/* PickUpLocation */}
                  <div className="mb-6">
                    <label
                      htmlFor="pickup"
                      className="block text-gray-300 mb-2"
                    >
                      Pick-up Location
                    </label>
                    <div className="relative">
                      <GeoapifyGeocoderAutocomplete
                        placeholder="Entrez l'adresse de collecte"
                        className="w-full px-4 py-2 bg-blue-950 border border-purple-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 hide-clear-button"
                        skipIcons={true}
                        filterByCountryCode={["TN"]}
                        onUserInput={(place) =>
                          setPack({
                            ...pack,
                            pickUpLocation: place,
                          })
                        }
                        placeSelect={(place) =>
                          setPack({
                            ...pack,
                            pickUpLocation: place.properties.formatted,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* DropOffLocation */}
                  <div className="mb-6">
                    <label
                      htmlFor="dropoff"
                      className="block text-gray-300 mb-2"
                    >
                      Drop-off Location
                    </label>
                    <div className="relative">
                      <GeoapifyGeocoderAutocomplete
                        placeholder="Entrez l'adresse de livraison"
                        className="w-full px-4 py-2 bg-blue-950 border border-purple-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        filterByCountryCode={["TN"]}
                        skipIcons={true}
                        onUserInput={(place) =>
                          setPack({
                            ...pack,
                            dropOffLocation: place,
                          })
                        }
                        placeSelect={(place) =>
                          setPack({
                            ...pack,
                            dropOffLocation: place.properties.formatted,
                          })
                        }
                      />
                    </div>
                  </div>
                </GeoapifyContext>

                {/* Selection de type de transport */}
                {/*
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-white text-center">
                    Sélectionnez le type de transport
                  </h3>
                </div>
                <div className="mb-6">
                  <Carousel
                    className="w-full"
                    onSelect={(index) => handleCarSelect(index)}
                  >
                    <CarouselContent>
                      {cars.map((car, index) => (
                        <CarouselItem key={index}>
                          <Card
                            className={`border-2 ${
                              selectedCarIndex === index
                                ? "border-purple-500"
                                : "border-gray-600"
                            } bg-gradient-to-b from-gray-800 to-blue-950 overflow-hidden`}
                          >
                            <CardContent className="p-0">
                              <div className="relative">
                                <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-3">
                                  <h3 className="text-xl font-bold text-white text-center">
                                    {car.typeDeTransport}
                                  </h3>
                                </div>
                                <div className="p-4 flex flex-col items-center">
                                  <div className="h-40 flex items-center justify-center mb-4 overflow-hidden">
                                    <img
                                      src={car.imgSrc}
                                      alt={car.typeDeTransport}
                                      className="object-contain h-full w-full transition-transform hover:scale-105"
                                    />
                                  </div>
                                  <div className="bg-blue-900 bg-opacity-50 rounded-lg p-3 w-full text-center">
                                    <p className="text-white font-medium">
                                      Capacité:{" "}
                                      <span className="text-white">
                                        {car.minWeight} - {car.maxWeight} KG
                                      </span>
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleCarSelect(index)}
                                    className={`mt-4 px-4 py-2 rounded-md transition-colors ${
                                      selectedCarIndex === index
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-700 text-gray-200 hover:bg-purple-700"
                                    }`}
                                  >
                                    {selectedCarIndex === index
                                      ? "Sélectionné"
                                      : "Sélectionner"}
                                  </button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 bg-purple-700 hover:bg-purple-800 border-none text-white" />
                    <CarouselNext className="right-0 bg-purple-700 hover:bg-purple-800 border-none text-white" />
                  </Carousel>
                </div>
                */}
                {/*Weight*/}
                <div className="mb-6">
                  <label htmlFor="weight" className="block text-gray-300 mb-2">
                    Package weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    min="0"
                    step="0.1"
                    value={pack.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-blue-950 border border-purple-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez le poids du colis"
                    required
                  />
                </div>
                {/*Description*/}
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-gray-300 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={pack.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-blue-950 border border-purple-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Décrivez votre colis (type, dimensions, fragilité...)"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 px-4 rounded-md transition duration-300 shadow-lg"
                >
                  Soumettre ma demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
