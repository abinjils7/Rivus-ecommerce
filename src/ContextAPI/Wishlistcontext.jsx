import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Authcontext"; // make sure this provides user info
import { wishlistApi } from "../Api";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();  // get logged-in user
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist when user changes
  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`${wishlistApi}/${user.id}`)
        .then((res) => setWishlist(res.data))
        .catch((err) => console.error("Error fetching wishlist:", err));
    } else {
      setWishlist([]);
    }
  }, [user]);


  // Add item to wishlist
  const addToWishlist = async (item) => {
    const exists = wishlist.find((w) => w.productId === item.id);
    if (exists) return;

    const newItem = {
      userId: user.id,
      productId: item.id,
      ...item,
    };

    try {
      const res = await axios.post(`${wishlistApi}`, newItem);
      setWishlist([...wishlist, res.data]);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    const item = wishlist.find((w) => w.productId === productId);
    if (!item) return;

    try {
      await axios.delete(`${wishlistApi}/${item.id}`);
      setWishlist(wishlist.filter((w) => w.productId !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
