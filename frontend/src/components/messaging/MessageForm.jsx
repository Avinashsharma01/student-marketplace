import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/app";

const MessageForm = ({ recipientId, productId, onMessageSent, onCancel }) => {
    const [content, setContent] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            toast.error("Message cannot be empty");
            return;
        }

        try {
            setSending(true);
            const messageData = {
                receiverId: recipientId, // Changed from recipientId to receiverId to match backend
                content,
            };

            // Add productId if it exists
            if (productId) {
                messageData.productId = productId;
            }

            await api.post("/messages/send", messageData);

            toast.success("Message sent successfully");
            setContent("");

            // Call the callback function if provided
            if (onMessageSent && typeof onMessageSent === "function") {
                onMessageSent();
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(
                error.response?.data?.message || "Failed to send message"
            );
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">Send Message</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full p-2 border rounded mb-2"
                    rows="3"
                    required
                ></textarea>
                <div className="flex justify-end space-x-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border rounded"
                            disabled={sending}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={sending}
                    >
                        {sending ? "Sending..." : "Send"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MessageForm;
