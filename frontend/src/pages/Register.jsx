import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/app";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};

        // Validate name
        if (name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters";
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = "Please enter a valid email address";
        }

        // Validate password
        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate the form
        if (!validateForm()) {
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            toast.success("Registration successful! 🎉");

            // Login the user
            login(response.data);

            // Navigate to dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error(
                "Register Error:",
                error.response?.data?.message || error.message
            );

            // Handle specific error messages from the backend
            if (
                error.response?.data?.message?.includes("email already exists")
            ) {
                toast.error("This email is already registered");
                setValidationErrors({
                    ...validationErrors,
                    email: "This email is already registered",
                });
            } else {
                toast.error(
                    error.response?.data?.message || "Registration failed! ❌"
                );
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-center items-center py-10">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Create an Account
                    </h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.name
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                            />
                            {validationErrors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.name}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.email
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                            />
                            {validationErrors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.email}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.password
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                                minLength="6"
                            />
                            {validationErrors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.password}
                                </p>
                            )}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm your password"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.confirmPassword
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                                minLength="6"
                            />
                            {validationErrors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.confirmPassword}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
