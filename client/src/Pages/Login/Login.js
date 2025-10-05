import React, { useState } from "react";
import "./LoginStyle.css";  
import { useLogin } from "../../Hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="main-form">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="field">
          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="field">
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button type="submit">Login</button>
        {error && <p>{error}</p>}

        {/* Link to Signup */}
        <p className="account-link">
          Don’t have an account? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
