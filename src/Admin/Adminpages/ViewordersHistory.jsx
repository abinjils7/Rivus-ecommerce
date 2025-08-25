import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { orderApi } from "../../Api";

export default function ViewordersHistory() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      await axios.get(orderApi).then((res) => setOrders(res.data));
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);
  console.log("from orderpage ", orders);
  return (
    <div className="max-w-3xl mx-auto mt-6">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>

  <div className="space-y-4">
    {orders.map(order => (
      <div 
        key={order.id} 
        className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <h3 className="text-lg font-semibold text-gray-700">Order #{order.id}</h3>
          <span className="text-sm text-gray-500">
            {order.totalQuantity} items
          </span>
        </div>

        <p className="text-gray-600 mb-1">
          <span className="font-medium">Customer:</span> {order.customer.name}
        </p>
        <p className="text-gray-600 mb-3">
          <span className="font-medium">Total Price:</span> ₹{order.totalPrice.toLocaleString()}
        </p>

        <ul className="space-y-1 text-sm text-gray-700">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between border-t pt-1">
              <span>{item.name}</span>
              <span>x {item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</div>

  );
}
