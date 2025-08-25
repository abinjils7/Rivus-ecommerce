import React, { createContext } from "react";
import { carApi } from "../../Api";
import axios from "axios";
import { Toaster, toast } from 'sonner';


export const ProductContext = createContext();

export default function ProductControlers({ children}) {

  async function deleteProductDB(productId) {
    try {
      await axios.delete(`${carApi}/${productId}`);
      console.log("Deleted from backend cart:", productId);
      toast.success("Product Deleted Successfully")
    } catch (error) {
      console.error(error);
    }
  }

  async function editCarsDB(productId)
  {
    try{
        axios.patch(`${carApi}/${productId}`,updatedData);

    }catch(error)
    {
      console.error(error);
    }
  }


  async function addCarsDB(formdata){

    try{
        await axios.post(carApi,formdata)
        // console.log("Added to backend cart:", newCarData);
        toast.success("Product adedd Successfully")
    }catch(error)
    {
      console.error(error);
    }

  }

  return (
    <ProductContext.Provider value={{ deleteProductDB,addCarsDB}}>
      {children}
    </ProductContext.Provider>
  );
}
