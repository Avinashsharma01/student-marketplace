/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../../services/app";

const Header = ({ user }) => {
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (user) {
            fetchUnreadMessages();
        }
    }, [user]);

    useEffect(() => {
        // Close dropdown when clicking outside
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setProfileDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-xl md:text-2xl font-bold flex items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mr-2 text-yellow-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span className="font-extrabold">Student</span>
                    <span className="font-light">Marketplace</span>
                </Link>

                {/* Mobile menu button */}
                <button
                    className="md:hidden focus:outline-none transition-transform duration-200 ease-in-out transform hover:scale-110"
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
                    <Link
                        to="/"
                        className="font-medium px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Home
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="font-medium px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 relative"
                            >
                                Dashboard
                                {unreadMessages > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                        {unreadMessages}
                                    </span>
                                )}
                            </Link>

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="flex items-center space-x-2 focus:outline-none bg-blue-700 hover:bg-blue-800 transition-colors duration-200 rounded-full p-1"
                                >
                                    <img
                                        src={user.profileImage || defaultAvatar}
                                        alt={user.name || "User"}
                                        className="h-8 w-8 rounded-full object-cover border-2 border-white"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Profile Dropdown */}
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800 border border-gray-200 transform transition-all duration-200 origin-top-right">
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            to="/dashboard/my-products"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            My Products
                                        </Link>
                                        <Link
                                            to="/dashboard/wishlist"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            Wishlist
                                        </Link>
                                        <div className="border-t border-gray-100">
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                onClick={() => {
                                                    // Implement logout functionality here
                                                    console.log(
                                                        "Logout clicked"
                                                    );
                                                    setProfileDropdownOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="font-medium px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <nav className="flex flex-col justify-center items-center space-y-3 p-4 border-t border-blue-500">
                    <Link
                        to="/"
                        className="w-full text-center hover:bg-blue-700 py-2 px-3 rounded-md"
                        onClick={toggleMobileMenu}
                    >
                        Home
                    </Link>

                    {user ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="w-full text-center hover:bg-blue-700 py-2 px-3 rounded-md flex items-center justify-center"
                                onClick={toggleMobileMenu}
                            >
                                <span>Dashboard</span>
                                {unreadMessages > 0 && (
                                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                        {unreadMessages}
                                    </span>
                                )}
                            </Link>

                            <div className="w-full border-t border-blue-500 pt-2">
                                <div className="flex items-center justify-center mb-2">
                                    <img
                                        src={user.profileImage || defaultAvatar}
                                        alt={user.name || "User"}
                                        className="h-10 w-10 rounded-full object-cover border-2 border-white"
                                    />
                                    <span className="ml-2 font-medium">
                                        {user.name}
                                    </span>
                                </div>

                                <Link
                                    to="/profile"
                                    className="w-full text-center hover:bg-blue-700 py-2 px-3 rounded-md block"
                                    onClick={toggleMobileMenu}
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    to="/dashboard/my-products"
                                    className="w-full text-center hover:bg-blue-700 py-2 px-3 rounded-md block"
                                    onClick={toggleMobileMenu}
                                >
                                    My Products
                                </Link>
                                <Link
                                    to="/dashboard/wishlist"
                                    className="w-full text-center hover:bg-blue-700 py-2 px-3 rounded-md block"
                                    onClick={toggleMobileMenu}
                                >
                                    Wishlist
                                </Link>
                                <button
                                    className="w-full text-center bg-red-600 hover:bg-red-700 py-2 px-3 rounded-md block mt-2"
                                    onClick={() => {
                                        // Implement logout functionality here
                                        console.log("Logout clicked");
                                        toggleMobileMenu();
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="w-full text-center hover:bg-blue-700 py-2 px-3 rounded-md block"
                                onClick={toggleMobileMenu}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="w-full text-center bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-2 px-3 rounded-md block"
                                onClick={toggleMobileMenu}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
