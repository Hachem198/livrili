import React, { useState } from "react";
import userStore from "../store/userStore/userStore.js";
import { PackagesToggleGroup } from "../components/PackagesToggleGroup.jsx";
import { Link } from "react-router-dom";
import { PendingPacks } from "../components/Packages/PendingPacks.jsx";
import { ApprovedPacks } from "../components/Packages/ApprovedPacks.jsx";
import { DeliveredPacks } from "../components/Packages/DeliveredPacks.jsx";
import { OfferedPacks } from "../components/Packages/OfferedPacks.jsx";

export const Packages = () => {
  const { user } = userStore;
  const [active, setActive] = useState(
    user.role === "CLIENT" ? "pendingPacks" : "offeredPacks"
  );
  console.log(user.role);
  return (
    <div className="container mx-auto py-8 pb-64">
      <PackagesToggleGroup active={active} setActive={setActive} />

      {active === "pendingPacks" && <PendingPacks />}
      {active === "approvedPacks" && <ApprovedPacks />}
      {active === "deliveredPacks" && <DeliveredPacks />}
      {user.role === "DELIVERY_PERSON" && active === "offeredPacks" && (
        <OfferedPacks />
      )}
    </div>
  );
};
