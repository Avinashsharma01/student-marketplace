import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    // Show nothing while checking authentication status
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    // Check if the user is authenticated
    if (!user) {
        // Navigate to the login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the children components if authenticated
    return children;
};
export default ProtectedRoute;
