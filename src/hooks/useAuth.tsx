import {
  getErrorFromResponseData,
  getUseRoute,
} from "../utils/functions/function";
import { api } from "../utils/api/constants";
import { useState, useEffect, createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IAuth {
  user: User | null;
  login: (email: string, password: string) => void;
  loggingIn: boolean;
  logout: () => void;
}

interface User {
  email: string;
}

const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    try {
      setLoggingIn(true);
      setTimeout(() => {}, 1000);
      const res = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.data.token);
      toast.success("The user logged in successfully");
      console.log(res.data.data.user.roles);

      if (!res.data.data.user.roles)
        toast.error("The user don't have any role");

      navigate(getUseRoute(res.data.data.user.roles[0].name));
      setLoggingIn(false);
    } catch (error) {
      toast.error(getErrorFromResponseData(error));
      setLoggingIn(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        loggingIn,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
