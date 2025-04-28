import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import DashboardTabs from "../components/DashboardTabs";
import MyProductsTab from "../components/MyProductsTab";
import WishlistTab from "../components/WishlistTab";
import MessagesTab from "../components/MessagesTab";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("myProducts");
    const [messages, setMessages] = useState([]);

    // Fetch messages just to count unread ones
    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const api = await import("../services/app").then(
                (module) => module.default
            );
            const response = await api.get("/messages");
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Calculate unread messages count
    const unreadMessagesCount = messages.filter(
        (m) => !m.read && m.receiver?._id === user?._id
    ).length;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                {/* Navigation Tabs */}
                <DashboardTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    unreadMessagesCount={unreadMessagesCount}
                />

                {/* Content Area */}
                <div className="bg-white rounded-lg shadow p-6">
                    {/* Render appropriate component based on active tab */}
                    {activeTab === "myProducts" && <MyProductsTab />}
                    {activeTab === "wishlist" && <WishlistTab />}
                    {activeTab === "messages" && (
                        <MessagesTab onMessageRead={fetchMessages} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
