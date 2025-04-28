import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProductCard = ({
    product,
    onDelete,
    onEdit,
    onRemoveFromWishlist,
    isWishlistItem = false,
    showSellerActions = false,
}) => {
    const { user } = useContext(AuthContext);

    // Handle the case where product comes from wishlist (has different structure)
    const productData = isWishlistItem ? product.product : product;

    // Handle different image URL formats
    const getImageUrl = (url) => {
        if (!url) return "https://placehold.co/300x200?text=No+Image";

        // If it's already a full URL (starts with http or https), use it directly
        if (url.startsWith("http")) return url;

        // For Cloudinary URLs that might be stored without the protocol
        if (url.includes("res.cloudinary.com")) {
            return `https://${url}`;
        }

        // For Cloudinary secure_url from your API endpoint
        if (url.includes("cloudinary")) {
            // The URL is likely a Cloudinary URL, but missing the protocol
            return `https://${url.replace(/^\/\//, "")}`;
        }

        // Otherwise, it's a local path, ensure proper path joining
        return `http://localhost:5000${url.startsWith("/") ? "" : "/"}${url}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/products/${productData._id}`}>
                <img
                    src={getImageUrl(productData.imageUrl)}
                    alt={productData.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                            "https://placehold.co/300x200?text=No+Image";
                    }}
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                        {productData.title}
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                        {productData.description}
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-bold">
                            ${productData.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                            {productData.category}
                        </span>
                    </div>
                </div>
            </Link>

            <div className="px-4 pb-4">
                {showSellerActions ? (
                    <div className="flex justify-between">
                        <button
                            onClick={() =>
                                onDelete && onDelete(productData._id)
                            }
                            className="text-red-600 hover:text-red-800"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => onEdit && onEdit(productData)}
                            className="text-green-600 hover:text-green-800"
                        >
                            Edit
                        </button>
                        <Link
                            to={`/products/${productData._id}`}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            View
                        </Link>
                    </div>
                ) : isWishlistItem ? (
                    <div className="flex justify-between">
                        <button
                            onClick={() =>
                                onRemoveFromWishlist &&
                                onRemoveFromWishlist(productData._id)
                            }
                            className="text-red-600 hover:text-red-800"
                        >
                            Remove
                        </button>
                        <Link
                            to={`/products/${productData._id}`}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            View Details
                        </Link>
                    </div>
                ) : (
                    <div className="text-right">
                        {user ? (
                            <Link
                                to={`/products/${productData._id}`}
                                className="text-blue-600 hover:underline"
                            >
                                View Details
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="text-blue-600 hover:underline"
                            >
                                Login to Contact Seller
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
