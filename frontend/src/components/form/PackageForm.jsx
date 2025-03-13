import React from "react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { LoadScript } from "@react-google-maps/api";
import DropOffLocation from "../location/DropOffLocation";
import PickUpLocation from "../location/PickUpLocation";

export const PackageForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    weight: 700,
    pickUpLocation: "",
    dropOffLocation: "",
  });
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);
  const cars = [
    {
      typeDeTransport: "Transport classique",
      minWeight: 600,
      maxWeight: 800,
      imgSrc:
        "https://www.argusautomobile.tn/wp-content/uploads/2021/07/DACIA-DOKKER-VAN.jpg",
    },
    {
      typeDeTransport: "Transport",
      minWeight: 1000,
      maxWeight: 1500,
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlT_jzqnN1AYkUKztDWHUuGvuCz3XeqEnOvw&s",
    },
    {
      typeDeTransport: "Déménagement",
      minWeight: 3000,
      maxWeight: 3500,
      imgSrc:
        "https://thumbs.dreamstime.com/b/fourgon-blanc-ford-transit-d-isolement-sur-le-vue-de-c%C3%B4t%C3%A9-144038361.jpg",
    },
    {
      typeDeTransport: "Transport Lourd",
      minWeight: 4000,
      maxWeight: 5000,
      imgSrc:
        "https://previews.123rf.com/images/aprior/aprior1510/aprior151000081/46735060-camion-blanc-il-est-isol%C3%A9-sur-fond-blanc.jpg",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "weight" ? (value === "" ? "" : parseFloat(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to your API
    console.log("Form submitted:", formData);
    console.log("Selected car:", cars[selectedCarIndex]);
  };

  const handleCarSelect = (index) => {
    const selectedCar = cars[index];
    setSelectedCarIndex(index);

    const defaultWeight = (selectedCar.maxWeight + selectedCar.minWeight) / 2;

    setFormData((prevData) => ({
      ...prevData,
      weight: defaultWeight,
    }));
  };
  return (
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Hero Text */}
          <div className="w-full lg:w-1/2 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Transport simple et efficace
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Notre plateforme vous connecte avec des transporteurs fiables pour
              tous vos besoins de livraison.
            </p>
            <div className="hidden lg:block">
              <p className="text-gray-400 mb-2">Nos avantages:</p>
              <ul className="list-disc pl-5 text-gray-300">
                <li className="mb-1">Tarifs compétitifs et transparents</li>
                <li className="mb-1">Suivi en temps réel de vos colis</li>
                <li className="mb-1">Réseau de transporteurs vérifiés</li>
                <li className="mb-1">Assistance client 7j/7</li>
              </ul>
            </div>
          </div>

          {/* Form Card */}
          <div className="w-full lg:w-1/2">
            <div className="bg-blue-950 ring-purple-700 ring bg-opacity-80 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Demande de transport
              </h2>
              <form onSubmit={handleSubmit}>
                {/*PickUpLocation/DropOffLocation*/}
                <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
                  <div className="flex flex-col md:flex-row md:space-x-8 mb-6">
                    <div className="mb-4 md:mb-0 flex-1">
                      <label className="block text-gray-300 mb-2">
                        Lieu de ramassage
                      </label>
                      <PickUpLocation
                        value={formData.pickUpLocation}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            pickUpLocation: value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-300 mb-2">
                        Lieu de livraison
                      </label>
                      <DropOffLocation
                        value={formData.dropOffLocation}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            dropOffLocation: value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </LoadScript>

                {/* Selection de type de transport */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-white text-center">
                    Sélectionnez le type de transport
                  </h3>
                </div>

                {/* Enhanced Carousel */}
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

                {/*Description*/}
                <div className="mb-6">
                  <label
                    htmlFor="description"
                    className="block text-gray-300 mb-2"
                  >
                    Description de la marchandise
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
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
