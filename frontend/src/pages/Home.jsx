import React from "react";
import { CommentCaMarcheSection } from "../components/CommentCaMarcheSection";
import { AllUsersHeroSection } from "../components/HeroSection/AllUsersHeroSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <>
      <AllUsersHeroSection></AllUsersHeroSection>
      <CommentCaMarcheSection></CommentCaMarcheSection>
    </>
  );
};
