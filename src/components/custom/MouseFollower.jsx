import React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
const MouseFollower = () => {
  const mouseFollowerRef = useRef(null);
  useGSAP(() => {
    // mouse follower
    // add .scale-hover class to add mouse follower scale effect
    const mouseFollower = mouseFollowerRef.current;
    const hoverElement = document.querySelectorAll(".scale-hover");
    // console.log(mouseFollower);
    const mouseFollowerScale = (ele) => {
      ele.forEach((e) => {
        e.addEventListener("mouseover", () => {
          gsap.to(mouseFollower, {
            scale: 7,
            duration: 0.7,
            ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          });
        });
        e.addEventListener("mouseleave", () => {
          gsap.to(mouseFollower, {
            scale: 1,
            duration: 0.7,
            ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          });
        });
      });
    };
    mouseFollowerScale(hoverElement);

    // mouse follower position
    const handleMouseMove = (det) => {
      gsap.to(mouseFollower, {
        x: det.clientX,
        y: det.clientY,
        top: 0,
        left: 0,
        opacity: 1,
        duration: 0.7,
        ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      });
    };
    // mouse follower out
    const handleMouseOut = () => {
      gsap.to(mouseFollower, {
        opacity: 0,
        duration: 0.7,
        ease: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      });
    };

    // add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);
  return (
    <div
      ref={mouseFollowerRef}
      className="hidden md:inline-block w-4 h-4 backdrop-filter backdrop-invert rounded-full fixed -translate-x-1/2 -translate-y-1/2 top-[-10%] left-[-10%] z-50 opacity-0 pointer-events-none"
    ></div>
  );
};
export default MouseFollower;
