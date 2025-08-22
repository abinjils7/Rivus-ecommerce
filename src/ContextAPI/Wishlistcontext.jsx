import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Authcontext"; // import auth context
import { wishlistApi } from "../Api";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWishlist = async () => {
      if (!user || !user.id) {
        setWishlist([]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(`${wishlistApi}?userId=${user.id}`);
        setWishlist(res.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch wishlist");
        console.log("wishlist fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    getWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    if (!user || !user.id) {
      throw new Error("User must be logged in");
    }

    const already = wishlist.some(item => item.productId === product.id);
    if (already) {
      return { success: false, message: "Product already in wishlist" };
    }

    try {
      const newItem = {
        userId: user.id,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        addedAt: new Date().toISOString()
      };
      const res = await axios.post(wishlistApi, newItem);
      setWishlist(prev => [...prev, res.data]);
      return { success: true, message: "Added to wishlist", data: res.data };
    } catch (err) {
      console.log("add wishlist error", err);
      throw new Error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user || !user.id) {
      throw new Error("User must be logged in");
    }
    try {
      const found = wishlist.find(item =>
        item.productId === productId && item.userId === user.id
      );
      if (!found) {
        return { success: false, message: "Item not in wishlist" };
      }
      await axios.delete(`${wishlistApi}/${found.id}`);
      setWishlist(prev => prev.filter(item => item.id !== found.id));
      return { success: true, message: "Removed from wishlist" };
    } catch (err) {
      console.log("remove wishlist error", err);
      throw new Error("Failed to remove from wishlist");
    }
  };

  const removeFromWishlistByProductId = async (productId) => {
    if (!user || !user.id) {
      throw new Error("User must be logged in");
    }
    try {
      await axios.delete(`${wishlistApi}?userId=${user.id}&productId=${productId}`);
      setWishlist(prev => prev.filter(item => item.productId !== productId));
      return { success: true, message: "Removed from wishlist" };
    } catch (err) {
      console.log("remove wishlist error", err);
      throw new Error("Failed to remove from wishlist");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  const clearWishlist = async () => {
    if (!user || !user.id) {
      throw new Error("User must be logged in");
    }
    try {
      await axios.delete(`${wishlistApi}/clear?userId=${user.id}`);
      setWishlist([]);
      return { success: true, message: "Wishlist cleared" };
    } catch (err) {
      console.log("clear wishlist error", err);
      try {
        const toDelete = wishlist
          .filter(item => item.userId === user.id)
          .map(item => axios.delete(`${wishlistApi}/${item.id}`));
        await Promise.all(toDelete);
        setWishlist([]);
        return { success: true, message: "Wishlist cleared" };
      } catch (e) {
        console.log("fallback clear wishlist error", e);
        throw new Error("Failed to clear wishlist");
      }
    }
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    removeFromWishlistByProductId,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    loading,
    error
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
