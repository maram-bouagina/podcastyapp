import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext({
    token: '',
    userId: '',
    email: '',
    role: '',
    login: () => {},
    logout: () => {},
  });

export const AuthProvider = ({ children }) => {

 const [token, setToken] = useState(localStorage.getItem("token") || "");
 const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
 const [email, setEmail] = useState(localStorage.getItem("email") || "");
 const [role, setRole] = useState(localStorage.getItem("role") || "");
 useEffect(() => {
  const storedToken = localStorage.getItem("token");
  const storedUserId = localStorage.getItem("userId");
  const storedEmail = localStorage.getItem("email");
  const storedRole = localStorage.getItem("role");

  if (storedToken) {
    setToken(storedToken);
    setUserId(storedUserId);
    setEmail(storedEmail);
    setRole(storedRole);
  }
}, []);

 const login = (email, token, userId, role) => {
    
    setEmail(email);
    setToken(token);
    setUserId(userId);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    console.log("Auth state inside login:", { token, userId, email, role });
  };

  const logout = () => {
    setToken("");
    setUserId("");
    setEmail("");
    setRole(""); 
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role"); 
  };
  useEffect(() => {
    console.log("Auth state updated:", { token, userId, email, role });
}, [token, userId, email, role]);
    return (
        <AuthContext.Provider value={{ token, userId, email, role, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
    
};

/* export const useAuth = () => {
    console.log(AuthContext.token)
    return useContext(AuthContext);
};
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth - Current Auth Context:", context); 
  return context;
};