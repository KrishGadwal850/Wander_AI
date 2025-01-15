import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MouseFollower from "./MouseFollower";
import gsap from "gsap";
import Spline from "@splinetool/react-spline";
const HeroSection = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const startRef = useRef(null);
  const particleRef = useRef(null);
  return (
    <>
      <MouseFollower element={headingRef} />
      <section className="w-full h-screen relative p-[7rem_3rem_3rem_3rem] flex flex-col gap-10 items-center text-white">
        <section
          ref={particleRef}
          className="w-[100vw] h-[100vh] flex items-center justify-center overflow-hidden absolute top-0 left-0 blur-[.3px]"
        >
          <div className="w-[150vw] h-[150vh]">
            <Spline
              className="w-full h-full"
              scene="https://prod.spline.design/i14coMSfafpTXuRx/scene.splinecode"
            />
          </div>
        </section>
        <h1
          ref={headingRef}
          className="md:text-[8vw] text-[3rem] font-bold text-center leading-none uppercase cursor-default relative z-[8] tracking-tighter scale-hover"
        >
          Discover your next adventure with{" "}
          <span className="text-red-500">AI</span>
        </h1>
        <p
          ref={paraRef}
          className="text-center text-[.7rem] md:text-[1rem] lg:w-1/2 min-w-[300px] cursor-default relative z-[8] text-neutral-300 font-mono"
        >
          Discover and organize your travel experiences with Gemini AI by
          Google, a powerful tool that's completely free to use on our website.
          With its intuitive interface and advanced features, planning your next
          adventure has never been easier.
        </p>
        <Link
          to="/create-trip"
          onMouseEnter={() => {
            gsap.to(headingRef.current, {
              opacity: 0.2,
              duration: 0.5,
              ease: "power1.inOut",
            });
            gsap.to(paraRef.current, {
              opacity: 0.2,
              duration: 0.5,
              ease: "power1.inOut",
            });
            gsap.to(startRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            });
            gsap.to(particleRef.current, {
              opacity: 0.5,
              duration: 0.5,
              ease: "power1.inOut",
            });
          }}
          onMouseLeave={() => {
            gsap.to(headingRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            });
            gsap.to(paraRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            });
            gsap.to(startRef.current, {
              opacity: 0.2,
              duration: 0.5,
              ease: "power1.inOut",
            });
            gsap.to(particleRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: "power1.inOut",
            });
          }}
        >
          <div
            ref={startRef}
            className="absolute bottom-0 left-0 w-[100vw] h-fit flex items-center justify-evenly bg-red-500 md:bg-transparent md:opacity-[0.2]"
          >
            <h2
              className="z-[8] md:text-center text-[4rem] md:text-[14vw] font-bold leading-[.8] tracking-tighter uppercase p-2 md:text-nowrap overflow-hidden size-[82%] md:size-auto"
              style={{ fontFamily: "Poppins" }}
            >
              Get Started
            </h2>
            <div className="z-[8] overflow-hidden">
              <i className="ri-arrow-right-circle-line text-[3.5rem] md:text-[11vw] tracking-tighter leading-none md:text-red-500"></i>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default HeroSection;
