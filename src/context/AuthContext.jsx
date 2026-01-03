import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      if (!location.pathname.startsWith("/login")) {
        navigate("/login");
      }
    }
  }, []);
  const login = (email, password) => {
    if (email && password) {
      const mockUser = { name: "Admin User", email, role: "admin" };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate("/dashboard");
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
