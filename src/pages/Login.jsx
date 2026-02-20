import { useState } from "react";

export default function Login({ setRole }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      alert("Fill all fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || {};

    // HOST LOGIN (hardcoded)
    if (username === "host" && password === "admin123") {
      localStorage.setItem("role", "host");
      localStorage.setItem("currentUser", "host");
      setRole("host");
      return;
    }

    if (isRegister) {
      if (users[username]) {
        alert("User already exists");
        return;
      }

      users[username] = { password };
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registered successfully!");
      setIsRegister(false);
    } else {
      if (!users[username] || users[username].password !== password) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("role", "guest");
      localStorage.setItem("currentUser", username);
      setRole("guest");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegister ? "Register" : "Login"}</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleSubmit}>
          {isRegister ? "Create Account" : "Login"}
        </button>

        <p className="toggle-text">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? " Login" : " Register"}
          </span>
        </p>
      </div>
    </div>
  );
}