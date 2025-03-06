import React, { useState } from "react";
import {
  Truck,
  Star,
  Package,
  UserPlus,
  FileCheck,
  Bell,
  Wallet,
  Navigation,
} from "lucide-react";
import { ProcessCard } from "./ProcessCard";

export const CommentCaMarcheSection = () => {
  const [activeTab, setActiveTab] = useState("clients");

  const clientProcess = [
    {
      icon: UserPlus,
      process: "1. Inscrivez-vous",
      description:
        "Créez votre compte client en quelques clics pour accéder à nos services.",
    },
    {
      icon: Package,
      process: "2. Décrivez votre besoin",
      description:
        "Spécifiez les détails de votre transport : type de marchandise, lieu de départ/arrivée, date.",
    },
    {
      icon: FileCheck,
      process: "3. Choisissez l'offre",
      description:
        "Comparez les devis des transporteurs et sélectionnez celui qui vous convient.",
    },
    {
      icon: Navigation,
      process: "4. Suivez la livraison",
      description:
        "Suivez votre transport en temps réel et recevez des notifications à chaque étape.",
    },
  ];

  const deliveryProcess = [
    {
      icon: Truck,
      process: "1. Rejoignez-nous",
      description:
        "Inscrivez-vous comme transporteur et complétez votre profil professionnel.",
    },
    {
      icon: Bell,
      process: "2. Recevez des demandes",
      description:
        "Accédez aux demandes de transport correspondant à vos critères.",
    },
    {
      icon: Wallet,
      process: "3. Proposez vos tarifs",
      description:
        "Soumettez vos devis en fonction de vos disponibilités et tarifs.",
    },
    {
      icon: Star,
      process: "4. Développez votre activité",
      description:
        "Gagnez en visibilité grâce aux évaluations positives de vos clients.",
    },
  ];

  return (
    <section className="py-20 border-b border-neutral-700">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          Comment ça marche?
        </h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Notre plateforme simplifie la mise en relation entre clients et
          transporteurs
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900 p-1 rounded-lg inline-flex">
            <button
              className={`px-6 py-2 rounded-md transition ${
                activeTab === "clients"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("clients")}
            >
              Pour les clients
            </button>
            <button
              className={`px-6 py-2 rounded-md transition ${
                activeTab === "delivery"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("delivery")}
            >
              Pour les transporteurs
            </button>
          </div>
        </div>

        {/* Procedure en tant que client */}
        {activeTab === "clients" && (
          <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-8">
            {clientProcess.map((step, index) => (
              <ProcessCard
                key={index}
                icon={step.icon}
                description={step.description}
                process={step.process}
              ></ProcessCard>
            ))}
          </div>
        )}

        {/* Procedure en tant que livreur */}
        {activeTab === "delivery" && (
          <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-8">
            {deliveryProcess.map((step, index) => (
              <ProcessCard
                key={index}
                icon={step.icon}
                description={step.description}
                process={step.process}
              ></ProcessCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
