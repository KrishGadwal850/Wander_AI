import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "@/components/custom/menu/Menu";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/GoogleAPI/FireBaseConfig";
// import ShowTripCard from "./ShowTripCard";
import Footer from "@/components/custom/Footer";
import MouseFollower from "@/components/custom/MouseFollower";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";
const ShowTrip = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const cardRef = useRef([]);

  const getUserTrips = async () => {
    // setLoading(true);
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/sign-in");
    }
    const userData = JSON.parse(user);
    const q = query(
      collection(db, "AITrip"),
      where("userData.email", "==", userData.email)
    );
    const docs = await getDocs(q);
    setTrips([]);
    docs.forEach((doc) => {
      // console.log(doc.data());
      setTrips((prev) => [...prev, doc.data()]);
    });
    // setLoading(false);
  };
  useEffect(() => {
    getUserTrips();
  }, []);
  const sliderRef = useRef(null);
  useGSAP(() => {
    if (trips.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);
    const screenWidth = document.documentElement.clientWidth;
    console.log("Screen width is = ", screenWidth);
    const slidingWidth = sliderRef.current.clientWidth - screenWidth;
    console.log("Sliding width is = ", slidingWidth);
    gsap.to(sliderRef.current, {
      x: -slidingWidth,
      scrollTrigger: {
        trigger: sliderRef.current,
        scroller: "body",
        start: "top 0%",
        end: "400%",
        pin: true,
        scrub: 2,
        // markers: {
        //   startColor: "white",
        //   endColor: "white",
        //   fontSize: "18px",
        //   fontWeight: "bold",
        //   indent: 20,
        // },
      },
    });
  }, [trips.length]);
  useGSAP(() => {
    if (cardRef.current.length === 0) return;
    gsap.to(cardRef.current, {
      opacity: 0.2,
      ease: "power1.inOut",
      stagger: 0,
    });
    gsap.to(cardRef.current[0], {
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut",
    });
    gsap.to(cardRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut",
      stagger: 0.7,
      scrollTrigger: {
        trigger: sliderRef.current,
        scroller: "body",
        start: "top 40%",
        end: "300%",
        scrub: 2,
        // markers: {
        //   startColor: "white",
        //   endColor: "white",
        //   fontSize: "18px",
        //   fontWeight: "bold",
        //   indent: 20,
        // },
      },
    });
  }, [trips.length]);
  const rotationValues = [12, -6, 10, -10, -7, 13, -15];
  return (
    <>
      <Menu hl="profile" />
      <MouseFollower />
      {trips && (
        <section className="w-full h-full overflow-hidden">
          <section
            ref={sliderRef}
            className={`w-fit h-screen flex items-center gap-32 p-[2rem_2rem] md:p-[5rem_5rem]`}
          >
            <div className="min-w-[80vw] md:min-w-fit">
              <p className="text-[10vw] text-white font-bold uppercase leading-none flex flex-col gap-2 md:hyphens-manual md:size-min">
                Hey Krish!
                <span className="text-[1rem] font-thin md:pr-[1.3vw] flex gap-2 items-center md:justify-end text-red-500 font-mono">
                  scroll to see your planned trips{" "}
                  <i className="ri-arrow-down-wide-line"></i>
                </span>
              </p>
            </div>
            {
              // rotation values
              trips.map((trip, index) => {
                const rotation = Math.floor(
                  Math.random() * rotationValues.length
                );
                return (
                  <Card
                    key={index}
                    trip={trip}
                    rotation={rotationValues[rotation]}
                    reference={cardRef}
                  />
                );
              })
            }
          </section>
        </section>
      )}
      <Footer />
    </>
  );
};

export default ShowTrip;
