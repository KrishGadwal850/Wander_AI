import React, { useState } from "react";
import { useGooglePlacePhoto } from "@/hooks/useGooglePlacePhoto";
import { Link } from "react-router-dom";
const Card = ({ rotation, trip, reference }) => {
  const [liked, setLiked] = useState(false);
  const { photoUrl, loading, error } = useGooglePlacePhoto(
    trip.tripData.tripDetails.location,
    3,
    400,
    400
  );
  return (
    <div
      ref={(e) => reference.current.push(e)}
      className={`bg-red-500 p-2 flex gap-1 flex-col rounded-sm font-mono opacity-20`}
      style={{
        transform: `rotate(${rotation}deg)`,
        minWidth: "18rem",
        width: "35vw",
        maxWidth: "26rem",
        minHeight: "25rem",
        height: "35vw",
        maxHeight: "25rem",
      }}
    >
      <div className="w-full h-[80%] relative overflow-hidden rounded-sm bg-neutral-800">
        <div
          className={`absolute top-0 right-0 py-[.8rem] px-[.5rem] z-10 ${
            liked ? "text-red-500" : "text-gray-400"
          } cursor-pointer`}
        >
          <i
            onClick={() => setLiked(!liked)}
            className="ri-heart-fill border p-2 rounded-full bg-white"
          ></i>
        </div>
        {!loading && (
          <img
            className="w-full h-full object-cover"
            src={photoUrl}
            alt={`${trip.tripData.tripDetails.location}`}
          />
        )}
      </div>
      <div className="w-full h-[20%] p-1 flex flex-col justify-evenly">
        <div className="flex gap-1 pointer-events-none">
          <p className="text-[.5rem] uppercase text-white bg-red-300 rounded-full w-fit p-[.2rem_.5rem]">
            {trip.tripData.tripDetails.duration}
          </p>
          <p className="text-[.5rem] uppercase text-white bg-red-300 rounded-full w-fit p-[.2rem_.5rem]">
            {trip.tripData.tripDetails.budget}
          </p>
          <p className="text-[.5rem] uppercase text-white bg-red-300 rounded-full w-fit p-[.2rem_.5rem]">
            For {trip.tripData.tripDetails.travelers}
          </p>
        </div>
        <Link to={`/view-trip/${trip.id}`} target="_blank">
          <p className="w-fit text-[.7rem] font-bold uppercase text-white flex items-center gap-2 hover:text-blue-700 transition-all duration-300">
            {trip.tripData.tripDetails.location}
            <i class="ri-arrow-drop-right-fill text-[1.2rem] text-blue-800"></i>
          </p>
        </Link>
        {/* <p className="text-[.5rem] uppercase text-white"></p> */}
      </div>
    </div>
  );
};

export default Card;
