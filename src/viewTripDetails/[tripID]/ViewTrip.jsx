import React from "react";
import Menu from "@/components/custom/menu/Menu";
import { useParams } from "react-router-dom";
import { db } from "@/GoogleAPI/FireBaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import InfoSection from "@/viewTripDetails/view-components/InfoSection";
import HotelsList from "@/viewTripDetails/view-components/HotelsList";
import VisitingPlaces from "@/viewTripDetails/view-components/VisitingPlaces";
import MouseFollower from "@/components/custom/MouseFollower";
import Footer from "@/components/custom/Footer";
import LocomotiveScroll from "locomotive-scroll";
const ViewTrip = () => {
  const { tripID } = useParams();
  const [tripData, setTripData] = useState(null);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);
  useEffect(() => {
    tripID && getTripData();
  }, [tripID]);
  const getTripData = async () => {
    const tripSnap = await getDoc(doc(db, "AITrip", tripID));
    if (tripSnap.exists()) {
      setTripData(tripSnap.data());
    }
  };
  return (
    tripData && (
      <>
        <div>
          <Menu hl="create-trip" />
          <MouseFollower />
          <section className="w-full">
            <InfoSection tripInfo={tripData} />
            <HotelsList tripInfo={tripData} />
            <VisitingPlaces tripInfo={tripData} />
          </section>
        </div>
        <Footer />
      </>
    )
  );
};

export default ViewTrip;
