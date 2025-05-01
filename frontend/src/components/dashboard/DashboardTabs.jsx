import React from "react";
import { Link } from "react-router-dom";

const DashboardTabs = ({ activeTab, setActiveTab, unreadMessagesCount }) => {
    return (
        <div className="mb-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="flex flex-wrap border-b">
                <button
                    className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg ${
                        activeTab === "myProducts"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("myProducts")}
                >
                    My Products
                </button>
                <button
                    className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg ${
                        activeTab === "wishlist"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("wishlist")}
                >
                    Wishlist
                </button>
                <button
                    className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg relative ${
                        activeTab === "messages"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab("messages")}
                >
                    Messages
                    {unreadMessagesCount > 0 && (
                        <span className="absolute top-1 sm:top-2 right-0 sm:right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                            {unreadMessagesCount}
                        </span>
                    )}
                </button>
                <Link
                    to="/"
                    className="px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg ml-auto bg-blue-600 text-white rounded-br-md hover:bg-blue-700"
                >
                    Browse
                </Link>
            </div>
        </div>
    );
};

export default DashboardTabs;
