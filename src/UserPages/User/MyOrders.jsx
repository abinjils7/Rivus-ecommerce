import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../ContextAPI/Authcontext";
import { Link } from "react-router-dom";
import { orderApi } from "../../Api";
import { WishlistContext } from "../../ContextAPI/WishlistContext";
import axios from "axios";

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const { cancelOrder } = useContext(WishlistContext);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`${orderApi}?userId=${user.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, );

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter(
          (order) =>
            (order.status || "").toLowerCase() === filterStatus.toLowerCase()
        );

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "delivered":
        return "bg-green-600 text-white";
      case "cancelled":
      case "canceled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-500">
            Loading your orders...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            You haven't placed any orders yet.
          </div>
          <Link
            to="/"
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 inline-block"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Status Filter Buttons */}
          <div className="mb-6 flex flex-wrap gap-3">
            <span className="font-medium">Filter by status:</span>
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "all" ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => setFilterStatus("delivered")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "delivered"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Delivered
            </button>
            <button
              onClick={() => setFilterStatus("cancelled")}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === "cancelled"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id || order._id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                  <div>
                    <div className="font-medium">
                      Order #{order.id || order.orderNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      Placed on {formatDate(order.orderDate || order.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {(order.status || "Unknown").charAt(0).toUpperCase() +
                        (order.status || "Unknown").slice(1)}
                    </span>
                    <div className="font-bold">
                      ₹{order.totalPrice || order.total}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id || item.productId}
                      className="flex py-4 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={
                            item.image ||
                            item.productImage ||
                            "/placeholder-image.jpg"
                          }
                          alt={item.brand || item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className="font-medium">
                          {item.brand || item.name}
                        </h4>
                        {item.model && (
                          <p className="text-sm text-gray-600">{item.model}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                        {item.size && (
                          <p className="text-sm text-gray-600">
                            Size: {item.size}
                          </p>
                        )}
                        {item.color && (
                          <p className="text-sm text-gray-600">
                            Color: {item.color}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{item.price * item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 flex justify-end space-x-3">
                  {(order.status || "").toLowerCase() === "pending" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">
                No orders found with the selected status.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyOrders;
