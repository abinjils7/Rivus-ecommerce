import axios from "axios";
import React, { createContext } from "react";
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

  return (
    <OrderContext.Provider value={{ setOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}
