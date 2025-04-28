/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/app";

const Header = ({ user }) => {
    const [unreadMessages, setUnreadMessages] = useState(0);

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

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    Student Marketplace
                </Link>
                <div className="flex space-x-4">
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
                            <Link to="/profile" className="hover:underline">
                                Profile
                            </Link>
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
        </header>
    );
};

export default Header;
