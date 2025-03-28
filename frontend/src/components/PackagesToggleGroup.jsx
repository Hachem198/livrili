import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import userStore from "../store/userStore/userStore";

export const PackagesToggleGroup = ({ active, setActive }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroup
        type="single"
        value={active}
        onValueChange={setActive}
        className="bg-gray-800 rounded-lg p-1 border border-gray-700 shadow-md"
      >
        {userStore.user.role === "CLIENT" ? (
          <ToggleGroupItem
            value="pendingPacks"
            className="
            px-4 py-2 
            text-gray-300 
            hover:bg-gray-700 
            data-[state=on]:bg-blue-600 
            data-[state=on]:text-white 
            rounded-md 
            transition-colors 
            duration-200 
            ease-in-out
          "
          >
            Pending Packages
          </ToggleGroupItem>
        ) : (
          <></>
        )}

        <ToggleGroupItem
          value="deliveredPacks"
          className="
            px-4 py-2 
            text-gray-300 
            hover:bg-gray-700 
            data-[state=on]:bg-green-600 
            data-[state=on]:text-white 
            rounded-md 
            transition-colors 
            duration-200 
            ease-in-out
          "
        >
          Delivered Packages
        </ToggleGroupItem>

        <ToggleGroupItem
          value="approvedPacks"
          className="
            px-4 py-2 
            text-gray-300 
            hover:bg-gray-700 
            data-[state=on]:bg-purple-600 
            data-[state=on]:text-white 
            rounded-md 
            transition-colors 
            duration-200 
            ease-in-out
          "
        >
          Approved Packages
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default PackagesToggleGroup;
