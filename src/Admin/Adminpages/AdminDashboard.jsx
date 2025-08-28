import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  Target,
  LogOut,
} from "lucide-react";
import { Card, CardContent } from "./Card";
import { useAuth } from "../../ContextAPI/Authcontext";
import { useEffect, useState } from "react";
import { carApi, orderApi, UserAPI } from "../../Api";
import axios from "axios";
import Footer from "../../UserPages/Common/Footer";

export default function AdminDashboard() {
  const [usercount, setUsercount] = useState(0);
  const [totoalrevenue, setTotalrevenue] = useState(0);
  const [ordercount, setOrdercount] = useState(0);
  const [stocks, setStocks] = useState(0);
  const { logout } = useAuth();
  // const [inventryValue,setInventryValue]=useState()

  useEffect(() => {
    axios.get(`${UserAPI}`).then((res) => setUsercount(res.data.length));
  }, []);
  useEffect(() => {
    axios.get(`${orderApi}`).then((res) => {
      const total = res.data.reduce((sum, order) => sum + order.totalPrice, 0);
      setTotalrevenue(total);
    });
  }, []);
  useEffect(() => {
    axios.get(`${orderApi}`).then((res) => {
      setOrdercount(res.data.length);
    });
  }, []);
  useEffect(() => {
    axios.get(`${carApi}`).then((res) => setStocks(res.data.length));
  }, []);

  const sales = totoalrevenue / ordercount;

  useEffect(() => {
    axios.get(`${carApi}`).then((res) => setInventryValue(res.data.price));
  });

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 h-screen bg-white border-r border-gray-100 p-6 shadow-sm flex flex-col">
        <h1 className="text-xl font-bold mb-8 text-gray-800 tracking-wider">
          <b className="text-3xl">RIVUS</b>
          <span>ADMIN</span>
        </h1>
        <nav className="space-y-1">
          <Link
            to="/manageproducts"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-500 hover:bg-gray-50 transition group font-medium"
          >
            <Package size={20} className="group-hover:text-gray-800" />
            <span className="group-hover:text-gray-800">Manage Products</span>
          </Link>
          <Link
            to="/manageusers"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-500 hover:bg-gray-50 transition group font-medium"
          >
            <Users size={20} className="group-hover:text-gray-800" />
            <span className="group-hover:text-gray-800">Manage Users</span>
          </Link>
          <Link
            to="/ViewordersHistory"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-500 hover:bg-gray-50 transition group font-medium"
          >
            <ShoppingCart size={20} className="group-hover:text-gray-800" />
            <span className="group-hover:text-gray-800">Orders</span>
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-100">
          <button
            onClick={logout}
            className="absolute top-4 right-4 p-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-0 flex items-start justify-between">
              <div>
                <h2 className="text-gray-500 text-xs uppercase mb-2 font-medium">
                  Users
                </h2>
                <p className="text-2xl font-bold text-gray-800">{usercount}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Users size={20} className="text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-0 flex items-start justify-between">
              <div>
                <h2 className="text-gray-500 text-xs uppercase mb-2 font-medium">
                  Revenue
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  ${totoalrevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <TrendingUp size={20} className="text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-0 flex items-start justify-between">
              <div>
                <h2 className="text-gray-500 text-xs uppercase mb-2 font-medium">
                  Orders
                </h2>
                <p className="text-2xl font-bold text-gray-800">{ordercount}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <ShoppingCart size={20} className="text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-xl bg-white border border-gray-100 p-5 h-[300px] shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="h-full flex flex-col justify-between p-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-500 text-sm uppercase font-medium">
                  Total inventory value ${sales.toLocaleString()}
                </h2>
                <TrendingUp size={18} className="text-blue-500" />
              </div>
              <div className="relative w-full h-40 border-t border-b border-gray-100">
                <div className="absolute inset-0 flex flex-col justify-between">
                  <div className="border-t border-gray-100"></div>
                  <div className="border-t border-gray-100"></div>
                  <div className="border-t border-gray-100"></div>
                </div>
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
              <div className="flex justify-between text-xs text-gray-500 mt-4 font-medium">
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

          <Card className="rounded-xl bg-white border border-gray-100 p-5 h-[300px] shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="h-full flex flex-col justify-between p-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-500 text-sm uppercase font-medium">
                  Overview
                </h2>
                <BarChart3 size={18} className="text-purple-500" />
              </div>
              <div className="flex items-end justify-between h-40 mt-4 space-x-1">
                <div className="bg-gray-800 w-4 rounded-t h-12"></div>
                <div className="bg-gray-800 w-4 rounded-t h-20"></div>
                <div className="bg-gray-800 w-4 rounded-t h-8"></div>
                <div className="bg-gray-800 w-4 rounded-t h-28"></div>
                <div className="bg-gray-800 w-4 rounded-t h-16"></div>
                <div className="bg-gray-800 w-4 rounded-t h-24"></div>
                <div className="bg-gray-800 w-4 rounded-t h-10"></div>
              </div>
              <p className="text-xs text-gray-500 text-right mt-4 font-medium">
                Last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-gray-500 text-sm uppercase font-medium">
                  Performance Overview
                </h2>
                <p className="text-xl font-bold text-gray-800">Q3 Progress</p>
              </div>
              <Target size={20} className="text-gray-600" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-3 font-medium">
                  Sales Target
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-right text-sm text-gray-600 font-medium">
                  75%
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-3 font-medium">
                  Customer Growth
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-green-500 h-2 rounded-full w-2/3"></div>
                </div>
                <p className="text-right text-sm text-gray-600 font-medium">
                  66%
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-3 font-medium">
                  Stock Updates{stocks}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-purple-500 h-2 rounded-full w-1/2"></div>
                </div>
                <p className="text-right text-sm text-gray-600 font-medium">
                  50%
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <h3 className="text-gray-700 font-semibold mb-2 text-sm">
                Summary
              </h3>
              <p className="text-sm text-gray-600">
                This quarter is progressing well. Focus on inventory efficiency
                to meet growing demand.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
