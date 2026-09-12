import { useState} from "react";
import type { FormEvent } from "react";
import type { User } from "../types";

const USERS = [
  { username: "admin", password: "1234" },
  { username: "medico", password: "medicina2024" },
];

interface Props {
  onLogin: (u: User) => void;
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = USERS.find(
      u => u.username === username && u.password === password
    );
    if (!found) {
      setError("Credenciales incorrectas");
      return;
    }
    setError("");
    onLogin({ username: found.username });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Iniciar sesión</h2>
        <input
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}