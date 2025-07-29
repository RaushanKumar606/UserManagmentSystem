import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is stored in local storage
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setCurrentUser(JSON.parse(storedUser));
            setToken(storedToken);
        }

        setLoading(false);
    }, []);

    const login = (userData, authToken) => {
        setCurrentUser(userData);
        setToken(authToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authToken);
    };

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const value = {
        currentUser,
        token,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 