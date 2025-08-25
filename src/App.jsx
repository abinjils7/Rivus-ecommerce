import { useState } from "react";
import Home1 from "./UserPages/User/Home1";
import "./index.css";
import AppRoutes from "./Approutes/AppRoutes";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./ContextAPI/Authcontext";
import { CarProvider } from "./ContextAPI/Carcontext";
import { CartProvider } from "./ContextAPI/Cartcontext";
import ToastContext from "./ContextAPI/ToastContext";
import { WishlistProvider } from "./ContextAPI/WishlistContext";
import ProductControlers from "./Admin/AdminControllers/ProductControlers";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CarProvider>
            <CartProvider>
              <ToastContext>
                <WishlistProvider>
                  <ProductControlers>
                    <AppRoutes />
                  </ProductControlers>
                </WishlistProvider>
              </ToastContext>
            </CartProvider>
          </CarProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
