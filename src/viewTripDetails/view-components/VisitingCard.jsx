import { useState, useEffect, useRef } from "react";
import React from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { useGooglePlacePhoto } from "@/hooks/useGooglePlacePhoto";
const VisitingCard = ({ plan, loc }) => {
  const [checked, setChecked] = useState(false);
  // const cardScaleRef = useRef(null);
  const imgRef = useRef(null);
  const {
    placeName,
    placeDetails,
    rating,
    ticketPricing,
    timeTravel,
    bestTime,
  } = plan;
  // useEffect(() => {
  //   console.log(placeDetails + " " + placeName + " of " + loc);
  // }, []);
  const [isIn, setIsIn] = useState(false);
  // let tl = gsap.timeline();
  // const handleCardMove = (det) => {
  //   // console.log(det);
  //   // console.log(det.target.getBoundingClientRect());
  //   if (!isIn) {
  //     tl.to(cardScaleRef.current, {
  //       x: det.clientX - det.target.getBoundingClientRect().left,
  //       y: det.clientY - det.target.getBoundingClientRect().top,
  //       duration: 0,
  //     });
  //     tl.to(cardScaleRef.current, {
  //       scale: 1500,
  //       duration: 0.5,
  //       ease: "power1.inOut",
  //     });
  //     // gsap.to(buttonTextRef.current, {
  //     //   color: "white",
  //     //   duration: 0.3,
  //     //   ease: "power1.inOut",
  //     // });
  //   }
  //   setIsIn(true);
  // };
  // const handleCardLeave = (det) => {
  //   // console.log(det.target.getBoundingClientRect());
  //   tl.to(cardScaleRef.current, {
  //     x: det.clientX - det.target.getBoundingClientRect().left,
  //     y: det.clientY - det.target.getBoundingClientRect().top,
  //     duration: 0,
  //   });
  //   tl.to(cardScaleRef.current, {
  //     scale: 1,
  //     duration: 0.3,
  //     ease: "power1.inOut",
  //   });
  //   // gsap.to(buttonTextRef.current, {
  //   //   color: "black",
  //   //   duration: 0.2,
  //   //   ease: "power1.inOut",
  //   // });
  //   setIsIn(false);
  // };
  const { photoUrl, loading, error } = useGooglePlacePhoto(
    `${placeName} of ${loc}`,
    4,
    400,
    400
  );
  return (
    <div
      className={`w-full md:h-full flex flex-col items-end md:items-start md:flex-row gap-4 p-2 rounded-sm font-mono bg-neutral-100 text-neutral-900 hover:scale-105 cursor-pointer transition-all duration-300 relative overflow-hidden`}
      onMouseEnter={() => {
        setIsIn(true);
        gsap.to(imgRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "power1.inOut",
        });
      }}
      // onMouseMove={(det) => {
      //   handleCardMove(det);
      // }}
      onMouseLeave={(det) => {
        setIsIn(false);
        gsap.to(imgRef.current, {
          scale: 1.1,
          duration: 0.3,
          delay: 0.1,
          ease: "power1.inOut",
        });
        // handleCardLeave(det);
      }}
    >
      <div className="z-10 relative w-full md:w-1/2 md:min-h-[12rem] h-full overflow-hidden rounded-sm">
        <img
          ref={imgRef}
          className="w-full h-full object-cover scale-[1.1]"
          src={photoUrl}
          alt={placeName}
        />
        <p className="text-xs absolute bottom-0 right-0 bg-black/60 text-white p-2 flex gap-2">
          <span>
            <i className="ri-star-fill text-yellow-400"></i>
          </span>{" "}
          {rating}
        </p>
      </div>
      <div className="z-10 flex flex-col gap-4 justify-between w-full h-full px-1 md:px-0">
        <div className="flex flex-col gap-2">
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${placeName} ${placeDetails} at ${loc}`}
            target="_blank"
          >
            <h3 className={`text-xl font-bold uppercase text-neutral-900 `}>
              {placeName}
            </h3>
          </Link>
          <p
            className={`text-xs pointer-events-none text-neutral-500 text-justify md:text-left`}
          >
            {placeDetails} Ticket prices are{" "}
            <span className={`text-green-500 font-bold`}>{ticketPricing}</span>,
            it takes{" "}
            <span className={`text-blue-500 font-bold`}>{timeTravel}</span> to
            travel to this place and the best time to visit is{" "}
            <span className={`text-red-500 font-bold`}>{bestTime}</span>.
          </p>
        </div>
      </div>
      <div
        className="z-10 p-2 border border-neutral-500 h-fit w-fit rounded-sm cursor-pointer"
        onClick={() => setChecked(!checked)}
      >
        <i
          className={`ri-check-double-line ${checked && "text-green-500"}`}
        ></i>
      </div>
    </div>
  );
};

export default VisitingCard;
