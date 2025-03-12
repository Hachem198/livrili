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

export const PackageForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    weight: "",
    pickUpLocation: "",
    dropOffLocation: "",
  });

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
  };

  return (
    <div className="w-full  py-16">
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
                <div className="flex space-x-8 ml-4">
                  {/*PickUpLocation*/}
                  <div className="mb-4">
                    <label
                      htmlFor="pickUpLocation"
                      className="block text-gray-300 mb-2"
                    >
                      Lieu de ramassage
                    </label>
                    <input
                      type="text"
                      id="pickUpLocation"
                      name="pickUpLocation"
                      value={formData.pickUpLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-blue-950 border border-purple-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Adresse complète du point de départ"
                      required
                    />
                  </div>
                  {/*DropOffLocation*/}
                  <div className="mb-6">
                    <label
                      htmlFor="dropOffLocation"
                      className="block text-gray-300 mb-2"
                    >
                      Lieu de livraison
                    </label>
                    <input
                      type="text"
                      id="dropOffLocation"
                      name="dropOffLocation"
                      value={formData.dropOffLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-blue-950 border border-purple-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Adresse complète de la destination"
                      required
                    />
                  </div>
                </div>
                {/*Carousel*/}
                <Carousel className="w-full max-w-xs ">
                  <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                {/*Weight*/}
                <div className="mb-4">
                  <label htmlFor="weight" className="block text-gray-300 mb-2">
                    Poids (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    min="0.1"
                    step="0.1"
                    className="w-full px-4 py-2 bg-blue-950 border border-purple-700  rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez le poids en kilogrammes"
                    required
                  />
                </div>
                {/*Description*/}
                <div className="mb-4">
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
                  className="w-full bg-purple-700 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300"
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
