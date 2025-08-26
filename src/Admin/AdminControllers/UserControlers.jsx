import axios from "axios";
import React, { createContext, useState } from "react";
import { UserAPI } from "../../Api";
import { toast } from "sonner";

export const UserContext = createContext();

export default function UserControlers({ children }) {

  const [users, setUsers] = useState([]);
  
  async function fetchUser() {
    try {
      const result = await axios.get(UserAPI);
      setUsers(result.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }

  async function userStateControl(userid, currentstate) {
    try {
      const newstate = !currentstate;
      await axios.patch(`${UserAPI}/${userid}`, {
        status: newstate,
      });
      {
        newstate?toast.success("user is unblocked"):toast.success("useer is blocked")
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteuserDB(userid) {
    try {
      await axios.delete(`${UserAPI}/${userid}`);
      console.log("Deleted from backend cart:");
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <UserContext.Provider
        value={{
          userStateControl,
          deleteuserDB,
          users,
          fetchUser,
        }}
      >
        {children}
      </UserContext.Provider>
    </div>
  );
}
