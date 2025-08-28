import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Nav from "../Common/Nav";
import Footer from "../Common/Footer";

const timeSlots = [
  "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "7:00 PM", "8:00 PM",
];

export default function TestDrive() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return false;
    }
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters long.");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }
    if (!selectedDate) {
      toast.error("Please select a date.");
      return false;
    }
    if (!selectedTime) {
      toast.error("Please select a time.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    toast.success(
      `Test drive booked for ${selectedDate} at ${selectedTime}. Reach out to your nearest Rivus center.`
    );
    setTimeout(() => navigate("/"), 2000);
  };

  const isFormValid = 
    name.trim().length >= 3 && 
    /^\d{10}$/.test(phone) && 
    selectedDate && 
    selectedTime;

  return (
    <>
      <Nav />

      <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-center px-9 pt-10">
        {/* Left side text */}
        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Book a Test Drive
          </h2>
          <p className="text-gray-700 text-lg max-w-sm">
            Experience the thrill of your dream car before you own it. 
            Choose your date and time — we'll handle the rest.
          </p>
        </div>

        {/* Right side form */}
        <div className="md:w-1/2 w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* Name */}
          <div className="mb-5">
            <label className="block text-black font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Phone */}
          <div className="mb-8">
            <label className="block text-black font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Date selector */}
          <div className="mb-8">
            <p className="font-semibold mb-3 text-black">Select a Date:</p>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate === day;
                return (
                  <button
                    key={day}
                    className={`py-2 rounded-full transition duration-200 ${
                      isSelected
                        ? "bg-black text-white font-bold"
                        : "bg-gray-100 hover:bg-gray-200 text-black"
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time selector */}
          <div className="mb-8">
            <p className="font-semibold mb-3 text-black">Select a Time:</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-sm">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`py-2 px-2 rounded-lg border text-center transition duration-200 ${
                    selectedTime === time
                      ? "bg-black text-white border-black font-semibold"
                      : "bg-white text-black border-gray-400 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button 
              className="px-5 py-2 rounded-lg border border-black text-black bg-white hover:bg-gray-100 transition"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`px-6 py-2 rounded-lg transition ${
                isFormValid 
                  ? "bg-black text-white hover:bg-gray-800" 
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}
