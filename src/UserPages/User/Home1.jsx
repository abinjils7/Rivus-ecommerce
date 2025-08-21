import React from "react";
import Nav from "../Common/Nav";
import CarCards from "./CarCard";

export default function HeroSection() {
  return (
    <>
      <Nav />
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/bmw.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Welcome To <span className="text-green-400"> Rivus</span>
          </h1>
          <p className="mt-4 text-white text-lg md:text-xl">
            Drive beyond expectations — premium performance
          </p>
          <a
            href="/lexury"
            className="mt-6 inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Explore Latest Collection
          </a>

    


        </div>
      </section>
      {/* <CarCards /> */}
    </>
  );
}
