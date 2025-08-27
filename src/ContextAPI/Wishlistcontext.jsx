import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Authcontext";
import { wishlistApi } from "../Api";
import { toast } from "sonner";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user?.id) {
      setWishlist([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${wishlistApi}?userId=${user.id}`);
        setWishlist(res.data);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
        toast.error("Could not load wishlist");
      }
    };

    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user?.id) return toast.error("Login required");

 if (wishlist.some((item) => item.productId === product.id)) {
      return toast.info("Already in wishlist");
    }

    try {
      const res = await axios.post(wishlistApi, {
        userId: user.id,
        productId: product.id,
        name: product.name,
        type: product.type,
        price: product.price,
        hp: product.hp,
        image: product.image,
      });

      setWishlist((prev) => [...prev, res.data]);
      toast.success("Added to wishlist");
    } catch (err) {
      console.error("Add failed:", err);
      toast.error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user?.id) return toast.error("Login required");

    const existing = wishlist.find((item) => item.productId === productId);
    if (!existing) return toast.info("Not in wishlist");

    try {
      await axios.delete(`${wishlistApi}/${existing.id}`);
      setWishlist((prev) => prev.filter((item) => item.productId !== productId));
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error("Remove failed:", err);
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
