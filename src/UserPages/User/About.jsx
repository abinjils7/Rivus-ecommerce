import React from "react";
import Navbar from "../Common/Nav";
import Footer from "../Common/Footer";
// import Footer from "../Common/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/mec1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        <div className="relative z-20 max-w-5xl mx-auto h-full flex flex-col justify-center ml-[20px] px-6 text-white overflow-hidden">
          <h1 className="text-4xl font-bold mb-4">About Rivus</h1>

          <p className="text-lg mb-4 leading-relaxed">
            Welcome to <span className="font-semibold text-white">Rivous</span>{" "}
            — a brand built on excellence, integrity, and a deep passion for
            automobiles. For over <span className="font-bold">25 years</span>,
            we've proudly served communities by connecting people to cars that
            fit their lives, budgets, and aspirations.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">Our Mission</h2>
          <p className="text-lg mb-4 leading-relaxed">
            At Rivous, our mission is simple: to make car ownership enjoyable,
            affordable, and trustworthy. Whether you're buying your first car or
            your fifth, we’re here to ensure every journey starts with
            confidence.
          </p>

          <h2 className="text-2xl font-semibold mt-4 mb-2">Our Core Values</h2>
          <ul className="list-disc list-inside text-lg space-y-1 mb-4">
            <li>
              <span className="font-semibold">Customer First</span> – We put
              your needs at the center of everything we do.
            </li>
            <li>
              <span className="font-semibold">Transparency</span> – No hidden
              fees, no false promises. Just honest deals.
            </li>
            <li>
              <span className="font-semibold">Quality Assurance</span> – Every
              vehicle is carefully inspected for safety and performance.
            </li>
            <li>
              <span className="font-semibold">Innovation</span> – We embrace
              technology to make buying and owning a car easier than ever.
            </li>
          </ul>

          <div className="flex justify-center">
            <a
              href="/marketplace"
              className="text-white px-9 py-3 rounded-full hover:bg-gray-800 bg-black"
            >
              Browse Cars
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
