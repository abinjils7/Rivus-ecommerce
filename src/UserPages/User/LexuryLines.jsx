import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";

function LuxuryLines() {
  const navigate = useNavigate();

  const sections = [
    { 
      title: "Explore Our Luxury Lines", 
      description: "Discover our premium collection of high-end vehicles for the discerning driver", 
      path: "/premium-luxury",
      video: "/videos/lux.mp4"
    },
    { 
      title: "For The Tracks", 
      description: "Experience our high-performance models designed for racing enthusiasts", 
      path: "/trackspec",
      video: "/videos/m2cs.mp4"
    },
    { 
      title: "Explore Our All-Terrains", 
      description: "Discover our rugged yet luxurious vehicles for any adventure", 
      path: "/Allterains",
      video: "/videos/dune.mp4"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto pt-12">
        <h2 className="luxury-font text-5xl font-bold text-center mb-4 tracking-tight text-gray-900">PREMIUM COLLECTIONS</h2>
        <p className="text-center mb-12 font-light tracking-wide text-gray-600">Exclusive access to premium driving experiences</p>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="cursor-pointer rounded-xl p-6 flex flex-col w-full relative overflow-hidden group card-hover"
              style={{
                width: index === 1 ? '40%' : '30%',
                background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
              onClick={() => navigate(section.path)}
            >
              
              <div className="absolute inset-0 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-white/90 to-transparent"></div>
              
              <div 
                className="relative z-10 rounded-lg overflow-hidden transition-all duration-500 group-hover:scale-105"
                style={{ transform: 'translateZ(0)' }}
              >
                <div className="aspect-video mb-6 overflow-hidden rounded-lg relative transform transition-transform duration-500 group-hover:scale-110 video-container">
                  <video 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    autoPlay 
                    muted 
                    loop
                    playsInline
                  >
                    <source src={section.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                 
                  {index === 0 && (
                    <div className="absolute bottom-3 left-4 flex items-center">
                      <div className=""></div>
                      {/* <span className="text-xs font-light text-white bg-black/70 px-2 py-1 rounded">LIVE</span> */}
                    </div>
                  )}
                 
                  {index === 1 && (
                    <div className="absolute top-3 right-4">
                      {/* <span className="text-xs bg-yellow-400/90 px-2 py-1 rounded-full font-light text-gray-900">PREMIUM</span> */}
                    </div>
                  )}
                  
                
                  {index === 2 && (
                    <div className="absolute top-3 left-4">
                      
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-medium mb-4 flex items-center relative z-20 text-gray-900">
                  {section.title}
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                </h3>
                
                <p className="flex-grow mb-6 font-light text-sm leading-relaxed relative z-20 transition-all duration-300 group-hover:translate-y-1 text-gray-600">
                  {section.description}
                </p>
                
                <button className="px-5 py-2.5 rounded-md transition-all duration-300 text-sm font-light tracking-wide shadow-sm relative z-20 group-hover:bg-opacity-90 group-hover:translate-y-1 bg-white border border-gray-300 hover:bg-gray-50">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 text-sm text-gray-400">
          <p>Exclusively Crafted Automotive Experiences</p>
        </div>
      </div>
       <Footer/>
    </div>
  );
}

export default LuxuryLines;