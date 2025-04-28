import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId;

    try {
        // Validate if product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Find user's wishlist or create if it doesn't exist
        let wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new Wishlist({
                user: userId,
                products: [productId],
            });
        } else {
            // Check if product is already in wishlist
            if (wishlist.products.includes(productId)) {
                return res.status(400).json({ message: "Product already in wishlist" });
            }
            
            // Add product to wishlist
            wishlist.products.push(productId);
        }

        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.userId;

    try {
        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.products = wishlist.products.filter(
            (product) => product.toString() !== productId
        );

        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
    const userId = req.user.userId;

    try {
        const wishlist = await Wishlist.findOne({ user: userId }).populate({
            path: "products",
            populate: {
                path: "user",
                select: "name email",
            },
        });

        if (!wishlist) {
            return res.status(200).json({ products: [] });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}; 