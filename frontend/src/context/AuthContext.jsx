import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in from localStorage (persistent login)
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                console.log("User loaded from localStorage:", userData.name);
            } catch (error) {
                console.error(
                    "Error parsing user data from localStorage:",
                    error
                );
                // If there's an error parsing, remove the corrupted data
                localStorage.removeItem("user");
            }
        }
        setLoading(false);
    }, []);

    // Set user data to localStorage when user logs in
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Clear user data from localStorage and accept an optional callback for navigation
    const logout = (callback) => {
        setUser(null);
        localStorage.removeItem("user");
        // If a callback is provided (like a navigation function), call it
        if (callback && typeof callback === "function") {
            callback();
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
