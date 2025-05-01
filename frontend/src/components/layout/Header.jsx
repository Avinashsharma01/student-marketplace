/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/app";

const Header = ({ user }) => {
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (user) {
            fetchUnreadMessages();
        }
    }, [user]);

    const fetchUnreadMessages = async () => {
        try {
            const response = await api.get("/messages");
            const unreadCount = response.data.filter(
                (msg) => !msg.read && msg.receiver?._id === user?._id
            ).length;
            setUnreadMessages(unreadCount);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Default avatar if user has no profile image
    const defaultAvatar =
        "https://ui-avatars.com/api/?name=" +
        (user?.name || "User") +
        "&background=0D8ABC&color=fff";

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl md:text-2xl font-bold">
                    Student Marketplace
                </Link>

                {/* Mobile menu button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        {mobileMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="hover:underline relative"
                            >
                                Dashboard
                                {unreadMessages > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {unreadMessages}
                                    </span>
                                )}
                            </Link>
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/profile"
                                    className="hover:underline flex items-center"
                                >
                                    {/* <span className="mr-2">Profile</span> */}
                                    <img
                                        src={user.profileImage || defaultAvatar}
                                        alt={user.name || "User"}
                                        className="h-8 w-8 rounded-full object-cover border-2 border-white"
                                    />
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-3 pt-3 border-t border-blue-500">
                    <nav className="flex flex-col justify-center items-center space-y-3">
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="hover:bg-blue-700 py-2 px-3 rounded-md flex items-center"
                                    onClick={toggleMobileMenu}
                                >
                                    <span>Dashboard</span>
                                    {unreadMessages > 0 && (
                                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {unreadMessages}
                                        </span>
                                    )}
                                </Link>
                                <Link
                                    to="/profile"
                                    className="hover:bg-blue-700 py-2 px-3 rounded-md flex items-center"
                                    onClick={toggleMobileMenu}
                                >
                                    <div className="profilee flex items-center justify-center gap-2">
                                        <img
                                            src={
                                                user.profileImage ||
                                                defaultAvatar
                                            }
                                            alt={user.name || "User"}
                                            className="h-6 w-6 ml-2 rounded-full object-cover border-2 border-white"
                                        />
                                        <span>{user.name}</span>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:bg-blue-700 py-2 px-3 rounded-md block"
                                    onClick={toggleMobileMenu}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="hover:bg-blue-700 py-2 px-3 rounded-md block"
                                    onClick={toggleMobileMenu}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
