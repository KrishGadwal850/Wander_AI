import React from "react";
import Scene from "./Scene";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
const CircularCanvas = ({ placeName, days, budget, personCount }) => {
  return (
    <>
      <section className="absolute w-full min-h-screen overflow-hidden">
        {/* <div className="border border-red-500 absolute top-0 left-0 w-full h-3/4"> */}
        <div className="absolute w-full md:w-[90%] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white uppercase flex flex-col cursor-default gap-6 z-10 p-2">
          <h1 className="text-white text-center font-bold text-[2.5rem] md:text-[4rem] lg:text-[6rem] uppercase leading-none scale-hover">
            {placeName}
          </h1>
          <div className="w-full text-black uppercase pointer-events-none flex gap-2 justify-center items-center flex-wrap font-mono">
            <p className="text-center uppercase bg-green-500 px-3 py-2 text-[.7rem]">
              {budget}
            </p>
            <p className="text-center uppercase bg-red-500 px-3 py-2 text-[.7rem]">
              {days}
            </p>
            <p className="text-center uppercase bg-white px-3 py-2 text-[.7rem]">
              {personCount} people
            </p>
          </div>
        </div>
      </section>
      <Canvas
        className="w-full h-full blur-md"
        camera={{
          fov: 45,
        }}
      >
        {/* <OrbitControls /> */}
        <Scene />
        <EffectComposer>
          <Bloom
            mipmapBlur={true}
            intensity={2} // The bloom intensity.A blur pass.// blur kernel size
            luminanceThreshold={0.6} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.5} // smoothness of the luminance threshold. Range is [0, 1]
            // mipmapBlur={false} // Enables or disables mipmap blur. // The vertical resolution.
          />
        </EffectComposer>
        <ToneMapping adaptive={true} />
        <ambientLight intensity={2} />
        {/* <directionalLight position={[0, 0, 5]} color="white" /> */}
      </Canvas>
    </>
  );
};

export default CircularCanvas;
