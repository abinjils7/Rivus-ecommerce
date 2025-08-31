import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../ContextAPI/Cartcontext";
import { useAuth } from "../../ContextAPI/Authcontext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { orderApi } from "../../Api";

function OrderPage() {
  const { cart, totalQuantity, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State for order processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [validationAttempted, setValidationAttempted] = useState(false);
  
  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Strict validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required")
      .test('no-numbers', 'Name cannot contain numbers', value => {
        return !/\d/.test(value);
      })
      .test('no-special-chars', 'Name cannot contain special characters', value => {
        return !/[^a-zA-Z\s]/.test(value);
      }),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .required("City is required")
      .test('no-numbers', 'City cannot contain numbers', value => {
        return !/\d/.test(value);
      }),
    state: Yup.string()
      .min(2, "State must be at least 2 characters")
      .required("State is required")
      .test('no-numbers', 'State cannot contain numbers', value => {
        return !/\d/.test(value);
      }),
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
      setValidationAttempted(true);
      
      // Check if form is valid before proceeding
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        // Scroll to the first error
        const firstErrorField = Object.keys(errors)[0];
        document.getElementById(firstErrorField)?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        return;
      }
      
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
          userId: user ? user.id : null
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
            userId: user.id
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
        userId: user ? user.id : null
      };
      localStorage.setItem("currentOrder", JSON.stringify(orderData));
    }
  }, [cart, totalQuantity, totalPrice, user]);
  
  // If cart is empty, redirect to cart page
  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before placing an order.</p>
          <button 
            onClick={() => navigate("/cart")}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }
  
  // Success message after order placement
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Thank you for your order. We'll process it shortly.</p>
          <p className="text-sm text-gray-500 mb-6">Order ID: <span className="font-medium">{orderId}</span></p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate("/")}
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => navigate("/ordhistory")}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Review your items and enter your shipping information</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={item.image || "/placeholder-image.jpg"} 
                        alt={item.brand} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 text-sm">{item.brand}</h3>
                      {item.model && <p className="text-xs text-gray-500">{item.model}</p>}
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Help Section */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-medium text-blue-900 mb-2">Need help with your order?</h3>
              <p className="text-sm text-blue-700">Call us at 1-800-RIVUS-CARE</p>
            </div>
          </div>
          
          {/* Customer Information Form */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
              
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition ${
                        formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition ${
                        formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
                    )}
                  </div>
                </div>
                
                {/* Address Field */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition ${
                      formik.touched.address && formik.errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your complete address"
                  ></textarea>
                  {formik.touched.address && formik.errors.address && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* City Field */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition ${
                        formik.touched.city && formik.errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="City"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.city}</p>
                    )}
                  </div>
                  
                  {/* State Field */}
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition ${
                        formik.touched.state && formik.errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="State"
                    />
                    {formik.touched.state && formik.errors.state && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.state}</p>
                    )}
                  </div>
                  
                  {/* Pincode Field */}
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition ${
                        formik.touched.pincode && formik.errors.pincode ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="6 digits"
                      maxLength="6"
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">{formik.errors.pincode}</p>
                    )}
                  </div>
                </div>
                
                {/* Payment Method */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Method *</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <label className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formik.values.paymentMethod === "credit-card" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formik.values.paymentMethod === "credit-card"}
                        onChange={formik.handleChange}
                        className="sr-only"
                      />
                      <svg className="w-8 h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="text-sm font-medium">Credit Card</span>
                    </label>
                    
                    <label className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formik.values.paymentMethod === "debit-card" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="debit-card"
                        checked={formik.values.paymentMethod === "debit-card"}
                        onChange={formik.handleChange}
                        className="sr-only"
                      />
                      <svg className="w-8 h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="text-sm font-medium">Debit Card</span>
                    </label>
                    
                    <label className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      formik.values.paymentMethod === "cash-on-delivery" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash-on-delivery"
                        checked={formik.values.paymentMethod === "cash-on-delivery"}
                        onChange={formik.handleChange}
                        className="sr-only"
                      />
                      <svg className="w-8 h-8 mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                  {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                    <p className="mt-2 text-sm text-red-600">{formik.errors.paymentMethod}</p>
                  )}
                </div>
                
                {/* Validation Summary */}
                {validationAttempted && Object.keys(formik.errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Please fix the following errors:</h4>
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {Object.entries(formik.errors).map(([field, error]) => (
                        <li key={field}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back to Cart
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${totalPrice.toLocaleString()}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;