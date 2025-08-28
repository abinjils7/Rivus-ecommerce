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
import WishlistPage from "../UserPages/User/Wishlist";
import { useAuth } from "../ContextAPI/Authcontext";
import AdminDashboard from "../Admin/Adminpages/AdminDashboard";
import AddProducts from "../Admin/Adminpages/AddProducts";
import ManageProduct from "../Admin/Adminpages/ManageProduct";
import ViewordersHistory from "../Admin/Adminpages/ViewordersHistory";
import ManageUsers from "../Admin/Adminpages/ManageUsers";
import ProtectedRoute from "./ProtectedRoute";

const Productlist = React.lazy(() => import("../UserPages/User/Productlist"));

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute adminOnly={false}><Home1/></ProtectedRoute>} />

      {user === null && (
        <>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </>
      )}

      <Route path="/marketplace" element={<Suspense fallback={<LoadingSpinner />}><Productlist /></Suspense>} />
      <Route path="/cars" element={<Suspense fallback={<LoadingSpinner />}><Productlist /></Suspense>} />
      <Route path="/Allterains" element={<Allterrains />} />
      <Route path="/colections" element={<LexuryLines />} />
      <Route path="/trackspec" element={<Tracs />} />
      <Route path="/premium-luxury" element={<Luxs />} />
      <Route path="/testdrive" element={<TestDrive />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orderpage" element={<Orderpage />} />
      <Route path="/ordhistory" element={<MyOrders />} />
      <Route path="/wishlist" element={<WishlistPage />} />

      ------------------------ADMIN-----------------------------------------------------------------------


      
      <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/Addproducts" element={<ProtectedRoute adminOnly={true}><AddProducts /></ProtectedRoute>} />
      <Route path="/manageproducts" element={<ProtectedRoute adminOnly={true}><ManageProduct /></ProtectedRoute>} />
      <Route path="/ViewordersHistory" element={<ProtectedRoute adminOnly={true}><ViewordersHistory /></ProtectedRoute>} />
      <Route path="/Manageusers" element={<ProtectedRoute adminOnly={true}><ManageUsers /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;
