import React from "react";
import { Truck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className=" text-gray-400 py-12 border-t border-neutral-500/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-xl font-bold text-white mb-4">
              <Truck className="w-6 h-6 text-blue-400" />
              <span>Livrili</span>
            </div>
            <p className="text-sm">
              La première plateforme tunisienne de mise en relation entre
              clients et transporteurs. Optimisez vos transports, réduisez vos
              coûts.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 cursor-pointer transition">
                Transport routier
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Optimisation des trajets
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Suivi en temps réel
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Assurance transport
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 cursor-pointer transition">
                À propos
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Carrières
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Blog
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Presse
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 cursor-pointer transition">
                support@transporttn.com
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                +216 71 234 567
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Tunis, Tunisie
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          © 2024 Livrili. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};
