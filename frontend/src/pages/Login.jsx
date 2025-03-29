import React from "react";
import LoginForm from "../components/form/LoginForm";
import CompanyLogo from "../assets/CompanyLogo.png";
import { Link } from "react-router-dom";
import { Footer } from "../components/OtherSections/Footer";

export const Login = () => {
  return (
    <div>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      <main className="container mx-auto px-8">
        {/*Logo*/}
        <div className="flex items-center">
          <Link to="/" className="ml-4">
            <img
              src={CompanyLogo}
              className="w-20 md:w-32 hover:opacity-80 transition-opacity duration-300"
              alt="Company Logo"
            />
          </Link>
        </div>
        {/*Form*/}
        <LoginForm></LoginForm>
        {/*Footer*/}
        <Footer></Footer>
      </main>
    </div>
  );
};
