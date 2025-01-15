import React from "react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Footer = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const divRef = useRef(null);
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  useEffect(() => {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }, [window.innerWidth]);
  useGSAP(() => {
    divRef.current.addEventListener("mousemove", (e) => {
      let det = e.target.getBoundingClientRect();
      // console.log(Math.abs(Math.round(e.clientY - det.top)));
      // console.log(e.clientY);
      gsap.to(pathRef.current, {
        duration: 0.1,
        attr: {
          d: `M 0 100 Q ${e.clientX - det.left} ${Math.abs(
            Math.round(e.clientY - det.top)
          )} ${width} 100`,
        },
      });
      // console.log(width);
    });
    divRef.current.addEventListener("mouseleave", (e) => {
      gsap.to(pathRef.current, {
        attr: {
          d: `M 0 100 Q ${width / 2} 100 ${width} 100`,
        },
        duration: 2,
        ease: "elastic.out(1.2,0.1)",
      });
    });
    return () => {
      divRef.current.removeEventListener("mousemove", (e) => {});
      divRef.current.removeEventListener("mouseleave", (e) => {});
    };
  }, []);

  return (
    <section className="flex items-end w-full h-screen">
      <section className="w-full h-fit flex gap-4 flex-col justify-center items-center p-4">
        <div
          ref={divRef}
          className="w-full flex justify-center items-center relative top-16"
        >
          <svg
            ref={svgRef}
            width={`${width}px`}
            height="300px"
            className="pointer-events-none"
          >
            <path
              ref={pathRef}
              d={`M 0 100 Q ${width / 2} 100 ${width} 100`}
              stroke="white"
              fill="transparent"
            />
          </svg>
        </div>
        <section className="w-full flex justify-between items-end pointer-events-none">
          <div className="w-fit flex flex-col justify-center items-start">
            <Button className="text-black p-6 rounded-full relative bg-red-500 pointer-events-auto">
              <i className="ri-arrow-up-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
            </Button>

            {/* <button className="text-black p-6 rounded-full relative bg-red-500 pointer-events-auto">
              <i className="ri-arrow-up-line absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
            </button> */}
          </div>
          <div className="w-fit flex items-start md:items-end gap-2 uppercase font-mono pointer-events-auto relative">
            {/* <p className="text-white w-fit text-xl">Connect With Us</p> */}
            <div className="w-full bg-red-500 py-3 px-4 rounded-sm">
              <i className="ri-linkedin-fill text-blue-500"></i>
              {/* <p>LinkedIn</p> */}
            </div>
            <div className="w-full bg-red-500 flex py-3 px-4 rounded-sm">
              <i className="ri-github-line"></i>
              {/* <p>Github</p> */}
            </div>
            <div className="w-full bg-red-500 flex py-3 px-4 rounded-sm">
              <i className="ri-mail-line text-neutral-200"></i>
              {/* <p>Email</p> */}
            </div>
          </div>
        </section>
        <h1 className="w-full text-white text-[14.5vw] text-center font-bold tracking-tight leading-none uppercase bg-red-500 overflow-hidden">
          {import.meta.env.VITE_APP_NAME}
        </h1>
      </section>
    </section>
  );
};

export default Footer;
