import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGooglePlacePhoto } from "@/hooks/useGooglePlacePhoto";
const HotelCard = ({
  hotel,
  idx,
  cardRef,
  handleCardMove,
  handleCardLeave,
  cardScaleRef,
  isIn,
}) => {
  const imageRef = useRef(null);
  const hoverRef = useRef(false);
  const { photoUrl, loading, error } = useGooglePlacePhoto(
    `${hotel.hotelName} of ${hotel.hotelAddress.split("(")[0]}`,
    4,
    500,
    500
  );
  return (
    <div
      ref={(el) => (cardRef.current[idx] = el)}
      className="p-2 flex flex-col justify-between gap-4 rounded-sm font-mono h-full bg-neutral-50 relative overflow-hidden md:hover:scale-105 transition-all duration-300"
      onMouseEnter={(det) => {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.5,
          delay: 0.3,
          ease: "power1.inOut",
        });
        hoverRef.current = true;
        handleCardMove(det, idx);
      }}
      onMouseLeave={(det) => {
        gsap.to(imageRef.current, {
          scale: 1.1,
          duration: 0.3,
          delay: 0.2,
          ease: "power1.inOut",
        });
        hoverRef.current = false;
        handleCardLeave(det, idx);
      }}
    >
      <div
        ref={(el) => (cardScaleRef.current[idx] = el)}
        className="absolute z-0 top-0 left-0 w-[1px] h-[1px] rounded-full bg-red-500 pointer-events-none -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div className="flex flex-col gap-2 text-neutral-900 px-1">
        <div className="overflow-hidden relative rounded-sm h-60">
          <img
            ref={imageRef}
            className="w-full h-full object-cover scale-[1.1]"
            src={photoUrl}
            alt={`${hotel.hotelName} of ${hotel.hotelAddress}`}
          />
          <p className="absolute bottom-0 right-0 bg-black/60 text-white text-xs p-2 flex gap-2">
            <i className="ri-star-s-fill text-yellow-400"></i>
            {hotel.rating}
          </p>
        </div>
        <div className="z-10 flex flex-col pointer-events-none">
          <p
            className={`z-10 font-bold text-lg uppercase pointer-events-none text-neutral-900`}
          >
            {hotel.hotelName}
          </p>
          <p className={`text-xs flex gap-2 text-neutral-800`}>
            {/* <i className={`ri-map-pin-range-fill`}></i> */}
            {hotel.hotelAddress}
          </p>
        </div>
      </div>
      <p
        className={`z-10 text-xs font-bold flex gap-2 ${
          hoverRef.current ? "text-purple-800" : "text-green-700"
        }`}
      >
        <i className={`ri-price-tag-3-line`}></i>
        {hotel.price}
      </p>
    </div>
  );
};

export default HotelCard;
