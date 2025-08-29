import React, { useContext, useState } from "react";
import { CarContext } from "../../ContextAPI/Carcontext";
import { ProductContext } from "../AdminControllers/ProductControlers";
import { useNavigate } from "react-router-dom";
import Nav from "../../UserPages/Common/Nav";

export default function ManageProduct() {
  const navigate=useNavigate()
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
    image: "",
  });

  const handleedit = (car) => {
    setSelectedCar(car);
    setFormData({
      name: car.name,
      brand: car.brand,
      type: car.type,
      hp: car.hp,
      price: car.price,
      image: car.image,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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


  const nav=()=>{
    navigate("/Addproducts")
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Stocks</h1>
      <button onClick={nav}    className="absolute top-6 right-6 px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 shadow transition">
        Add Car
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border border-gray-300 rounded-xl p-6 flex flex-col justify-between w-full h-64 hover:shadow-xl hover:-translate-y-1 transition-transform"
          >
            <div className="flex items-center">
              <img
                src={car.image}
                alt={car.name}
                className="w-24 h-16 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <p className="font-semibold text-lg truncate">{car.name}</p>
                <p className="text-sm text-gray-600 truncate">
                  {car.brand} | {car.hp} HP | ₹{car.price}
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => handleedit(car)}
                className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 hover:scale-105 shadow transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProductDB(car.id)}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 hover:scale-105 shadow transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Car</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full border p-2 rounded"
              />
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Type"
                className="w-full border p-2 rounded"
              />
              <input
                name="hp"
                value={formData.hp}
                onChange={handleChange}
                placeholder="HP"
                className="w-full border p-2 rounded"
              />
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border p-2 rounded"
              />
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     
    </div>
  );
}
