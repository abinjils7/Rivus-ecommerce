import React, { useState } from "react";
import { useAuth } from "../../ContextAPI/Authcontext";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const Navigate=useNavigate()
  const { login1 } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login1(email, password);
    Navigate("/")
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
