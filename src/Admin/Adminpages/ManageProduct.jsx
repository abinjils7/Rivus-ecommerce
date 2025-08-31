import React, { useContext, useEffect, useState, useRef } from "react";
import { CarContext } from "../../ContextAPI/Carcontext";
import { ProductContext } from "../AdminControllers/ProductControlers";
import { useNavigate } from "react-router-dom";

export default function ManageProduct() {
  const navigate = useNavigate();
  const { cars, fetchCars } = useContext(CarContext);
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
  const [loading, setLoading] = useState(true);
  const productsRef = useRef(null);

  const handleEdit = (car) => {
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

  const handleDelete = (car) => {
    deleteProductDB(car.id);
  };

  const goToAddCar = () => {
    navigate("/Addproducts");
  };

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCars().finally(() => {
      setLoading(false);
      // Smooth scroll to products after loading
      setTimeout(() => {
        scrollToProducts();
      }, 300);
    });
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-sm mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
          Manage Your Inventory
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          View, edit, and manage all your car listings in one place.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={goToAddCar}
            className="px-6 py-3 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Add New Car
          </button>
          <button
            onClick={scrollToProducts}
            className="px-6 py-3 bg-white text-black text-base font-medium rounded-lg border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            View Inventory
          </button>
        </div>
      </div>

      {/* Products Section with ref for scrolling */}
      <div ref={productsRef} className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          All Stocks ({cars.length})
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">Scroll to explore</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Cards with loader */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-50 rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-5">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-5"></div>
                    <div className="flex space-x-3">
                      <div className="h-9 bg-gray-200 rounded flex-1"></div>
                      <div className="h-9 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>
                </div>
              ))
          : cars.map((car, index) => (
              <div
                key={car.id}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-lg border border-gray-100 opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
              >
                {/* Image section */}
                <div className="relative w-full h-48 overflow-hidden flex items-center justify-center bg-gray-50 p-4">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="max-h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-3 right-3 bg-black text-white text-xs px-3 py-1.5 rounded-full shadow-md">
                    ₹{car.price.toLocaleString()}
                  </span>
                </div>

                {/* Content section */}
                <div className="p-5 flex flex-col justify-between min-h-[10rem]">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {car.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                      {car.brand} • {car.type}
                    </p>
                    <p className="text-xs text-gray-500 bg-gray-50 inline-block px-2 py-1 rounded-md">
                      {car.hp} HP
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-4 gap-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="flex-1 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 hover:scale-105 shadow-sm transition-all duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car)}
                      className="flex-1 px-3 py-2 bg-white text-gray-900 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 hover:scale-105 shadow-sm transition-all duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Back to top button */}
      {!loading && cars.length > 4 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 z-10"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-900">Edit Car Details</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "brand", "type", "hp", "price", "image"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter ${field}`}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition text-sm"
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}