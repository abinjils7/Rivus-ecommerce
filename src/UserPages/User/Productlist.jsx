import React, { useContext } from "react";
import Navbar from "../Common/Nav";
import { CarContext } from "../../ContextAPI/Carcontext";
import { CartContext } from "../../ContextAPI/Cartcontext";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import { WishlistContext } from "../../ContextAPI/WishlistContext";

function Productlist() {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);
  const { searchTerm, setSearchTerm, filteredCars, setFilterHP } = useContext(CarContext);

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <>
      <Navbar />
      <div className="mt-[110px] px-4 pb-12 bg-white min-h-screen">
        {/* Search and Filter Section - Not Floating */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 bg-white py-6 px-4 rounded-lg border border-gray-100 shadow-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 pl-10"
            />
            <svg 
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="relative">
            <select
              onChange={(e) => setFilterHP(e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 appearance-none pl-3 pr-8 w-40"
            >
              <option value="">All HP</option>
              <option value="300">300+ HP</option>
              <option value="500">500+ HP</option>
              <option value="700">700+ HP</option>
              <option value="1000">1000+ HP</option>
            </select>
            <svg 
              className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Products Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredCars.length > 0 ? (
            filteredCars.map((car, index) => (
              <div
                key={car.id}
                className="border border-gray-100 rounded-xl p-5 flex flex-col items-center text-center relative bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => {
                    const inWishlist = wishlist.some(
                      (item) => item.productId === car.id
                    );
                    if (inWishlist) {
                      removeFromWishlist(car.id);
                    } else {
                      addToWishlist(car);
                    }
                  }}
                  className="absolute top-4 right-4 focus:outline-none z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                  aria-label={wishlist.some((item) => item.productId === car.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {wishlist.some((item) => item.productId === car.id) ? (
                    <HeartSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartOutline className="w-5 h-5 text-gray-400 hover:text-red-400" />
                  )}
                </button>

                {/* Product Image */}
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="w-full mt-2">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">{car.name}</h3>
                  
                  <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{car.brand}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{car.type}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-gray-700">
                      <span className="text-sm font-normal text-gray-500">HP: </span>
                      {car.hp}
                    </p>
                    <p className="font-bold text-gray-900 text-lg">
                      ₹{Number(car.price).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  {isInCart(car.id) ? (
                    <button
                      className="w-full py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                      onClick={() => navigate("/cart")}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      View in Cart
                    </button>
                  ) : (
                    <button
                      className="w-full py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                      onClick={() => addToCart(car)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-full py-16 col-span-4">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6" />
              </svg>
              <p className="text-gray-500 text-lg">No cars found matching your criteria</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          transform: translateY(20px);
          animation: fadeIn 0.6s ease forwards;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default Productlist;