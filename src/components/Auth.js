import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    token: '',
    userId: '',
    email: '',
    login: () => {},
    logout: () => {},
  });

export const AuthProvider = ({ children }) => {

 const [token, setToken] = useState(localStorage.getItem("token") || "");
 const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
 const [email, setEmail] = useState(localStorage.getItem("email") || "");

 const login = (email, token, userId) => {
    
    setEmail(email);
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
  };

  const logout = () => {
    setToken("");
    setUserId("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
  };
    return (
        <AuthContext.Provider value={{ token, userId, email, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
    
};

export const useAuth = () => {
    console.log(AuthContext.token)
    return useContext(AuthContext);
};
