import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import MessageForm from "./MessageForm";

const MessagesTab = () => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyTo, setReplyTo] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const api = await import("../services/app").then(
                (module) => module.default
            );
            const response = await api.get("/messages");
            setMessages(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to load messages");
            setLoading(false);
        }
    };

    const markMessageAsRead = async (messageId) => {
        try {
            const api = await import("../services/app").then(
                (module) => module.default
            );
            await api.put(`/messages/${messageId}/read`);
            fetchMessages();
        } catch (error) {
            console.error("Error marking message as read:", error);
            toast.error("Failed to update message");
        }
    };

    const handleReply = (message) => {
        setReplyTo({
            recipientId: message.sender?._id,
            productId: message.product?._id,
            senderName: message.sender?.name,
            productTitle: message.product?.title,
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">My Messages</h2>

            {replyTo && (
                <div className="mb-6">
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 mb-3">
                        <p className="text-sm">
                            <span className="font-semibold">
                                Reply to: {replyTo.senderName}
                            </span>
                            {replyTo.productTitle && (
                                <span className="ml-2 text-gray-600">
                                    (Re: {replyTo.productTitle})
                                </span>
                            )}
                        </p>
                    </div>
                    <MessageForm
                        recipientId={replyTo.recipientId}
                        productId={replyTo.productId}
                        onMessageSent={() => {
                            setReplyTo(null);
                            fetchMessages();
                        }}
                        onCancel={() => setReplyTo(null)}
                    />
                </div>
            )}

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : messages.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">
                        You don't have any messages.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className={`border rounded-lg p-4 ${
                                !message.read &&
                                message.receiver?._id === user?._id
                                    ? "bg-blue-50"
                                    : "bg-white"
                            }`}
                            onClick={() => {
                                if (
                                    !message.read &&
                                    message.receiver?._id === user?._id
                                ) {
                                    markMessageAsRead(message._id);
                                }
                            }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-semibold">
                                        {message.sender?._id === user?._id
                                            ? `To: ${message.receiver?.name}`
                                            : `From: ${message.sender?.name}`}
                                    </span>
                                    {message.product && (
                                        <span className="ml-2 text-sm text-gray-600">
                                            (Re: {message.product?.title})
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500">
                                    {new Date(
                                        message.createdAt
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <p className="text-gray-700">{message.content}</p>
                            {message.sender?._id !== user?._id && (
                                <div className="mt-2 text-right">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleReply(message);
                                        }}
                                    >
                                        Reply
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessagesTab;
