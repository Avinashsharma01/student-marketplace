import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import api from "../services/app";

const Profile = () => {
    const { user, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        // Password validation (only if attempting to change password)
        if (
            formData.currentPassword ||
            formData.newPassword ||
            formData.confirmPassword
        ) {
            if (!formData.currentPassword) {
                newErrors.currentPassword =
                    "Current password is required to change password";
            }

            if (!formData.newPassword) {
                newErrors.newPassword = "New password is required";
            } else if (formData.newPassword.length < 6) {
                newErrors.newPassword =
                    "Password must be at least 6 characters";
            }

            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error for this field when the user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        try {
            setIsSubmitting(true);

            // Prepare update data
            const updateData = {
                name: formData.name,
                email: formData.email,
            };

            // Only add password if user is trying to change it
            if (formData.currentPassword && formData.newPassword) {
                updateData.currentPassword = formData.currentPassword;
                updateData.password = formData.newPassword;
            }

            const response = await api.put("/auth/profile", updateData);

            // Update user in context/localStorage
            const updatedUser = {
                ...user,
                name: response.data.name,
                email: response.data.email,
                token: response.data.token || user.token, // Keep the token if not updated
            };

            login(updatedUser);
            toast.success("Profile updated successfully");
            setIsEditing(false);

            // Reset password fields
            setFormData({
                ...formData,
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(
                error.response?.data?.message || "Failed to update profile"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        logout(() => navigate("/"));
    };

    const cancelEdit = () => {
        // Reset form to original values
        setFormData({
            name: user?.name || "",
            email: user?.email || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setErrors({});
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">My Profile</h2>
                        {!isEditing && (
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded ${
                                        errors.name ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-2 border rounded ${
                                        errors.email ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="border-t my-6 pt-6">
                                <h3 className="text-lg font-medium mb-4">
                                    Change Password (Optional)
                                </h3>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={formData.currentPassword}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded ${
                                            errors.currentPassword
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.currentPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.currentPassword}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded ${
                                            errors.newPassword
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.newPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.newPassword}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded ${
                                            errors.confirmPassword
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="mb-6 pb-6 border-b">
                                <h3 className="text-gray-600 mb-2">Name</h3>
                                <p className="text-lg">{user?.name}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-gray-600 mb-2">Email</h3>
                                <p className="text-lg">{user?.email}</p>
                            </div>

                            <div className="flex justify-between mt-8">
                                <Link
                                    to="/dashboard"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Go to Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
