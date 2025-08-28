import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { orderApi } from "../../Api";
import { OrderContext } from "../../Admin/AdminControllers/OrderController";
import { toast } from "sonner";

export default function ViewOrdersHistory() {
  const [statusChanges, setStatusChanges] = useState({}); // store selected status per order
  const { setOrderStatus,orders,fetchOrders } = useContext(OrderContext);
  

  useEffect(() => {
    fetchOrders();
  }, []);

  function handleDropdownChange(orderId, value) {
    setStatusChanges((prev) => ({ ...prev, [orderId]: value }));
  }

  async function handleUpdateClick(orderId) {
    const newStatus = statusChanges[orderId];
    if (!newStatus) return; 
    await setOrderStatus(orderId, newStatus);
    toast.info("updated");
    fetchOrders();
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Order ID #{order.id}
                </h3>
                <span className="text-sm text-gray-500">
                  {order.totalQuantity} items
                </span>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 text-base mb-2">
                  <strong>Customer:</strong> {order.customer.name}
                </p>
                <p className="text-gray-700 text-base">
                  <strong>Total Price:</strong> ₹
                  {order.totalPrice.toLocaleString()}
                </p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <label className="text-gray-700">Delivery Status:</label>
                <select
                  value={statusChanges[order.id] ?? order.status ?? "pending"}
                  onChange={(e) =>
                    handleDropdownChange(order.id, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  onClick={() => handleUpdateClick(order.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>

              <ul className="mt-2 border-t pt-3 space-y-3">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg border"
                      />
                      <span className="text-gray-800 text-sm font-medium">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      x {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
