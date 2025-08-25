import React, { useContext } from "react";
import { CarContext } from "../../ContextAPI/Carcontext";
import { ProductContext } from "../AdminControllers/ProductControlers";


export default function ManageProduct() {
  const { cars } = useContext(CarContext);
  const {deleteProductDB}=useContext(ProductContext)

  if (!cars) return <h1 className="text-center text-gray-500">fjkhdjfkhsaldfasd</h1>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Stocks</h1>
      <ul className="space-y-3">
        {cars.map((car) => {
            return(
          <li 
            key={car.id} 
            className="flex items-center justify-between border border-gray-300 rounded-lg p-3 hover:shadow-sm transition"
          >
            <div className="flex items-center">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-16 h-12 object-cover rounded mr-3" 
              />
              <div>
                <p className="font-semibold">{car.name}</p>
                <p className="text-sm text-gray-600">
                  {car.brand} | {car.hp} HP | ₹{car.price}
                </p>
              </div>
            </div>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition">
                Edit
              </button>
              <button onClick={()=>deleteProductDB(car.id)}className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </li>
        )})}
      </ul>
    </div>
  );
}
