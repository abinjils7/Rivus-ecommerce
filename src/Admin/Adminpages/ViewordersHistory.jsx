import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { orderApi } from "../../Api";
import { OrderContext } from "../../Admin/AdminControllers/OrderController";
import { toast } from "sonner";

export default function ViewOrdersHistory() {
  const [statusChanges, setStatusChanges] = useState({});
  const { setOrderStatus, orders, fetchOrders } = useContext(OrderContext);
  const [loading, setLoading] = useState(true);
  const ordersRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchOrders().finally(() => {
      setLoading(false);
      // Smooth scroll to orders after loading
      setTimeout(() => {
        scrollToOrders();
      }, 300);
    });
  }, []);

  function handleDropdownChange(orderId, value) {
    setStatusChanges((prev) => ({ ...prev, [orderId]: value }));
  }

  async function handleUpdateClick(orderId) {
    const newStatus = statusChanges[orderId];
    if (!newStatus) return;
    await setOrderStatus(orderId, newStatus);
    toast.info("Order status updated successfully");
    fetchOrders();
  }

  const scrollToOrders = () => {
    if (ordersRef.current) {
      ordersRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-sm mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">
          Order Management
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Track and manage all customer orders, update delivery status, and monitor order history.
        </p>
        <button
          onClick={scrollToOrders}
          className="px-6 py-3 bg-black text-white text-base font-medium rounded-lg hover:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          View Orders
        </button>
      </div>

      {/* Orders Section with ref for scrolling */}
      <div ref={ordersRef} className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Order History ({orders.length})
        </h2>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">Scroll to explore</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-50 rounded-2xl shadow-sm overflow-hidden border border-gray-100 p-6"
            >
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="mb-4">
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="space-y-3">
                {Array(2).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-6"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl shadow-sm">
          <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-500 text-xl mb-2">No orders found</p>
          <p className="text-gray-400">Orders will appear here once customers make purchases</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 80}ms`, animationFillMode: "forwards" }}
            >
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order.id}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {order.totalQuantity} item{order.totalQuantity !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-sm mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{order.customer.name}</span>
                </p>
                <p className="text-gray-700 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">₹{order.totalPrice.toLocaleString()}</span>
                </p>
              </div>

              <div className="mb-4 flex flex-col gap-2">
                <label className="text-gray-700 text-sm font-medium">Delivery Status:</label>
                <div className="flex gap-2">
                  <select
                    value={statusChanges[order.id] ?? order.status ?? "pending"}
                    onChange={(e) => handleDropdownChange(order.id, e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                  <button
                    onClick={() => handleUpdateClick(order.id)}
                    className="bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items:</h4>
                <ul className="space-y-3">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                        />
                        <span className="text-gray-800 text-sm font-medium line-clamp-1">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded-full">
                        x {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to top button */}
      {!loading && orders.length > 3 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 z-10"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
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