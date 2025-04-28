import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../services/app";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            console.log("Login Success:", response.data);
            login(response.data); // Save the user data to context
            toast.success("Login successful! 🎉");
            navigate("/dashboard"); // Navigate to dashboard
        } catch (error) {
            console.error(
                "Login Error:",
                error.response?.data?.message || error.message
            );
            toast.error(error.response?.data?.message || "Login failed! ❌");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center items-center py-10">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Login
                    </h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
