import { makeAutoObservable } from "mobx";
import { createRef } from "react";

class ScrollStore {
  howItWorksRef = createRef();

  constructor() {
    makeAutoObservable(this);
  }

  scrollToHowItWorks() {
    this.howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}

const scrollStore = new ScrollStore();
export default scrollStore;
