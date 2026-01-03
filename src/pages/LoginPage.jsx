import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight } from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const success = login(email, password);
      if (!success) {
        setError("Invalid credentials");
        setIsLoading(false);
      }
    }, 2000);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Signing in..." />;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "var(--text-main)",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ color: "var(--text-muted)" }}>
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label className="label">Email Address</label>
            <div style={{ position: "relative" }}>
              <User
                size={18}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="email"
                className="input"
                style={{ paddingLeft: "35px" }}
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label className="label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-muted)",
                }}
              />
              <input
                type="password"
                className="input"
                style={{ paddingLeft: "35px" }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                color: "var(--danger)",
                marginBottom: "1rem",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
