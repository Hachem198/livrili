import React from "react";
import { CommentCaMarcheSection } from "../components/CommentCaMarcheSection";
import { AllUsersHeroSection } from "../components/HeroSection/AllUsersHeroSection";
import { Footer } from "../components/Footer";
import { observer } from "mobx-react-lite";
import scrollStore from "../store/scrollStore/scrollStore";

export const Home = observer(() => {
  return (
    <>
      <AllUsersHeroSection></AllUsersHeroSection>
      <CommentCaMarcheSection
        ref={scrollStore.howItWorksRef}
      ></CommentCaMarcheSection>
    </>
  );
});
