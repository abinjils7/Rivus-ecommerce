import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "../UserPages/Auth/Register";
import Login from "../UserPages/Auth/Login";
import Home1 from "../UserPages/User/Home1";
import Productlist from "../UserPages/User/Productlist";
import Allterrains from "../UserPages/User/Allterrains";
import LexuryLines from "../UserPages/User/LexuryLines";
import Hypersports from "../UserPages/User/Hypersports";
import TrackSpecs from "../UserPages/User/TrackSpecs";
import NewlyLaunched from "../UserPages/User/NewlyLaunched";
import TestDrive from "../UserPages/User/TestDrive";
import About from "../UserPages/User/About";
import Cart from "../UserPages/User/Cart";
import Orderpage from "../UserPages/User/Orderpage";
import MyOrders from "../UserPages/User/MyOrders";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/marketplace" element={<Productlist />} />
        <Route path="/cars" element={<Productlist />} />
        <Route path="/Allterains" element={<Allterrains />} />
        <Route path="/lexury" element={<LexuryLines />} />
        <Route path="/hypersport" element={<Hypersports />} />
        <Route path="/trackspec" element={<TrackSpecs />} />
        <Route path="/newlylaunched" element={<NewlyLaunched />} />
        <Route path="/testdrive" element={<TestDrive/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/orderpage" element={<Orderpage/>}/>
        <Route path="/ordhistory" element={<MyOrders/>}/>

        




      </Routes>
    </div>
  );
}

export default AppRoutes;
