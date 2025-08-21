import axios from "axios";
import { Axis3D } from "lucide-react";
import { createContext, useState, useEffect, use, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
import { CarContext } from "./Carcontext";
import { cartApi } from "../Api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming you have an AuthContext to get user info
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

  //add to cart database
async function addToCartDB(product) {
  try {
    const newCartItem = {
      userId: user.id,
      productId: product.id,
      quantity: 1
    };
    // POST to backend (assuming JSON server running on localhost:3001)
    await axios.post(cartApi, newCartItem);
    console.log("Added to backend cart:", newCartItem);
  } catch (error) {
    console.error(error);
  }
}


  // Add item to cart

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
      await addToCartDB(product); // <-- Call here
      return "updated";
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      await addToCartDB(product); // <-- Call here
      return "added";
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}
// ...existing code...

  // Remove an item completely
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  // Change quantity (+1 or -1)
  const updateQuantity = (productId, change) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updatedCart);
  };

  // Clear entire cart (e.g. after checkout)
  const clearCart = () => {
    setCart([]);
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
