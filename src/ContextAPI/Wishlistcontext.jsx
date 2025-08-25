import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./Authcontext";
import { CarContext } from "./Carcontext";
import { wishlistApi } from "../Api";
import { toast } from "sonner";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const { cars } = useContext(CarContext);

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];

  });

  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const count = wishlist.length;
    setWishlistCount(count);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  async function addToWishlistDB(product) {
    try {
      const newWishlistItem = {
        userId: user.id,
        productId: product.id,
      };

      const response = await axios.post(wishlistApi, newWishlistItem);
      console.log("Added to backend wishlist:", response.data);
      return response.data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function removeFromWishlistDB(productId) {
  try {
    const response = await axios.delete(`${wishlistApi}/${productId}`);
    console.log("Removed from backend wishlist:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

  async function addToWishlist(product) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return toast.error("login-required");

      const existing = wishlist.find((item) => item.id === product.id);
      
      if (existing) {
        return toast.info("Already in wishlist");
      } else {
        const dbItem = await addToWishlistDB(product);
        const updatedWishlist = [
          ...wishlist,
          { ...product, wishlistItemId: dbItem.id },
        ];
        setWishlist(updatedWishlist);
        return toast.success("added-to-wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  }

  async function removeFromWishlist(productId) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return toast.error("login-required");

    const existing = wishlist.find((item) => item.id === productId);

    if (!existing) {
      return toast.info("Not in wishlist");
    } else {
      await removeFromWishlistDB(existing.wishlistItemId);
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);
      setWishlist(updatedWishlist);
      return toast.success("removed-from-wishlist");
    }
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    toast.error("Failed to remove from wishlist");
  }
}


  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        removeFromWishlistDB,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};