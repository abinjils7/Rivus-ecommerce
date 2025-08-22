import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../UserPages/Auth/Register";
import Login from "../UserPages/Auth/Login";
import Home1 from "../UserPages/User/Home1";
import Allterrains from "../UserPages/User/Allterrains";
import LexuryLines from "../UserPages/User/LexuryLines";
import TestDrive from "../UserPages/User/TestDrive";
import About from "../UserPages/User/About";
import Cart from "../UserPages/User/Cart";
import Orderpage from "../UserPages/User/Orderpage";
import MyOrders from "../UserPages/User/MyOrders";
import Tracs from "../UserPages/User/Tracs";
import Luxs from "../UserPages/User/Luxs";
import LoadingSpinner from "../UserPages/Common/Loadingspinner";
import Wishlist from "../UserPages/User/Wishlist";
const Productlist = React.lazy(() => import("../UserPages/User/Productlist"));

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/marketplace"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Productlist />
            </Suspense>
          }
        />
        <Route
          path="/cars"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Productlist />
            </Suspense>
          }
        />

        <Route path="/Allterains" element={<Allterrains />} />
        <Route path="/colections" element={<LexuryLines />} />
        <Route path="/trackspec" element={<Tracs />} />
        <Route path="/premium-luxury" element={<Luxs />} />
        <Route path="/testdrive" element={<TestDrive />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderpage" element={<Orderpage />} />
        <Route path="/ordhistory" element={<MyOrders />} />
        <Route path="/wishlist" element={<Wishlist/>} />

      </Routes>
    </div>
  );
}

export default AppRoutes;
