import { useState, useContext } from "react";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.username === username);
    if (!user || user.password !== sha256(password)) {
      alert("Invalid username or password");
      return;
    }
    login({ username });
    navigate("/");
  };

  return (
    <div className="container py-4">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>{" "}
          {/* ✅ Link label */}
          <input
            id="username" // ✅ ID matches htmlFor
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password" // ✅ ID matches htmlFor
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}
