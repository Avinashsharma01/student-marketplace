import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";

const WishlistTab = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const api = await import("../services/app").then(
                (module) => module.default
            );
            const response = await api.get("/wishlist");
            // Ensure wishlist is an array before setting state
            const wishlistData = response.data?.items || response.data || [];
            setWishlist(Array.isArray(wishlistData) ? wishlistData : []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            toast.error("Failed to load wishlist");
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            const api = await import("../services/app").then(
                (module) => module.default
            );
            await api.delete(`/wishlist/remove/${productId}`);
            toast.success("Removed from wishlist");
            fetchWishlist();
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove from wishlist");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : wishlist.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">Your wishlist is empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                        <ProductCard
                            key={item._id}
                            product={item}
                            isWishlistItem={true}
                            onRemoveFromWishlist={removeFromWishlist}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistTab;
