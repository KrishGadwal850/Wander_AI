import React, { useState, useEffect } from "react";
import Menu from "@/components/custom/menu/Menu";
import LocomotiveScroll from "locomotive-scroll";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { chatSession } from "@/GoogleAPI/AIModel";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/GoogleAPI/FireBaseConfig";
import generateUniqueId from "generate-unique-id";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import MouseFollower from "@/components/custom/MouseFollower";
import TripForm from "./TripForm";
import BudgetCards from "./BudgetCards";
import TravelWithCards from "./TravelWithCards";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Spline from "@splinetool/react-spline";
import { formContext } from "@/context/Context";
import Footer from "@/components/custom/Footer";
const CreateTrip = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonScaleRef = useRef(null);
  const buttonTextRef = useRef(null);
  const robotRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    tripDuration: "",
    budget: "",
    travelWith: "",
  });
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      toast({
        title: "Please Sign in to generate trip",
        description: "Go to Sign in page from menu",
        className: "bg-white text-black",
        action: (
          <ToastAction altText="Sign in" onClick={() => navigate("/sign-in")}>
            Sign in
          </ToastAction>
        ),
      });
      return;
    }
    if (
      !formData?.tripDuration ||
      !formData?.budget ||
      (!formData?.travelWith && parseInt(formData?.tripDuration) > 5)
    ) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please fill all the fields properly",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: "bg-red-500 text-white hover:bg-red-600 border-none",
      });
      return;
    }
    setLoading(true);
    const prompt = `Generate Travel Plan for Location: ${formData?.destination.value.description}, for ${formData?.tripDuration} Days for ${formData?.travelWith} with a ${formData?.budget} budget,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for ${formData?.tripDuration} days with each day plan with best time to visit in JSON format.`;
    console.log(prompt);

    const result = await chatSession.sendMessage(prompt);
    console.log(result?.response.text());
    handleSaveTrip(result?.response.text());
    setLoading(false);
  };
  const handleSaveTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const id = generateUniqueId();
    console.log(id);

    await setDoc(doc(db, "AITrip", id), {
      userSelectedData: formData,
      tripData: JSON.parse(tripData),
      userData: user,
      id: id,
    });
    setLoading(false);
    navigate(`/view-trip/${id}`);
  };

  // Button Hover Effect
  const [isIn, setIsIn] = useState(false);
  let tl = gsap.timeline();
  const handleButtonMove = (det) => {
    // console.log(det);
    // console.log(det.target.getBoundingClientRect());
    if (!isIn) {
      tl.to(buttonScaleRef.current, {
        x: det.clientX - det.target.getBoundingClientRect().left,
        y: det.clientY - det.target.getBoundingClientRect().top,
        duration: 0,
      });
      tl.to(buttonScaleRef.current, {
        scale: 500,
        duration: 0.3,
        ease: "power1.inOut",
      });
      gsap.to(buttonTextRef.current, {
        color: "white",
        duration: 0.3,
        ease: "power1.inOut",
      });
    }
    setIsIn(true);
  };
  const handleButtonLeave = (det) => {
    // console.log(det.target.getBoundingClientRect());
    tl.to(buttonScaleRef.current, {
      x: det.clientX - det.target.getBoundingClientRect().left,
      y: det.clientY - det.target.getBoundingClientRect().top,
      duration: 0,
    });
    tl.to(buttonScaleRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power1.inOut",
    });
    gsap.to(buttonTextRef.current, {
      color: "black",
      duration: 0.2,
      ease: "power1.inOut",
    });
    setIsIn(false);
  };

  return (
    <>
      <MouseFollower element={headingRef} />
      <Menu hl="create-trip" />
      <formContext.Provider value={{ formData, setFormData }}>
        <section className="w-full h-screen p-[9rem_0rem_0rem_0rem] md:p-[9rem_2rem_2rem_2rem] text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:z-1 after:w-full after:h-[30%] after:overflow-hidden after:bg-gradient-to-t after:from-neutral-900 after:via-neutral-900/80 after:to-transparent after:pointer-events-none flex flex-col items-center justify-start">
          <section className="absolute top-0 left-0 z-0 w-full h-full overflow-hidden items-center justify-center hidden md:flex">
            <div
              ref={robotRef}
              className="w-[120vw] h-[120vh] overflow-hidden blur-[4px]"
            >
              <Spline
                className="w-full h-full"
                scene="https://prod.spline.design/cpnQUG04nVo20Ai5/scene.splinecode"
              />
            </div>
          </section>
          <section
            data-scroll
            data-scroll-speed="0.3"
            className="relative z-10 top-[-5%] md:top-[10%] left-[0%] -translate-x-1/2 w-full max-w-[1400px] flex flex-col gap-6 pointer-events-none p-4"
          >
            <div className="flex flex-col gap-2 items-center">
              <h2
                ref={headingRef}
                className="text-center text-[3rem] md:text-[5vw] font-bold uppercase tracking-tight leading-none lg:text-nowrap pointer-events-auto scale-hover"
              >
                Inform <span className="text-red-500">AI</span> about your
                preferences
              </h2>
              <p
                ref={descriptionRef}
                className="text-center text-neutral-400 w-[100%] md:w-[60%] font-mono"
              >
                Select your preferred location for the trip and the number of
                days you want to spend there. Our AI is excited to assist you in
                creating your perfect travel plan! This includes suggestions for
                hotels and places to visit, ensuring a memorable trip.
              </p>
            </div>
            {/* Form Section */}
            <section className="w-full max-w-[1400px] mx-auto pointer-events-none p-2">
              <TripForm />
            </section>
          </section>
        </section>
        {/* Budget Section */}
        <section className="w-full min-h-screen p-4 text-white">
          <BudgetCards />
        </section>
        {/* Travel With Section */}
        <section className="w-full min-h-screen p-4 flex flex-col gap-4 justify-between text-white ">
          <TravelWithCards />
          <div className="w-full p-[2rem_2rem] flex justify-center">
            <Button
              disabled={loading}
              className={`overflow-hidden relative bg-neutral-100 text-black p-[1.5rem_3rem] uppercase font-bold ${
                loading && "font-mono"
              }`}
              onClick={handleGenerateTrip}
              onMouseMove={(det) => {
                handleButtonMove(det);
              }}
              onMouseLeave={(det) => {
                handleButtonLeave(det);
              }}
            >
              <div
                ref={buttonScaleRef}
                className="absolute z-0 top-0 left-0 w-[1px] h-[1px] rounded-full bg-red-500 pointer-events-none -translate-x-1/2 -translate-y-1/2"
              ></div>
              <span ref={buttonTextRef} className="z-10 pointer-events-none">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </Button>
          </div>
        </section>
      </formContext.Provider>
      <Footer />
    </>
  );
};

export default CreateTrip;
