import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";

function LuxuryLines() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const sections = [
    { 
      title: "Explore Our Luxury Lines", 
      description: "Discover our premium collection of high-end vehicles for the discerning driver", 
      path: "/premium-luxury",
      video: "/videos/lux.mp4",
      accentColor: "#C9A77C", // Gold accent
      badge: "LUXURY"
    },
    { 
      title: "For The Tracks", 
      description: "Experience our high-performance models designed for racing enthusiasts", 
      path: "/trackspec",
      video: "/videos/m2cs.mp4",
      accentColor: "#E11D48", // Racing red accent
      badge: "PERFORMANCE"
    },
    { 
      title: "Explore Our All-Terrains", 
      description: "Discover our rugged yet luxurious vehicles for any adventure", 
      path: "/Allterains",
      video: "/videos/dune.mp4",
      accentColor: "#0D9488", // Adventure green accent
      badge: "ADVENTURE"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 font-sans overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-gray-800 to-gray-700"
            style={{
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              filter: 'blur(40px)',
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24">
        {/* Header section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-2"></div>
            <p className="text-sm text-gray-400 tracking-widest">EXCLUSIVE OFFERINGS</p>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">PREMIUM</span>
            <span className="font-serif italic mx-2 text-amber-200">Collections</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg font-light text-gray-400 leading-relaxed">
            Exquisite automotive excellence crafted for those who appreciate the finer details in engineering and design.
          </p>
        </div>
        
        {/* Cards grid */}
        <div className="flex flex-col lg:flex-row gap-10 justify-center items-stretch">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`cursor-pointer rounded-2xl p-8 flex flex-col w-full relative overflow-hidden group transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                width: index === 1 ? '38%' : '31%',
                background: 'linear-gradient(145deg, rgba(30,30,30,0.7), rgba(15,15,15,0.7))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)'
              }}
              onClick={() => navigate(section.path)}
            >
              {/* Accent glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${section.accentColor}20, transparent 70%)`
                }}
              ></div>
              
              {/* Badge */}
              <div 
                className="absolute top-6 right-6 z-20 px-3 py-1 rounded-full text-xs font-medium tracking-wider"
                style={{ 
                  backgroundColor: `${section.accentColor}20`,
                  color: section.accentColor,
                  border: `1px solid ${section.accentColor}30`
                }}
              >
                {section.badge}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Video container */}
                <div 
                  className="relative rounded-xl overflow-hidden transition-all duration-700 group-hover:scale-105 mb-8"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <div className="aspect-video overflow-hidden rounded-xl">
                    <video 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      autoPlay 
                      muted 
                      loop
                      playsInline
                    >
                      <source src={section.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent rounded-xl"></div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:animate-shine"></div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-medium mb-4 flex items-center relative z-20 text-gray-100 group-hover:text-white transition-colors duration-300">
                    {section.title}
                    <span className="ml-3 transition-all duration-300 group-hover:translate-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </h3>
                  
                  <p className="flex-grow mb-8 font-light text-gray-400 leading-relaxed relative z-20 transition-all duration-300 group-hover:text-gray-300">
                    {section.description}
                  </p>
                  
                  <button 
                    className="mt-auto px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium tracking-wide relative z-20 group-hover:bg-opacity-90 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(90deg, ${section.accentColor}20, ${section.accentColor}10)`,
                      border: `1px solid ${section.accentColor}20`,
                      color: section.accentColor
                    }}
                  >
                    <span>Explore Collection</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer text */}
        <div className="text-center mt-20 text-sm text-gray-500">
          <p>Exclusively Crafted Automotive Experiences • By Appointment Only</p>
        </div>
      </div>
      
      <Footer/>
      
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 1.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default LuxuryLines;