import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";
import gsap from "gsap";
const HotelsList = ({ tripInfo }) => {
  const cardScaleRef = useRef([]);
  const card = useRef([]);
  const [isIn, setIsIn] = useState(false);
  let tl1 = gsap.timeline();
  // let tl2 = gsap.timeline();
  const handleCardMove = (det, idx) => {
    // console.log(det);
    // console.log(det.target.getBoundingClientRect());
    if (!isIn) {
      card.current.forEach((el, index) => {
        if (index !== idx) {
          // console.log(el);
          tl1.to(el, {
            pointerEvents: "none",
            duration: 0,
          });
        }
      });
      tl1.to(cardScaleRef.current, {
        scale: 1,
        duration: 0,
        ease: "power1.inOut",
      });
      tl1.to(cardScaleRef.current[idx], {
        x: det.clientX - det.target.getBoundingClientRect().left,
        y: det.clientY - det.target.getBoundingClientRect().top,
        duration: 0,
      });
      tl1.to(cardScaleRef.current[idx], {
        scale: 1200,
        duration: 0.4,
        ease: "power1.inOut",
      });
    }
    setIsIn(true);
  };
  const handleCardLeave = (det, idx) => {
    // console.log(det.target.getBoundingClientRect());
    tl1.to(cardScaleRef.current[idx], {
      x: det.clientX - det.target.getBoundingClientRect().left,
      y: det.clientY - det.target.getBoundingClientRect().top,
      duration: 0,
    });
    tl1.to(cardScaleRef.current, {
      scale: 1,
      duration: 0,
      ease: "power1.inOut",
    });
    tl1.to(cardScaleRef.current[idx], {
      scale: 1,
      duration: 0.2,
      ease: "power1.inOut",
    });
    card.current.forEach((el, index) => {
      // console.log(el);
      tl1.to(el, {
        pointerEvents: "auto",
        duration: 0,
      });
    });
    setIsIn(false);
  };
  return (
    <section className="flex flex-col min-h-screen gap-10 p-4">
      <div className="flex flex-col gap-6 w-fit">
        <div className="flex flex-col w-fit gap-2 md:gap-0">
          <h2
            data-scroll
            data-scroll-speed="0.3"
            className="text-[1.7rem] md:text-[5vw] font-bold uppercase leading-none scale-hover"
          >
            Hotel Recommendations
          </h2>
          <div className="text-sm text-end flex gap-2 justify-start md:justify-end items-center pr-1 text-blue-500">
            <i className="ri-gemini-fill"></i>
            <p className="text-xs capitalize">by Gemini</p>
          </div>
        </div>
        <div className="flex flex-col p-1 pointer-events-none">
          <p className="text-sm text-neutral-300 lg:w-10/12 font-mono">
            These hotel recommendations are carefully curated by Gemini AI to
            ensure a comfortable and enjoyable stay during your trip. Please
            note that prices and availability may vary, and we encourage you to
            verify the details with the hotels directly to ensure the best
            experience.
          </p>
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 ">
        {tripInfo?.tripData?.hotels?.map((hotel, idx) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${
              hotel.hotelName
            } of ${hotel.hotelAddress.split("(")[0]}`}
            target="_blank"
            key={idx}
          >
            <HotelCard
              hotel={hotel}
              idx={idx}
              cardRef={card}
              handleCardMove={handleCardMove}
              handleCardLeave={handleCardLeave}
              cardScaleRef={cardScaleRef}
              isIn={isIn}
            />
          </Link>
        ))}
      </section>
    </section>
  );
};

export default HotelsList;
