import React, { useEffect } from "react";
import Menu from "./components/custom/menu/Menu";
import HeroSection from "./components/custom/HeroSection";
// import Spline from "@splinetool/react-spline";
import LocomotiveScroll from "locomotive-scroll";

const App = () => {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);
  return (
    <>
      <Menu hl={"home"} />
      <HeroSection />
    </>
  );
};

export default App;
