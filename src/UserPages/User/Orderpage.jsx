import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../ContextAPI/Cartcontext";
import { useAuth } from "../../ContextAPI/Authcontext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { orderApi } from "../../Api";

function OrderPage() {
  const { cart, totalQuantity, clearCart } = useContext(CartContext);
  const { user } = useAuth(); // Fixed: useAuth is a function
  const navigate = useNavigate();
  
  // State for order processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  
  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .required("City is required"),
    state: Yup.string()
      .min(2, "State must be at least 2 characters")
      .required("State is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
    paymentMethod: Yup.string()
      .required("Payment method is required")
  });
  
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      paymentMethod: "credit-card"
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsProcessing(true);
      
      try {
        // Prepare order data with userId
        const orderData = {
          customer: values,
          items: cart,
          totalQuantity,
          totalPrice,
          orderDate: new Date().toISOString(),
          status: "pending",
          userId: user ? user.id : null // Add userId to order data
        };
        
        // Save to localStorage
        localStorage.setItem("currentOrder", JSON.stringify(orderData));
        
        // Post to order API - include userId in the request
        const response = await fetch(orderApi, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...orderData,
            userId: user.id // Ensure userId is sent to the server
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setOrderId(data.id);
          setOrderSuccess(true);
          
          // Save to order history in localStorage
          const orders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
          orders.push({...orderData, id: data.id});
          localStorage.setItem("orderHistory", JSON.stringify(orders));
          
          // Clear cart
          clearCart();
          localStorage.removeItem("currentOrder");
        } else {
          throw new Error("Failed to place order");
        }
      } catch (error) {
        console.error("Order placement error:", error);
        alert("There was an error processing your order. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    }
  });
  
  // Save order data to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      const orderData = {
        items: cart,
        totalQuantity,
        totalPrice,
        timestamp: new Date().toISOString(),
        userId: user ? user.id : null // Add userId to localStorage data
      };
      localStorage.setItem("currentOrder", JSON.stringify(orderData));
    }
  }, [cart, totalQuantity, totalPrice, user]);
  
  // If cart is empty, redirect to cart page
  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">No Items in Cart</h2>
        <p className="mb-4">Your cart is empty. Please add some items before placing an order.</p>
        <button 
          onClick={() => navigate("/cart")}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Back to Cart
        </button>
      </div>
    );
  }
  
  // Success message after order placement
  if (orderSuccess) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Order Placed Successfully!</h2>
        <p className="mb-2">Thank you for your order.</p>
        <p className="mb-4">Your order ID is: <strong>{orderId}</strong></p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate("/ordhistory")}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => navigate("/ordhistory")}
            className="px-6 py-2 border border-black text-black rounded hover:bg-gray-100"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Place Your Order</h2>
      
      {/* Order Summary with Product Images */}
      <div className="mb-8 p-4 border border-gray-300 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cart.map(item => (
          <div key={item.id} className="flex items-center mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
            {/* Product Image */}
            <div className="w-20 h-20 mr-4 flex-shrink-0">
              <img 
                src={item.image || "/placeholder-image.jpg"} 
                alt={item.brand} 
                className="w-full h-full object-cover rounded"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex-grow">
              <h4 className="font-medium">{item.brand}</h4>
              {item.model && <p className="text-sm text-gray-600">{item.model}</p>}
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
              {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
            </div>
            
            {/* Price */}
            <div className="text-right">
              <p className="font-medium">₹{item.price * item.quantity}</p>
              <p className="text-sm text-gray-600">₹{item.price} each</p>
            </div>
          </div>
        ))}
        <hr className="my-3" />
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>
      
      {/* Customer Information Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${
                formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${
                formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        
        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block mb-1 font-medium">Address *</label>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded ${
              formik.touched.address && formik.errors.address ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
          ) : null}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* City Field */}
          <div>
            <label htmlFor="city" className="block mb-1 font-medium">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${
                formik.touched.city && formik.errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
            ) : null}
          </div>
          
          {/* State Field */}
          <div>
            <label htmlFor="state" className="block mb-1 font-medium">State *</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${
                formik.touched.state && formik.errors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.state && formik.errors.state ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.state}</div>
            ) : null}
          </div>
          
          {/* Pincode Field */}
          <div>
            <label htmlFor="pincode" className="block mb-1 font-medium">Pincode *</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded ${
                formik.touched.pincode && formik.errors.pincode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formik.touched.pincode && formik.errors.pincode ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.pincode}</div>
            ) : null}
          </div>
        </div>
        
        {/* Payment Method Field */}
        <div>
          <h4 className="text-lg font-medium mb-2">Payment Method *</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="credit-card"
                checked={formik.values.paymentMethod === "credit-card"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mr-2"
              />
              Credit Card
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="debit-card"
                checked={formik.values.paymentMethod === "debit-card"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mr-2"
              />
              Debit Card
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cash-on-delivery"
                checked={formik.values.paymentMethod === "cash-on-delivery"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mr-2"
              />
              Cash on Delivery
            </label>
          </div>
          {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.paymentMethod}</div>
          ) : null}
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Back to Cart
          </button>
          
          <button
            type="submit"
            disabled={isProcessing || !formik.isValid}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : `Pay ₹${totalPrice.toLocaleString()}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderPage;