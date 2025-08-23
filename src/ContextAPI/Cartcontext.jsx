import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
import { CarContext } from "./Carcontext";
import { cartApi } from "../Api";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // const navigate = useNavigate();
  const { user } = useAuth();
  const { cars } = useContext(CarContext);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);//
    setTotalQuantity(total);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  async function addToCartDB(product) {
    try {
      const newCartItem = {
        userId: user.id,
        productId: product.id,
        quantity: 1,
      };

      const response = await axios.post(cartApi, newCartItem);
      console.log("Added to backend cart:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFromCartDB(cartItemId) {
    try {
      await axios.delete(`${cartApi}/${cartItemId}`);
      console.log("Deleted from backend cart:", cartItemId);
    } catch (error) {
      console.error(error);
    }
  }

  async function addToCart(product) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return toast.error("login-required");

      const existing = cart.find((item) => item.id === product.id);
      let updatedCart; //just creting a variable

      if (existing) {
        updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
        return "updated";


      } else {
        const dbItem = await addToCartDB(product);
        updatedCart = [
          ...cart,
          { ...product, quantity: 1, cartItemId: dbItem.id },
        ];
        setCart(updatedCart);
        return toast.success("added-to-cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function removeFromCart(productId) {
    try {
      // const item = cart.find((item) => item.id === productId);
      // if (!item) return "not-found";

      const updatedCart = cart.filter((cartItem) => cartItem.id !== productId);
      setCart(updatedCart);

      if (item.cartItemId) {
        await deleteFromCartDB(item.cartItemId);
      }
      return "removed";
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  const updateQuantity = (productId, change) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updatedCart);
  };

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
