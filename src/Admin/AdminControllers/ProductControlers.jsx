import React, { createContext } from "react";
import { carApi } from "../../Api";
import axios from "axios";
import { Toaster, toast } from "sonner";

export const ProductContext = createContext();

export default function ProductControlers({ children }) {

  async function deleteProductDB(productId) {
    try {
      await axios.delete(`${carApi}/${productId}`);
      console.log("Deleted from backend cart:", productId);
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.error(error);
    }
  }


  async function addCarsDB(formdata) {
    try {
      await axios.post(carApi, formdata);
      toast.success("Product adedd Successfully");
    } catch (error) {
      console.error(error);
    }
  }

  async function editProductDB(productid, newdata) {
    try {
      await axios.patch(`${carApi}/${productid}`, newdata,);
    } catch (err) {
      console.log(err);
    }
  }

  


  return (
    <ProductContext.Provider
      value={{ deleteProductDB, addCarsDB, editProductDB }}
    >
      {children}
    </ProductContext.Provider>
  );
}
