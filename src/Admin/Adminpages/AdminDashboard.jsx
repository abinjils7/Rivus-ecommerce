import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Target,
  LogOut,
} from "lucide-react";
import { Card, CardContent } from "./Card";
import { useAuth } from "../../ContextAPI/Authcontext";
import { useEffect, useState } from "react";
import { carApi, orderApi, UserAPI } from "../../Api";
import axios from "axios";


export default function AdminDashboard() {

  const [user, setUser] = useState([]);
  const [totoalrevenue, setTotalrevenue] = useState(0);
  const [order, setOrder] = useState([]);
  const [stocks, setStocks] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    axios.get(`${UserAPI}`).then((res) => setUser(res.data));
  }, []);

  useEffect(() => {
    axios.get(`${orderApi}`).then((res) => {
      const total = res.data.reduce((sum, order) => sum + order.totalPrice, 0);
      setTotalrevenue(total);
    });
  }, []);
  useEffect(() => {
    axios.get(`${orderApi}`).then((res) => {
      setOrder(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`${carApi}`).then((res) => setStocks(res.data));
  }, []);
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
                  Total Users
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  {user.length}
                </p>
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
                  Total stock
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  {stocks.length}
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <TrendingUp size={20} className="text-blue-500"/>
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
                <p className="text-2xl font-bold text-gray-800">
                  {order.length}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <ShoppingCart size={20} className="text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-xl bg-white border border-gray-100 p-5 h-[400px] shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="h-full flex flex-col p-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-700 text-base font-semibold tracking-wide">
                  New Users
                </h2>
                <TrendingUp size={20} className="text-blue-500" />
              </div>

              <div className="flex-1 overflow-y-auto pr-1">
                {user.slice(1).map((u, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm py-2 px-2 rounded-md hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-medium text-gray-800">{u.name}</span>
                    <span className="text-gray-500">{u.email}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-xl bg-white border border-gray-100 p-5 h-[400px] shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="h-full flex flex-col p-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-700 text-base font-semibold tracking-wide">
                  New orders
                </h2>
                <TrendingUp size={20} className="text-blue-500" />
              </div>
              <div className="flex-1 overflow-y-auto pr-1">
                {order.map((u, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm py-2 px-2 rounded-md hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-medium text-gray-800">{u.id}</span>
                    <span className="text-gray-500">{u.status}</span>
                    <b>
                      <span className="text-gray-500">{u.totalPrice}</span>
                    </b>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
