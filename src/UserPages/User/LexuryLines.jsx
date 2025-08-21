import React from "react";
import { useNavigate } from "react-router-dom";

function LexuryLines() {
  const navigate = useNavigate();

  const sections = [
    { 
      title: "Order Details", 
      description: "View all order-related information and manage your purchases", 
      path: "/section1",
      video: "/videos/order-demo.mp4"
    },
    { 
      title: "Payment Details", 
      description: "Check payment methods, transaction history, and billing status", 
      path: "/section2",
      video: "/videos/payment-demo.mp4"
    },
    { 
      title: "Shipping Details", 
      description: "Track and manage your delivery with real-time updates", 
      path: "/section3",
      video: "/videos/shipping-demo.mp4"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto pt-12">
        <h2 className="text-4xl font-light text-center mb-4 tracking-tight">Dashboard Sections</h2>
        <p className="text-center text-gray-600 mb-12 font-light tracking-wide">Exclusive access to your luxury experience</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - 30% width */}
          <div 
            className="cursor-pointer rounded-lg bg-white p-6 flex flex-col w-full lg:w-[30%] border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
            onClick={() => navigate(sections[0].path)}
          >
            <div className="aspect-video mb-6 overflow-hidden rounded-md relative">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop
                playsInline
              >
                <source src={sections[0].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-3 left-4 flex items-center">
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                <span className="text-xs font-light text-white bg-black/30 px-2 py-1 rounded">LIVE</span>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-4 flex items-center">
              {sections[0].title}
              <span className="ml-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </h3>
            <p className="text-gray-600 flex-grow mb-6 font-light text-sm leading-relaxed">{sections[0].description}</p>
            <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm font-light tracking-wide shadow-sm">
              View Details
            </button>
          </div>

          {/* Center Panel - 40% width */}
          <div 
            className="cursor-pointer rounded-lg bg-white p-6 flex flex-col w-full lg:w-[40%] border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
            onClick={() => navigate(sections[1].path)}
          >
            <div className="aspect-video mb-6 overflow-hidden rounded-md relative">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop
                playsInline
              >
                <source src={sections[1].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-3 right-4">
                <span className="text-xs bg-white/90 px-2 py-1 rounded-full font-light text-gray-700">PREMIUM</span>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-4 flex items-center">
              {sections[1].title}
              <span className="ml-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </span>
            </h3>
            <p className="text-gray-600 flex-grow mb-6 font-light text-sm leading-relaxed">{sections[1].description}</p>
            <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm font-light tracking-wide shadow-sm">
              View Details
            </button>
          </div>

          {/* Right Panel - 30% width */}
          <div 
            className="cursor-pointer rounded-lg bg-white p-6 flex flex-col w-full lg:w-[30%] border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden"
            onClick={() => navigate(sections[2].path)}
          >
            <div className="aspect-video mb-6 overflow-hidden rounded-md relative">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop
                playsInline
              >
                <source src={sections[2].video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-3 left-4">
                <span className="text-xs bg-white/90 px-2 py-1 rounded-full font-light text-gray-700">EXPRESS</span>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-4 flex items-center">
              {sections[2].title}
              <span className="ml-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1v-3a1 1 0 00-.293-.707l-4-4A1 1 0 0016 5H3a1 1 0 00-1 1zm14.707 4L17 7.707V8h-1a1 1 0 00-1 1v2a1 1 0 001 1h1v.293L17.707 12H17v-1a1 1 0 00-1-1h-2a1 1 0 00-1 1v1h-.293L17.707 8z" />
                </svg>
              </span>
            </h3>
            <p className="text-gray-600 flex-grow mb-6 font-light text-sm leading-relaxed">{sections[2].description}</p>
            <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm font-light tracking-wide shadow-sm">
              View Details
            </button>
          </div>
        </div>

        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Luxury Lines © 2023 | Exclusively Crafted Experiences</p>
        </div>
      </div>
    </div>
  );
}

export default LexuryLines;