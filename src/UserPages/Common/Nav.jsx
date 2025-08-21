import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../ContextAPI/Authcontext";

export default function Nav() {
  const { user, logout } = useAuth(); // include logout
  console.log(user);
  

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Left: Navigation links */}
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
          <a
            href="/contacts"
            className="hover:text-indigo-600 transition duration-300"
          >
            Contacts
          </a>
          <a
            href="/testdrive"
            className="hover:text-indigo-600 transition duration-300"
          >
            Book A Drive
          </a>
        </nav>

        {/* Center: Logo */}
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 tracking-wide">
            RIVUS
          </span>
          cars!
        </div>

        {/* Right: Search + Wishlist + Cart + Sign In/Logout */}
        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-1 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Wishlist */}
          <a
            href="/wishlist"
            className="relative text-gray-700 hover:text-indigo-600 transition duration-300"
          >
            <HeartIcon className="h-6 w-6" />
          </a>

          {/* Cart */}
          <a
            href="/cart"
            className="relative text-gray-700 hover:text-indigo-600 transition duration-300"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </a>

          {/* Sign In or Logout */}
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
