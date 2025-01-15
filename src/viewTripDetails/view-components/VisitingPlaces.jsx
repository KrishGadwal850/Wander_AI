import React from "react";
import VisitingCard from "./VisitingCard";
const VisitingPlaces = ({ tripInfo }) => {
  return (
    <section className="min-h-screen flex flex-col gap-10 p-4">
      <div className="flex flex-col gap-6 w-fit">
        <div className="flex flex-col gap-2 md:gap-0 w-fit">
          <h2 className="text-[1.5rem] md:text-[5vw] font-bold uppercase leading-none scale-hover">
            Visiting Places
          </h2>
          <div className="text-sm text-end flex gap-2 justify-start md:justify-end items-center pr-1 text-blue-500">
            <i className="ri-gemini-fill"></i>
            <p className="text-xs capitalize">by Gemini</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 pointer-events-none">
          <p className="text-sm text-neutral-300 lg:w-10/12 font-mono">
            These places are carefully curated by Gemini AI to ensure a
            comfortable and enjoyable stay during your trip. Please note that
            prices and availability may vary, and we encourage you to verify the
            details with the hotels directly to ensure the best experience.
          </p>
        </div>
      </div>
      <section className="flex flex-col gap-4">
        {tripInfo?.tripData?.itinerary?.map((place, idx) => (
          <section key={idx} className=" flex flex-col gap-4">
            <h3 className="text-[1.5rem] font-bold uppercase font-mono">{`Day ${place.day}`}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
              {place.plan.map((plan, idx) => (
                <div key={idx}>
                  {/* <p className="text-sm">{`Best Time to Visit: ${plan.bestTime}`}</p> */}
                  <VisitingCard
                    plan={plan}
                    loc={tripInfo?.tripData?.tripDetails?.location}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </section>
    </section>
  );
};

export default VisitingPlaces;
