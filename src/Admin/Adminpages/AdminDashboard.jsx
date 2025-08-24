import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, Package, Users, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "./Card";
import { useAuth } from "../../ContextAPI/Authcontext";
import { use, useEffect, useState } from "react";
import { carApi, orderApi, UserAPI } from "../../Api";
import axios from "axios";

export default function AdminDashboard() {
  const [usercount, setUsercount] = useState(0);

  useEffect(() => {
    axios.get(`${UserAPI}`).then((res) => setUsercount(res.data.length));
  });

  const [totoalrevenue, setTotalrevenue] = useState(0);

  useEffect(() => {
    axios.get(`${orderApi}`).then((res) => {
      const total = res.data.reduce((sum, order) => sum + order.totalPrice, 0);
      setTotalrevenue(total);
    });
  });

  const [ordercount, setOrdercount] = useState(0);
  useEffect(() => {
    axios.get(`${orderApi}`).then((res) => {
      setOrdercount(res.data.length);
    });
  });

  const [stocks, setStocks] = useState(0);
  useEffect(() => {
    axios.get(`${carApi}`).then((res) => setStocks(res.data.length));
  });

  const sales = totoalrevenue / ordercount;
  return (
    <>
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <div className="w-64 h-screen bg-white border-r border-gray-200 p-6 shadow-sm">
          <h1 className="text-xl font-bold mb-8 text-black tracking-wider">RIVUS ADMIN</h1>
          <nav className="space-y-1">
            <Link
              to="/admin"
              className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 group"
            >
              <Home size={20} className="group-hover:text-black" /> 
              <span className="group-hover:text-black">Dashboard</span>
            </Link>
            <Link
              to="/products"
              className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 group"
            >
              <Package size={20} className="group-hover:text-black" /> 
              <span className="group-hover:text-black">Manage Products</span>
            </Link>
            <Link
              to="/users"
              className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 group"
            >
              <Users size={20} className="group-hover:text-black" /> 
              <span className="group-hover:text-black">Manage Users</span>
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 group"
            >
              <ShoppingCart size={20} className="group-hover:text-black" /> 
              <span className="group-hover:text-black">Orders</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <Card className="rounded-xl bg-white border border-gray-200 p-5 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <h2 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Users</h2>
                <p className="text-2xl font-bold text-black">{usercount}</p>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white border border-gray-200 p-5 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <h2 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Revenue</h2>
                <p className="text-2xl font-bold text-black">
                  ${totoalrevenue.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white border border-gray-200 p-5 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <h2 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Orders</h2>
                <p className="text-2xl font-bold text-black">{ordercount}</p>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white border border-gray-200 p-5 h-[300px] transition-all duration-300 hover:shadow-lg">
              <CardContent className="h-full flex flex-col justify-between p-0">
                <h2 className="text-gray-500 text-xs uppercase tracking-wider">
                  Total Sales ${sales.toLocaleString()}
                </h2>

                <div className="relative w-full h-40 border-t border-b border-gray-200">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    <div className="border-t border-gray-200"></div>
                    <div className="border-t border-gray-200"></div>
                    <div className="border-t border-gray-200"></div>
                  </div>

                  {/* Fake line using SVG */}
                  <svg className="absolute inset-0 w-full h-full">
                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      points="0,60 50,50 100,80 150,30 200,50 250,100 300,70"
                    />
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      points="0,65 50,55 100,75 150,20 200,60 250,90 300,65"
                    />
                  </svg>
                </div>

                {/* Labels */}
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white border border-gray-200 p-5 h-[300px] transition-all duration-300 hover:shadow-lg">
              <CardContent className="h-full flex flex-col justify-between p-0">
                <h2 className="text-gray-500 text-xs uppercase tracking-wider">
                  Overview
                </h2>

                {/* Fake Bar Chart */}
                <div className="flex items-end justify-between h-40 mt-4 space-x-1">
                  <div className="bg-gray-800 w-4 rounded-t h-12"></div>
                  <div className="bg-gray-800 w-4 rounded-t h-20"></div>
                  <div className="bg-gray-800 w-4 rounded-t h-8"></div>
                  <div className="bg-gray-800 w-4 rounded-t h-28"></div>
                  <div className="bg-gray-800 w-4 rounded-t h-16"></div>
                  <div className="bg-gray-800 w-4 rounded-t h-24"></div>
                  <div className="bg-gray-800 w-4 rounded-t h-10"></div>
                  <div className="bg-gray-800 w-4 rounded-t h-18"></div>
                </div>

                <p className="text-xs text-gray-500 text-right mt-2">
                  Last month
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white border border-gray-200 p-5 h-[500px] transition-all duration-300 hover:shadow-lg">
              <CardContent className="h-full flex flex-col justify-between p-0">
                <div>
                  <h2 className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                    Performance Overview
                  </h2>
                  <p className="text-2xl font-bold text-black mb-4">Q3 Progress</p>

                  {/* Progress Bars */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-1">Sales Target</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-800 h-2 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-1">75%</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-1">
                      Customer Growth
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-800 h-2 rounded-full w-2/3"></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-1">66%</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-1">Stock Updates</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-800 h-2 rounded-full w-1/2"></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-1">50%</p>
                  </div>
                </div>

                {/* Summary section */}
                <div className="bg-gray-100 rounded-lg p-4 mt-4">
                  <h3 className="text-gray-700 font-semibold mb-2 text-sm">Summary</h3>
                  <p className="text-xs text-gray-600">
                    This quarter is progressing well. Focus on inventory
                    efficiency to meet growing demand.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}