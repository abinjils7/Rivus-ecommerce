import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserAPI } from "../Api";
import { toast } from "sonner";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Register user
  const register = async (name, email, password) => {
    try {
      const newUser = { name, email, password };
      const res = await axios.post(UserAPI, newUser);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data)); // stting
      toast.success("Registered successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    }
  };

  // Login user

  const login1 = async (email, password) => {
    try {
      const res = await axios.get(
        `${UserAPI}?email=${email}&password=${password}`
      );
      if (res.data.length > 0) {
        const loggedInUser = res.data[0];
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser)); // persist user
        toast.success("Logged in successfully!");
      } else {
        toast.info("Invalid email or password");
      }
    } catch (err) {
      console.error(err);

      toast.error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // clear from storage
    toast.info("Logged out!");
  };

  return (
    <AuthContext.Provider value={{ user, register, login1, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
