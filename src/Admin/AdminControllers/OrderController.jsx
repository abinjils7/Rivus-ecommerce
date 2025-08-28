import axios from "axios";
import React, { createContext, useState } from "react";
import { orderApi } from "../../Api";

export const OrderContext = createContext();

export default function OrderController({ children }) {
  async function setOrderStatus(orderId, newStatus) {
    try {
      await axios.patch(`${orderApi}/${orderId}`, { status: newStatus });
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  }

  const [orders, setOrders] = useState([]);
  async function fetchOrders() {
    try {
      const res = await axios.get(orderApi);
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  }

  

  return (
    <OrderContext.Provider value={{ setOrderStatus, orders, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
}
