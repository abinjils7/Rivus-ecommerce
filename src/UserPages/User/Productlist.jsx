import React, { useContext, useState } from "react";
import Navbar from "../Common/Nav";
import { CarContext } from "../../ContextAPI/Carcontext";
import { CartContext } from "../../ContextAPI/Cartcontext";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import { User } from "lucide-react";
// import { Wishlistcontext } from "../../ContextAPI/Wishlistcontext";

function Productlist() {

  // const {addtoWishlist}=useContext(Wishlistcontext)
  const navigate = useNavigate();
  const { addToCart, cart } = useContext(CartContext);
  const { searchTerm, setSearchTerm, filteredCars, setFilterHP } =
    useContext(CarContext);

  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  };

  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <>
      <Navbar />
      <div className="mt-[110px] ml-[20px]">
        {/* Search and HP filter */}
        <div className="mb-5 ml-[150px] flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-52 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />

          <select
            onChange={(e) => setFilterHP(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All HP</option>
            <option value="300">300+ HP</option>
            <option value="500">500+ HP</option>
            <option value="700">700+ HP</option>
            <option value="1000">1000+ HP</option>
          </select>
        </div>

        {/* Cars List */}
        <div className="flex flex-wrap gap-y-6 gap-x-5 justify-start">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div
                key={car.id}
                className="border-2 border-gray-200 rounded-lg p-4 w-72 flex flex-col items-center text-center relative shadow hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded-md"
                />

                {/* Wishlist icon */}
                <button
                  onClick={() => addtoWishlist(car.id,User.id)}
                  className="absolute top-3 right-3 focus:outline-none"
                >
                  {wishlist.includes(car.id) ? (
                    <HeartSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartOutline className="w-6 h-6 text-gray-500" />
                  )}
                </button>

                <div className="mt-4">
                  <h3 className="font-semibold text-lg">{car.name}</h3>
                  <p className="text-gray-600">Brand: {car.brand}</p>
                  <p className="text-gray-600">Type: {car.type}</p>
                  <p className="font-bold mt-1">HP: {car.hp}</p>
                  <p className="font-bold mt-1">Price: ₹{car.price}</p>

                  {isInCart(car.id) ? (
                    <button
                      className="mt-3 px-4 py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 border border-gray-700"

                      onClick={() => navigate("/cart")}
                    >
                      View in Cart
                    </button>
                  ) : (
                    <button
                      className="mt-3 px-4 py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 border border-gray-700"
                      onClick={() => addToCart(car)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg ml-[150px]">No cars found.</p>
          )}
        </div>
      </div>
       <Footer/>
    </>
  );
}

export default Productlist;
