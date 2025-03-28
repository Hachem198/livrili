import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/OtherSections/Footer";

import { Navbar } from "./components/OtherSections/Navbar";
export const Layout = () => {
  return (
    <div>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      <main className="container mx-auto px-8">
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </main>
    </div>
  );
};
