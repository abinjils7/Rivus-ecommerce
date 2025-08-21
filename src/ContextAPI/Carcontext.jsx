import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { carApi } from "../Api";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   const [filterHP, setFilterHP] = useState("");
   const[mesege, setMessage] = useState("");

  // Fetch cars from API
  async function fetchCars() {
    try {
      const response = await axios.get(carApi); //api.js
      console.log(response.data);
      setCars(response.data.cars || response.data);
    } catch (error) {
      console.error("Error fetching cars:", error.message);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
  const name = car.name ? car.name.toLowerCase() : "";
  const brand = car.brand ? car.brand.toLowerCase() : "";
  const term = searchTerm.toLowerCase();

  const matchesSearch =
    !term || name.includes(term) || brand.includes(term);

 
  const hpNumber = parseInt(filterHP);
  const matchesHP = !filterHP || car.hp >= hpNumber;
  


  return matchesSearch && matchesHP;
});
 


  return (
    <CarContext.Provider
      value={{
        filteredCars,
        cars,
        searchTerm,
        setSearchTerm, 
        fetchCars,
        filterHP,
        setFilterHP
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
