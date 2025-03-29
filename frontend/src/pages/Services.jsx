import React from "react";
import { ServiceCard } from "../components/cards/ServiceCard.jsx";
import deliveryPhoto from "../assets/ServiceImage3.jpg";

export const Services = () => {
  const services = [
    {
      type: "Moving Service",
      description:
        "Livrili offers a flexible professional moving solution, allowing you to choose from multiple carriers. Customers can select the services they need: disassembly, packing, moving, reassembly, and setup.",
    },
    {
      type: "Freight Transport Service",
      description:
        "Whether you're an individual or a professional, Livrili enables you to ship all types of goods securely through its network of qualified carriers. Reduce your transportation costs with competitive rates, thanks to our optimized vehicles for empty return trips.",
    },
    {
      type: "Courier Service",
      description:
        "Forgot something at home? Don’t have time to wait in line to pay a bill? Livrili provides a courier service that solves these problems by assigning a courier to handle small errands on your behalf.",
    },
  ];

  return (
    <div className="container mx-auto px-4 pb-36">
      {/* About Section */}
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 py-16 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-white font-primary text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8">
            About Livrili
          </h1>
          <div className="max-w-lg">
            <p className="text-white text-base md:text-lg">
              Livrili is an innovative platform designed to simplify the
              delivery process by connecting clients with delivery
              professionals. Whether you're a business needing to ship goods or
              an individual requiring quick and reliable delivery services,
              Livrili bridges the gap between customers and delivery partners,
              making the process seamless for both parties.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={deliveryPhoto}
            alt="Livrili Delivery Service"
            className="w-full max-h-[400px] max-w-md rounded-3xl shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="text-center my-12">
        <h2 className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent inline-block">
          Livrili Services
        </h2>
      </div>

      {/* Services Cards */}
      <div className="flex justify-center flex-wrap space-x-4 space-y-4 ml-4">
        {services.map((service, index) => (
          <div key={index}>
            <ServiceCard
              service={service.type}
              description={service.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
