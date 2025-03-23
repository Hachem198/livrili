import React from "react";
import { CommentCaMarcheSection } from "../components/CommentCaMarcheSection";
import { AllUsersHeroSection } from "../components/HeroSection/AllUsersHeroSection";
import { observer } from "mobx-react-lite";
import scrollStore from "../store/scrollStore/scrollStore";
import { ClientHeroSection } from "../components/HeroSection/ClientHeroSection";
import userStore from "../store/userStore/userStore";
import { DeliveryGuyHeroSection } from "../components/HeroSection/DeliveryGuyHeroSection";

export const Home = observer(() => {
  return (
    <>
      {userStore.user ? (
        userStore.user.role === "CLIENT" ? (
          <ClientHeroSection />
        ) : (
          <DeliveryGuyHeroSection />
        )
      ) : (
        <AllUsersHeroSection />
      )}

      <CommentCaMarcheSection
        ref={scrollStore.howItWorksRef}
      ></CommentCaMarcheSection>
    </>
  );
});
