import React from "react";
import { Link } from "react-router-dom";

const DashboardTabs = ({ activeTab, setActiveTab, unreadMessagesCount }) => {
    return (
        <div className="mb-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="flex border-b">
                <button
                    className={`px-6 py-3 text-lg ${
                        activeTab === "myProducts"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700"
                    }`}
                    onClick={() => setActiveTab("myProducts")}
                >
                    My Products
                </button>
                <button
                    className={`px-6 py-3 text-lg ${
                        activeTab === "wishlist"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700"
                    }`}
                    onClick={() => setActiveTab("wishlist")}
                >
                    Wishlist
                </button>
                <button
                    className={`px-6 py-3 text-lg relative ${
                        activeTab === "messages"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700"
                    }`}
                    onClick={() => setActiveTab("messages")}
                >
                    Messages
                    {unreadMessagesCount > 0 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadMessagesCount}
                        </span>
                    )}
                </button>
                <Link
                    to="/"
                    className="px-6 py-3 text-lg ml-auto bg-blue-600 text-white rounded-br-md hover:bg-blue-700"
                >
                    Browse All Products
                </Link>
            </div>
        </div>
    );
};

export default DashboardTabs;
