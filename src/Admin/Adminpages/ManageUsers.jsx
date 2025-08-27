import React, { useContext, useEffect } from "react";
import { UserContext } from "../AdminControllers/UserControlers";

export default function ManageUsers() {
  const { userStateControl, deleteuserDB, users, fetchUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
  }, [users]);

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white text-gray-900 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">Manage Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((u) => (
            <div
              key={u.id}
              className="border border-gray-300 rounded-xl p-5 shadow hover:shadow-lg transition bg-white"
            >
              <p className="mb-1">
                <strong>User ID:</strong> {u.id}
              </p>
              <p className="mb-1">
                <strong>Name:</strong> {u.name}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {u.email}
              </p>
              <p className="mb-4">
                <strong>Status:</strong> {u.status ? "Active" : "Blocked"}
              </p>

              <div className="mb-3">
                {u.status ? (
                  <button
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow"
                    onClick={() => userStateControl(u.id, true)}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow"
                    onClick={() => userStateControl(u.id, false)}
                  >
                    Unblock
                  </button>
                )}
              </div>

              <div
                className="text-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 shadow"
                onClick={() => deleteuserDB(u.id)}
              >
                Remove
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

