import React from "react";
import { useGooglePlacePhoto } from "@/hooks/useGooglePlacePhoto";
import CircularCanvas from "@/components/cylinderCanvas/CylinderCanvas";
const InfoSection = ({ tripInfo }) => {
  const placeName = tripInfo?.tripData?.tripDetails?.location;
  const days = tripInfo?.tripData?.tripDetails?.duration;
  const budget = tripInfo?.tripData?.tripDetails?.budget;
  const personCount = tripInfo?.tripData?.tripDetails?.travelers;
  const { photoUrl, loading, error } = useGooglePlacePhoto(
    placeName,
    3,
    600,
    600
  );

  return (
    <>
      <section className="w-full h-screen">
        {/* {console.log(tripInfo)}
        {console.log(placeName, days, budget, personCount)} */}
        <CircularCanvas
          placeName={placeName}
          days={days}
          budget={budget}
          personCount={personCount}
        />
      </section>
    </>
  );
};

export default InfoSection;
