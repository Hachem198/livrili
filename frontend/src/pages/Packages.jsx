import React, { useEffect, useState } from "react";
import userStore from "../store/userStore/userStore.js";
import { ClientPackagesPage } from "../components/PackagesPages/ClientPackagesPage.jsx";

export const Packages = () => {
  return (
    <div>
      {userStore.user.role === "CLIENT" ? (
        <ClientPackagesPage></ClientPackagesPage>
      ) : (
        <h1>hello</h1>
      )}
    </div>
  );
};
