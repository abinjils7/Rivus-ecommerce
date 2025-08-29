import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useAuth } from "./Authcontext";
import { CarContext } from "./Carcontext";
import { cartApi } from "../Api";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { cars } = useContext(CarContext);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(`${cartApi}?userId=${user.id}`);
        const cartWithDetails = res.data
          .map((item) => {
            const product = cars.find((car) => car.id === item.productId);
            return product
              ? { ...product, quantity: item.quantity, cartItemId: item.id }
              : null;
          })
          .filter(Boolean);
        setCart(cartWithDetails);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        toast.error("Could not load cart");
      }
    };

    fetchCart();
  }, [user, cars]);

  const addToCart = async (product) => {
    if (!user?.id) return toast.error("Login required");

    if (cart.some((item) => item.id === product.id)) {
     
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      return;
    }

    try {
      const res = await axios.post(cartApi, {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      });
      setCart((prev) => [...prev, { ...product, quantity: 1, cartItemId: res.data.id }]);
      toast.success("Added to cart");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Could not add to cart");
    }
  };

  const removeFromCart = async (productId) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;

    try {
      if (item.cartItemId) await axios.delete(`${cartApi}/${item.cartItemId}`);
      setCart((prev) => prev.filter((i) => i.id !== productId));
      toast.success("Removed from cart");
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      toast.error("Could not remove from cart");
    }
  };

  const updateQuantity = (productId, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const clearCart = async () => {
    try {
      await Promise.all(cart.map((item) => item.cartItemId && axios.delete(`${cartApi}/${item.cartItemId}`)));
      setCart([]);
      toast.success("Cart cleared");
    } catch (err) {
      console.error("Failed to clear cart:", err);
      toast.error("Could not clear cart");
    }
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, totalQuantity, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
