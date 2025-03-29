import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
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
import { ProcessCard } from "../cards/ProcessCard";
import scrollStore from "../../store/scrollStore/scrollStore";

export const HowItWorksSection = forwardRef((props, ref) => {
  const [activeTab, setActiveTab] = useState("clients");

  const clientProcess = [
    {
      icon: UserPlus,
      process: "1. Sign Up",
      description:
        "Create your client account in just a few clicks to access our services.",
    },
    {
      icon: Package,
      process: "2. Describe Your Needs",
      description:
        "Specify the details of your transport: type of goods, pickup/drop-off location, and date.",
    },
    {
      icon: FileCheck,
      process: "3. Choose an Offer",
      description:
        "Compare transporters' quotes and select the one that best suits you.",
    },
    {
      icon: Star,
      process: "4. Rate Delivery",
      description:
        "Share your feedback and rate the delivery to help improve our service and confirm the delivery.",
    },
  ];

  const deliveryProcess = [
    {
      icon: Truck,
      process: "1. Join Us",
      description:
        "Sign up as a transporter and complete your professional profile.",
    },
    {
      icon: Navigation,
      process: "2. View Packages",
      description:
        "Access and explore packages that align with your preferences.",
    },
    {
      icon: Wallet,
      process: "3. Set Your Rates",
      description: "Submit your quotes based on your availability and pricing.",
    },
    {
      icon: Star,
      process: "4. Grow Your Business",
      description:
        "Increase your visibility through positive customer reviews.",
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-20 ">
      <div className="container mx-auto px-6 ">
        <h2 className="text-3xl font-bold text-center mb-4 text-white">
          How it works ?
        </h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Our platform simplifies the connection between customers and carriers.
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
              Clients
            </button>
            <button
              className={`px-6 py-2 rounded-md transition ${
                activeTab === "delivery"
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("delivery")}
            >
              Delivery Guys
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
});
