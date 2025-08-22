import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../ContextAPI/Authcontext";
import { useContext } from "react";
import { CartContext } from "../../ContextAPI/Cartcontext";

export default function Nav() {
  const {cart}=useContext(CartContext)
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <nav className="flex space-x-6 text-gray-700 font-medium">
          <a href="/" className="hover:text-indigo-600 transition duration-300">
            Home
          </a>
          <a
            href="/about"
            className="hover:text-indigo-600 transition duration-300"
          >
            About Us
          </a>
          <a
            href="/marketplace"
            className="hover:text-indigo-600 transition duration-300"
          >
            Cars
          </a>
          {/* <a
            href="/contacts"
            className="hover:text-indigo-600 transition duration-300"
          >
            Contacts
          </a> */}
          <a
            href="/testdrive"
            className="hover:text-indigo-600 transition duration-300"
          >
            Book A Drive
          </a>
        </nav>

        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 tracking-wide">
            RIVUS
          </span>
          cars!
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative"></div>

          <a
            href="/wishlist"
            className="relative text-gray-700 hover:text-indigo-600 transition duration-300"
          >
            <HeartIcon className="h-6 w-6" />
          </a>

          <a
            href="/cart"
            className="relative text-gray-700 hover:text-indigo-600 transition duration-300"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                {cart.length}
              </span>
            )}
          </a>

          <div className="flex items-center ml-auto">
            {user ? (
              <>
                <span className="mr-4">Hello, {user.name || user.email}</span>
                <button
                  onClick={logout}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
