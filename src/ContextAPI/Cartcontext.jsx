import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
import { CarContext } from "./Carcontext";
import { cartApi } from "../Api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming AuthContext provides user info
  const { cars } = useContext(CarContext);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [totalQuantity, setTotalQuantity] = useState(0);

  // Recalculate quantity and persist cart
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart in DB (returns created item with id)
  async function addToCartDB(product) {
    try {
      const newCartItem = {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      };

      const response = await axios.post(cartApi, newCartItem);
      console.log("Added to backend cart:", response.data);
      return response.data; // contains DB-generated id
    } catch (error) {
      console.error(error);
    }
  }

  // Delete from DB by cartItemId
  async function deleteFromCartDB(cartItemId) {
    try {
      await axios.delete(`${cartApi}/${cartItemId}`);
      console.log("Deleted from backend cart:", cartItemId);
    } catch (error) {
      console.error(error);
    }
  }

  // Add to cart (sync with DB)
  async function addToCart(product) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return "login-required";

      const existing = cart.find((item) => item.id === product.id);
      let updatedCart;

      if (existing) {
        updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
        // Optional: PATCH quantity in backend if needed
        return "updated";
      } else {
        const dbItem = await addToCartDB(product); // returns {id, userId, productId, quantity}
        updatedCart = [
          ...cart,
          { ...product, quantity: 1, cartItemId: dbItem.id },
        ];
        setCart(updatedCart);
        return "added";
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  // Remove item completely (sync with DB)
  async function removeFromCart(productId) {
    try {
      const item = cart.find((item) => item.id === productId);
      if (!item) return "not-found";

      const updatedCart = cart.filter((cartItem) => cartItem.id !== productId);
      setCart(updatedCart);

      if (item.cartItemId) {
        await deleteFromCartDB(item.cartItemId); // delete using DB id
      }
      return "removed";
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  // Change quantity locally (+1 / -1)
  const updateQuantity = (productId, change) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updatedCart);
    // Optional: PATCH backend quantity if required
  };

  // Clear entire cart (local only)
  const clearCart = () => {
    setCart([]);
    // Optionally delete all items from backend if needed
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
