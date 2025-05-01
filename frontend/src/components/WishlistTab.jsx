import React, { useContext } from "react";
import ProductCard from "./products/ProductCard";
import WishlistContext from "../context/WishlistContext";

const WishlistTab = () => {
    const { wishlistItems, loading, removeFromWishlist } =
        useContext(WishlistContext);

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                My Wishlist
            </h2>
            {loading ? (
                <div className="text-center py-6 sm:py-10">Loading...</div>
            ) : wishlistItems.length === 0 ? (
                <div className="text-center py-6 sm:py-10">
                    <p className="text-gray-500">Your wishlist is empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {wishlistItems.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
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
