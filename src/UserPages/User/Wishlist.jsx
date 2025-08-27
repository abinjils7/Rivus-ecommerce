import React, { useContext } from "react";
import { WishlistContext } from "../../ContextAPI/WishlistContext";

function WishlistPage() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlist.length ? (
        wishlist.map((item) => (
          <div
            key={item.id} // wishlist row id
            className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm flex gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">Type: {item.type}</p>
              <p className="text-gray-700">Price: ₹{item.price}</p>
              <p className="text-gray-700">Horsepower: {item.hp} HP</p>

              <button
                onClick={() => removeFromWishlist(item.productId)}
                className="mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Your wishlist is currently empty.</p>
      )}
    </div>
  );
}

export default WishlistPage;
