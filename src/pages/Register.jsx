import { useState } from "react";
import { registerUser } from "../utils/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const result = registerUser(username, password);

    if (result.success) {
      alert("Registered successfully!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}