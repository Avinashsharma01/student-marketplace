import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../services/app";
import AuthContext from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    // Fetch user's wishlist when component mounts or user changes
    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlistItems([]);
            setLoading(false);
        }
    }, [user]);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const response = await api.get("/wishlist");
            const wishlistProducts = response.data?.products || [];
            setWishlistItems(wishlistProducts);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            setWishlistItems([]);
            setLoading(false);
        }
    };

    const addToWishlist = async (productId) => {
        try {
            await api.post("/wishlist/add", { productId });
            toast.success("Added to wishlist");
            await fetchWishlist();
            return true;
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            const message =
                error.response?.data?.message || "Failed to add to wishlist";
            toast.error(message);
            return false;
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await api.delete(`/wishlist/remove/${productId}`);
            toast.success("Removed from wishlist");
            await fetchWishlist();
            return true;
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove from wishlist");
            return false;
        }
    };

    // Check if a product is in the wishlist
    const isInWishlist = (productId) => {
        return wishlistItems.some((item) => item._id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                loading,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                fetchWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;
