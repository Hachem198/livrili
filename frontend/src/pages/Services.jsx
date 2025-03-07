import React from "react";
import { ServiceCard } from "../components/ServiceCard";
import deliveryPhoto from "../assets/ServiceImage.webp";

export const Services = () => {
  const services = [
    {
      type: "Service déménagement",
      description:
        "Livrili offre une solution de déménagement, professionnel flexible, Livrili vous permet de choisir entre plusieurs transporteurs. Le client choisit les services dont il a besoin : le démontage, l'emballement, le déménagement, le remontage et l'aménagement.",
    },
    {
      type: "Service transport de marchandise",
      description:
        "Que vous soyez un particulier ou un professionnel, Wassali vous permet d'expédier tout type de marchandise confondus en toute sécurité, grâce à son portefeuille de transporteurs qualifiés. Réduisez le coût de votre transport avec des tarifs compétitifs, grâce à l'optimisation de nos véhicules en retour à vide.",
    },
    {
      type: "Service coursier",
      description:
        "Vous avez oublié un objet chez vous ? Vous n'avez pas le temps de faire la queue pour payer une facture ? Wassali met à votre disposition un service coursier qui va vous permettre de remédier à ces problèmes à travers un coursier qui va faire ses petites courses à votre place.",
    },
  ];

  return (
    <div className="container mx-auto px-4 pb-36">
      {/* About Section */}
      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 py-16 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-white font-primary text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8">
            A Propos Livrili
          </h1>
          <div className="max-w-lg">
            <p className="text-gray-500 text-base md:text-lg">
              In the fast-paced world of technology and innovation, staying
              ahead requires continuous learning, adaptability, and a deep
              understanding of emerging trends. Companies that thrive are those
              that not only embrace change but actively seek to drive it. From
              artificial intelligence and machine learning to blockchain and
              cloud computing, the digital landscape is evolving at an
              unprecedented rate.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={deliveryPhoto}
            alt="Livrili Delivery Service"
            className="w-full h-auto max-w-md rounded-3xl object-cover"
          />
        </div>
      </div>
      <div className="text-center my-12">
        <h2 className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent inline-block">
          Services de Livrili
        </h2>
      </div>

      {/* Services Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service.type}
            description={service.description}
          />
        ))}
      </div>
    </div>
  );
};
