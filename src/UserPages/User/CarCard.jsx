import React, { useEffect, useState } from "react";
import axios from "axios";
import { carApi } from "../../Api";

// Single car card component
function CarCard({ car }) {
  return (
    <div className="min-w-[180px] bg-white rounded-lg shadow-md p-3 mr-3 flex-shrink-0">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-24 object-cover rounded-md mb-2"
      />
      <h3 className="text-sm font-semibold text-gray-800 truncate">{car.name}</h3>
      <p className="text-xs text-gray-600 truncate">{car.description}</p>
      <p className="mt-1 font-bold text-purple-600">${car.price}</p>
    </div>
  );
}

export default function CarCards() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get(carApi);
        setCars(response.data.cars || response.data);
      } catch (error) {
        console.error("Failed to load cars:", error.message);
      }
    }
    fetchCars();
  }, []);

  return (
    <section className="bg-gray-100 py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Latest Cars
      </h2>

      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto pb-4">
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <p className="text-gray-500 text-lg">Loading cars...</p>
        )}
      </div>
    </section>
  );
}
