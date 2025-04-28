import Message from "../models/Message.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// Send a message
export const sendMessage = async (req, res) => {
    const { receiverId, productId, content } = req.body;
    const senderId = req.user.userId;

    try {
        // Validate receiver exists
        const receiver = await User.findById(receiverId);
        if (!receiver) return res.status(404).json({ message: "Receiver not found" });

        // Validate product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Create and save message
        const message = await Message.create({
            sender: senderId,
            receiver: receiverId,
            product: productId,
            content,
        });

        const populatedMessage = await Message.findById(message._id)
            .populate("sender", "name email")
            .populate("receiver", "name email")
            .populate("product", "title price imageUrl");

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get messages for current user
export const getMessages = async (req, res) => {
    const userId = req.user.userId;

    try {
        // Get messages where user is either sender or receiver
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }],
        })
            .populate("sender", "name email")
            .populate("receiver", "name email")
            .populate("product", "title price imageUrl")
            .sort({ createdAt: -1 }); // Newest first

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Mark message as read
export const markAsRead = async (req, res) => {
    const messageId = req.params.id;
    const userId = req.user.userId;

    try {
        const message = await Message.findById(messageId);
        
        if (!message) return res.status(404).json({ message: "Message not found" });
        
        // Only the receiver can mark a message as read
        if (message.receiver.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized" });
        }
        
        message.read = true;
        await message.save();
        
        res.json({ message: "Message marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}; 