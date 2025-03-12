import React from "react";
import { CommentCaMarcheSection } from "../components/CommentCaMarcheSection";
import { AllUsersHeroSection } from "../components/HeroSection/AllUsersHeroSection";
import { Footer } from "../components/Footer";
import { observer } from "mobx-react-lite";
import scrollStore from "../store/scrollStore/scrollStore";
import { ClientHeroSection } from "../components/HeroSection/ClientHeroSection";

export const Home = observer(() => {
  return (
    <>
      <ClientHeroSection></ClientHeroSection>
      <CommentCaMarcheSection
        ref={scrollStore.howItWorksRef}
      ></CommentCaMarcheSection>
    </>
  );
});
