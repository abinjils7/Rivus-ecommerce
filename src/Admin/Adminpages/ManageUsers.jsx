import React, { useEffect, useState } from "react";
import { useAuth } from "../../ContextAPI/Authcontext";
import { UserAPI } from "../../Api";
import axios from "axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  async function fetchUser() {
    try {
      const result = await axios.get(UserAPI);
      setUsers(result.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("from the user", users);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((u) => (
            <div 
              key={u.id} 
              className="border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition"
            >
              <p className="text-gray-700 mb-1">
                <strong>User ID:</strong> {u.id}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Name:</strong> {u.name}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> {u.email}
              </p>

              <button 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Block
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
