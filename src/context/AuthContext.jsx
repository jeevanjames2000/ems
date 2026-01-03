import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !location.pathname.startsWith("/login")) {
      navigate("/login");
    }
  }, [user, location.pathname, navigate]);
  const login = (email, password) => {
    if (email && password) {
      const mockUser = { name: "Admin User", email, role: "admin" };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast.success("Successfully logged in!");
      navigate("/dashboard");
      return true;
    }
    toast.error("Invalid email or password");
    return false;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Successfully logged out!");
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
