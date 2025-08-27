import React, { useContext, useState, useEffect } from "react";
import { CarContext } from "../../ContextAPI/Carcontext";
import { ProductContext } from "../AdminControllers/ProductControlers";

export default function ManageProduct() {
  const { cars } = useContext(CarContext);
  const { deleteProductDB, editProductDB } = useContext(ProductContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "",
    hp: "",
    price: "",
    image: ""
  });

  const handleedit = (car) => {
    setSelectedCar(car);
    setFormData({
      name: car.name,
      brand: car.brand,
      type: car.type,
      hp: car.hp,
      price: car.price,
      image: car.image
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCar) {
      editProductDB(selectedCar.id, formData);
    }
    setModalOpen(false);
  };

  if (!cars)
    return <h1 className="text-center text-gray-500">No cars available</h1>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Stocks</h1>
      <ul className="space-y-3">
        {cars.map((car) => (
          <li
            key={car.id}
            className="flex items-center justify-between border border-gray-300 rounded-lg p-3 hover:shadow-sm transition"
          >
            <div className="flex items-center">
              <img src={car.image} alt={car.name} className="w-16 h-12 object-cover rounded mr-3" />
              <div>
                <p className="font-semibold">{car.name}</p>
                <p className="text-sm text-gray-600">
                  {car.brand} | {car.hp} HP | ₹{car.price}
                </p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleedit(car)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProductDB(car.id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Inline Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Car</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded"/>
              <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="w-full border p-2 rounded"/>
              <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" className="w-full border p-2 rounded"/>
              <input name="hp" value={formData.hp} onChange={handleChange} placeholder="HP" className="w-full border p-2 rounded"/>
              <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded"/>
              <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full border p-2 rounded"/>
              
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
