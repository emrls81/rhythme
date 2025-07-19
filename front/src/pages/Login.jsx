import "./Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoRblanco.png";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setLoading(false);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Error al iniciar sesión. Intenta de nuevo."
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRegisterSuccess(false);
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        email,
        password,
        username,
      });
      setRegisterSuccess(true);
      setLoading(false);
      setIsRegister(false);
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Error al registrarse. Intenta de nuevo."
      );
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      const { credential } = credentialResponse;
      const res = await axios.post("http://localhost:5000/api/v1/auth/google", {
        token: credential,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      setError("Error al autenticar con Google");
      console.error("Error al autenticar con Google:", error);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="RhythMe logo" className="logo" />
      <div className="left-section">
        <h1 className="main-title">Bienvenido a RhythMe</h1>
        <p className="main-sub">
          Explora, comparte y vive la música como nunca antes.
        </p>
      </div>
      <div className="right-section">
        <div className="login-card">
          <h2>{isRegister ? "Regístrate" : "Iniciar Sesión"}</h2>
          {isRegister ? (
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>
          )}
          {!isRegister && (
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Error al iniciar sesión con Google")}
              disabled={loading}
            />
          )}
          {error && <p style={{ color: "#ff3333", marginTop: "1rem" }}>{error}</p>}
          {registerSuccess && (
            <p style={{ color: "green", marginTop: "1rem" }}>
              ¡Registro exitoso! Ahora puedes iniciar sesión.
            </p>
          )}
          <p className="registro">
            {isRegister ? (
              <>¿Ya tienes cuenta? <a href="#" onClick={e => { e.preventDefault(); setIsRegister(false); setError(""); }}>Inicia sesión</a></>
            ) : (
              <>¿No tienes cuenta? <a href="#" onClick={e => { e.preventDefault(); setIsRegister(true); setError(""); }}>Regístrate</a></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
