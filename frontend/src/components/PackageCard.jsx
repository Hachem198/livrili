import React from "react";
import {
  User,
  MapPin,
  Clock,
  ChevronRight,
  Package,
  FileText,
  X,
  Check,
} from "lucide-react";
import userStore from "../store/userStore/userStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { OfferCard } from "./cards/OfferCard";
import { handleDeletePack } from "../hooks/useDeletePack.js";

export const PackageCard = ({ pack }) => {
  const { user } = userStore;
  const getStatusStyle = (status) => {
    const statusStyles = {
      PENDING: "bg-yellow-600/20 text-yellow-100",
      APPROVED: "bg-green-600 text-green-100",
      DELIVERED: "bg-blue-600 text-blue-100",
    };

    return statusStyles[status] || "bg-gray-600 text-gray-100";
  };
  return (
    <div className="relative">
      {/*Delete button */}
      <button
        onClick={() => handleDeletePack(pack.id, pack.status)}
        className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full z-10 shadow-md transition-colors duration-200"
      >
        <X size={16} />
      </button>

      <Popover>
        <PopoverTrigger className="w-full h-full transition-all duration-300 hover:shadow-lg hover:border-purple-500 min-h-[200px] border rounded-2xl border-purple-900/40 bg-gradient-to-r from-purple-900/10 to-purple-800/5 text-white p-4">
          <div className="flex flex-col w-full h-full gap-2">
            <div className="flex flex-col w-full gap-2">
              {/* User info */}
              <div className="flex items-center gap-2">
                <div className="bg-purple-900/50 p-2 rounded-full">
                  <User size={18} className="text-purple-200" />
                </div>
                <span className="font-medium text-sm text-purple-50 truncate max-w-28">{`${user.firstName} ${user.lastName}`}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-purple-200">
                <MapPin size={16} />
                <span className="text-xs font-medium truncate max-w-48">
                  {pack.pickUpLocation} → {pack.dropOffLocation}
                </span>
              </div>

              {/*Weight*/}
              <div className="flex items-center gap-2 mt-2 text-purple-200">
                <Package size={16} />
                <span className="text-xs font-medium">{pack.weight} KG</span>
              </div>

              {/*Description */}
              <div className="flex gap-2 mt-1 text-purple-200">
                <FileText size={16} className="flex-shrink-0 mt-0.5" />
                <p className="text-xs line-clamp-3">{pack.description}</p>
              </div>
            </div>
            {/* Status */}
            <div className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center gap-2">
                {pack.status == "PENDING" ? (
                  <Clock size={16} className="text-amber-300" />
                ) : pack.status == "APPROVED" ? (
                  <Check></Check>
                ) : (
                  <p>hello</p>
                )}

                <span
                  className={`${getStatusStyle(
                    pack.status
                  )} text-xs font-medium px-2 py-1 rounded-full`}
                >
                  {pack.status}
                </span>
              </div>
              <ChevronRight size={16} className="text-purple-300" />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-full p-4 bg-gradient-to-b from-purple-950 to-purple-900 text-purple-100 border border-purple-700 rounded-xl shadow-xl">
          <div className="space-y-4">
            <OfferCard></OfferCard>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
