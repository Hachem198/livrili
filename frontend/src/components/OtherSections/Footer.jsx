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
              The first Tunisian platform connecting customers and carriers.
              Optimize your transports, reduce your costs.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 cursor-pointer transition">
                Road Transport
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Route Optimization
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Real-Time Tracking
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Transport Insurance
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-400 cursor-pointer transition">
                About Us
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Careers
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Blog
              </li>
              <li className="hover:text-blue-400 cursor-pointer transition">
                Press
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
                Tunis, Tunisia
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          © 2025 Livrili. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
