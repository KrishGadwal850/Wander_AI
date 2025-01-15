import React from "react";
import { travelOptions } from "@/data/options";
import { useContext } from "react";
import { formContext } from "../context/Context";
import { useRef } from "react";
import gsap from "gsap";
const TravelWithCards = () => {
  const scaleCircleRef2 = useRef([]);
  const cardContainerRef2 = useRef([]);
  const handleCardClick = (option, index, det) => {
    setFormData({ ...formData, travelWith: option.people });
    // console.log(det);
    let x = det.clientX - det.target.getBoundingClientRect().left;
    let y = det.clientY - det.target.getBoundingClientRect().top;
    let tl = gsap.timeline();
    scaleCircleRef2.current.forEach((ref) => {
      if (ref) {
        gsap.to(ref, {
          scale: 1,
          duration: 0,
        });
      }
    });
    cardContainerRef2.current.forEach((ref, idx) => {
      if (ref) {
        gsap.to(ref, {
          pointerEvents: "none",
          duration: 0,
        });
      }
    });
    tl.to(scaleCircleRef2.current[option.id], {
      left: `${x}px`,
      top: `${y}px`,
      duration: 0,
    });
    tl.to(scaleCircleRef2.current[option.id], {
      scale: 1000,
      duration: 0.7,
    });
    cardContainerRef2.current.forEach((ref, idx) => {
      if (idx !== index) {
        tl.to(ref, {
          pointerEvents: "auto",
          duration: 0,
        });
      }
    });
  };
  const { formData, setFormData } = useContext(formContext);
  return (
    <section className="flex flex-col gap-10 justify-evenly max-w-[1400px]">
      <section className="relative h-[25vh]">
        <div
          data-scroll
          data-scroll-speed="0.1"
          className="flex flex-col gap-2 absolute top-[-15%] left-[0%]"
        >
          <h2 className="text-[2rem] md:text-[4vw] font-bold uppercase scale-hover">
            With whom you're going to travel ?
          </h2>
          <p className="pl-1 text-left text-neutral-400 lg:w-[70%] font-mono pointer-events-none">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque,
            non! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
            eos, esse repellat minus illo tempore hic unde laborum excepturi
            impedit!
          </p>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
        {travelOptions.map((option, index) => (
          <div
            key={option.id}
            ref={(e) => (cardContainerRef2.current[index] = e)}
            className={`${
              formData?.travelWith === option.people &&
              "text-white pointer-events-none"
            } rounded-sm flex flex-col gap-4 justify-between p-4 md:hover:scale-105 transition-all duration-300 relative overflow-hidden bg-white text-black cursor-pointer font-mono`}
            onClick={(det) => handleCardClick(option, index, det)}
          >
            {console.log(formData?.travelWith === option.people)}
            <div
              ref={(e) => (scaleCircleRef2.current[option.id] = e)}
              className="absolute z-0 top-0 left-0 w-[1px] h-[1px] bg-red-500 -translate-x-full -translate-y-full rounded-full"
            ></div>
            <div className="flex flex-col gap-1 pointer-events-none relative z-10">
              <p className="text-2xl">{option.icon}</p>
              <h3 className="text-lg font-bold uppercase">{option.title}</h3>
              <p
                className={`text-sm relative z-10 ${
                  formData?.travelWith === option.people && "text-neutral-100"
                } ${
                  formData?.travelWith !== option.people && "text-neutral-400"
                }`}
              >
                {option.desc}
              </p>
            </div>
            <p
              className={`pointer-events-none relative z-10 ${
                formData?.travelWith === option.people && "text-black"
              } ${formData?.travelWith !== option.people && "text-green-700"}`}
            >
              {option.people}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelWithCards;
