import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Common/Nav";
import Footer from "../Common/Footer";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "7:00 PM",
  "8:00 PM",
];

export default function TestDrive() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both a date and time.");
      return;
    }

    alert(
      `Test drive booked for ${selectedDate} at ${selectedTime}. Reach out to your nearest Rivus center.`
    );
    navigate("/");
  };

  return (
    <>
      <Nav />

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-9 pt-10">
        {/* Left Section */}

        {/* Left Section */}

        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
            Book a Test Drive
          </h2>
          <p className="text-gray-600 text-lg max-w-sm">
            Experience the thrill of your dream car before you own it. Choose
            your date and time — we'll handle the rest.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="md:w-1/2 w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
          {/* Name Input */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Phone Input */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <p className="font-semibold mb-3 text-gray-700">Select a Date:</p>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDate === day;
                return (
                  <button
                    key={day}
                    className={`py-2 rounded-full transition duration-200 ${
                      isSelected
                        ? "bg-purple-600 text-white font-bold"
                        : "bg-gray-100 hover:bg-purple-100 text-gray-800"
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <p className="font-semibold mb-3 text-gray-700">Select a Time:</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-sm">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`py-2 px-2 rounded-lg border text-center transition duration-200 ${
                    selectedTime === time
                      ? "bg-purple-600 text-white border-purple-600 font-semibold"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <button className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 transition"
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
