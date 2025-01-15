import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./menu.css";
import { Link } from "react-router-dom";

const Menu = ({ hl }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBlock = useRef(null);
  const menuCloseBlock = useRef(null);
  const linkTags = useRef([]);
  const menuCloseText = useRef(null);
  const plusSVG = useRef(null);
  const linkPointer = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    if (menuOpen) {
      gsap.to(menuBlock?.current, {
        width: `${screenWidth < 1024 ? 100 : 45}%`,
        height: "100%",
        duration: 0.5,
        ease: "power4.inOut",
        top: 0,
        right: 0,
      });
      gsap.to(menuCloseBlock?.current, {
        delay: 0.4,
        duration: 0.2,
        display: "inline-block",
        opacity: 0.3,
      });
      gsap.to(linkTags?.current, {
        delay: 0.2,
        display: "flex",
        opacity: 1,
        duration: 0.2,
        ease: "power3.in",
      });
      screenWidth > 1024 &&
        gsap.to(plusSVG?.current, {
          delay: 0.3,
          duration: 0.2,
          display: "inline-block",
          opacity: 1,
          ease: "cubic-bezier(0.165, 0.84, 0.44, 1)",
          rotation: "90",
        });
      if (screenWidth < 1024) {
        gsap.to(menuCloseText.current, {
          delay: 0.7,
          opacity: 1,
          duration: 0.5,
          display: "inline-block",
        });
      }
    } else {
      gsap.to(menuBlock?.current, {
        width: `${screenWidth < 1024 ? 4 : 5}rem`,
        height: `${screenWidth < 1024 ? 3 : 4}rem`,
        duration: 0.2,
        ease: "power4.inOut",
        top: "10px",
        right: "10px",
      });
      gsap.to(menuCloseBlock?.current, {
        display: "none",
        duration: 0.1,
        opacity: 0,
      });
      screenWidth > 1024 &&
        gsap.to(plusSVG?.current, {
          duration: 0.2,
          display: "none",
          opacity: 0,
          ease: "cubic-bezier(0.165, 0.84, 0.44, 1)",
          rotation: "0",
        });
      gsap.to(linkTags.current, {
        display: "none",
        opacity: 0,
        duration: 0.1,
        ease: "power3.in",
      });
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen, screenWidth]);

  return (
    <>
      <div
        className="text-white translate-x-1/2 -translate-y-1/2 p-2 fixed top-[34px] right-[42px] lg:pointer-events-none flex z-[33] lg:top-[42px] lg:right-[50px]"
        onClick={() => {
          console.log("clicked");
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen && (
          <p
            ref={menuCloseText}
            className="hidden absolute top-[47%] translate-x-[-50%] -translate-y-1/2 left-[-60%] underline opacity-0"
          >
            close
          </p>
        )}
        <img className="w-4 h-4" src="/menu.svg" alt="menu" />
      </div>
      <section
        ref={menuBlock}
        className="fixed top-[10px] right-[10px] z-[30] w-16 h-12 bg-neutral-800 flex lg:w-20 lg:h-16"
        onMouseEnter={() => setMenuOpen(true)}
      >
        <div
          ref={plusSVG}
          className="w-[7rem] h-[7rem] translate-x-1/2 -translate-y-1/2 fixed top-[7rem] right-[36%] pointer-events-none hidden opacity-0"
        >
          <img src="/plus.svg" alt="plus" />
        </div>
      </section>
      <section
        ref={linkTags}
        className="fixed bottom-0 right-0 z-[32] w-full h-full display-none opacity-0 flex-col items-center lg:items-start justify-center lg:w-[45%] lg:max-h-[60%] lg:p-[1rem_3rem_2rem_3rem]"
      >
        {["home", "create-trip", "profile", "sign-in"].map((item, index) => (
          <Link
            to={item === "home" ? "/" : `/${item}`}
            className="w-full max-w-[30rem] flex items-center gap-[2rem]"
            key={index}
            onMouseEnter={() => {
              // plus rotation
              gsap.to(plusSVG.current, {
                rotate: `${90 * (index + 2)}deg`,
                duration: 0.4,
                ease: "power2.inOut",
              });
              // link pointer opacity
              item !== hl &&
                gsap.to(linkPointer[index], {
                  opacity: 1,
                  duration: 0.2,
                  ease: "power4.in",
                });
            }}
            onMouseLeave={() => {
              // link pointer opacity
              item !== hl &&
                gsap.to(linkPointer[index], {
                  opacity: 0,
                  duration: 0.2,
                  ease: "power4.out",
                });
            }}
          >
            <span
              ref={(e) => (linkPointer[index] = e)}
              className={`${
                item === hl ? "lg:opacity-1" : "lg:opacity-0"
              } hidden lg:inline-block`}
            >
              <img
                className="w-4 h-4"
                src="/checkbox-blank-circle-fill.svg"
                alt="pointer"
              />
            </span>
            <p
              className={`${
                item === hl ? "text-red-500" : "text-white"
              } uppercase leading-[5rem] w-full lg:leading-[6rem] text-center lg:text-start lg:tracking-tighter text-[4rem] lg:text-[4.5rem] cursor-pointer overflow-hidden font-bold scale-hover`}
            >
              {item.replace("-", " ")}
            </p>
          </Link>
        ))}
      </section>
      <section
        ref={menuCloseBlock}
        className="fixed top-0 left-0 w-[55%] h-full z-[20] bg-[rgba(42,41,41)] display-none opacity-0"
        onMouseEnter={() => setMenuOpen(false)}
      ></section>
    </>
  );
};

export default Menu;
