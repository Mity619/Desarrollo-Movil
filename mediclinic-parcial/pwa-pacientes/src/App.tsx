import { useEffect, useState } from "react";
import Login from "./components/Login";
import Pacientes from "./components/Pacientes";
import type { User } from "./types";
import "./App.css";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("session");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const handleLogin = (u: User) => {
    localStorage.setItem("session", JSON.stringify(u));
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem("session");
    setUser(null);
  };

  if (loading) return <p style={{ padding: 20 }}>Cargando...</p>;
  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="app">
      <header>
        <h1>MediClinic</h1>
        <div>
          <span>👤 {user.username} </span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>
      <Pacientes />
    </div>
  );
}