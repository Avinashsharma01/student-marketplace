/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/app";
import AuthContext from "../context/AuthContext";
import WishlistContext from "../context/WishlistContext";
import MessageForm from "../components/messaging/MessageForm";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { addToWishlist, removeFromWishlist, isInWishlist } =
        useContext(WishlistContext);
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMessageForm, setShowMessageForm] = useState(true);
    const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    // Update inWishlist status whenever the product changes or isInWishlist function might return different results
    useEffect(() => {
        if (product && product._id) {
            setInWishlist(isInWishlist(product._id));
        }
    }, [product, isInWishlist]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product details:", error);
            toast.error("Failed to load product details");
            setLoading(false);
            // Redirect to home if product not found
            if (error.response && error.response.status === 404) {
                navigate("/");
            }
        }
    };

    // Handle different image URL formats
    const getImageUrl = (url) => {
        if (!url) return "https://placehold.co/600x400?text=No+Image";
        // If it's already a Cloudinary URL (starts with https), use it directly
        if (url.startsWith("http")) return url;
        // Otherwise, it might be a local path, prepend the server URL
        return `http://localhost:5000${url}`;
    };

    const handleWishlistToggle = async () => {
        if (!user) {
            toast.info("Please login to add items to your wishlist");
            navigate("/login");
            return;
        }

        try {
            if (inWishlist) {
                await removeFromWishlist(id);
                setInWishlist(false);
            } else {
                await addToWishlist(id);
                setInWishlist(true);
            }
        } catch (error) {
            console.error("Error toggling wishlist status:", error);
            toast.error("Failed to update wishlist");
        }
    };

    const handleMessageSent = () => {
        setShowMessageForm(false);
        toast.success("Message sent to seller successfully");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <div className="text-xl mb-4">Product not found</div>
                <Link to="/" className="text-blue-600 hover:underline">
                    Go back to home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <Link
                        to="/"
                        className="text-blue-600 hover:underline flex items-center"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            ></path>
                        </svg>
                        Back to all products
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <div className="relative">
                                <img
                                    src={getImageUrl(product.imageUrl)}
                                    alt={product.title}
                                    className="w-full h-auto object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://placehold.co/600x400?text=No+Image";
                                    }}
                                />
                                {/* Add wishlist button overlay on the image */}
                                <button
                                    onClick={handleWishlistToggle}
                                    className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                                    title={
                                        inWishlist
                                            ? "Remove from wishlist"
                                            : "Add to wishlist"
                                    }
                                >
                                    {user && inWishlist ? (
                                        <FaHeart className="text-red-500 text-2xl" />
                                    ) : (
                                        <FaRegHeart className="text-gray-600 hover:text-red-500 text-2xl" />
                                    )}
                                </button>
                            </div>
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-semibold mb-2">
                                    Description
                                </h2>
                                <p className="text-gray-700">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 md:w-1/2">
                            <div className="mb-4 flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">
                                        {product.title}
                                    </h1>
                                    <p className="text-sm text-gray-500">
                                        Category:{" "}
                                        <span className="font-medium">
                                            {product.category}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="text-2xl font-bold text-blue-600">
                                        ${product.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    Seller Information
                                </h2>
                                <p className="mb-2">
                                    <span className="font-medium">
                                        Sold by:
                                    </span>{" "}
                                    {product.user && product.user.name
                                        ? product.user.name
                                        : "Unknown Seller"}
                                </p>

                                {/* Contact Information */}
                                {(product.contactEmail ||
                                    product.contactPhone ||
                                    product.whatsappNumber) && (
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                        <h3 className="font-medium text-gray-700 mb-2">
                                            Contact Details:
                                        </h3>
                                        <ul className="space-y-1">
                                            {product.contactEmail && (
                                                <li className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-500 mr-2"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                    </svg>
                                                    <a
                                                        href={`mailto:${product.contactEmail}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {product.contactEmail}
                                                    </a>
                                                </li>
                                            )}

                                            {product.contactPhone && (
                                                <li className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-500 mr-2"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                    <a
                                                        href={`tel:${product.contactPhone}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {product.contactPhone}
                                                    </a>
                                                </li>
                                            )}

                                            {product.whatsappNumber && (
                                                <li className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-green-500 mr-2"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <a
                                                        href={`https://wa.me/${product.whatsappNumber.replace(
                                                            /\D/g,
                                                            ""
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        WhatsApp:{" "}
                                                        {product.whatsappNumber}
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                                {/* Add a standalone wishlist button that's more visible */}
                                <button
                                    onClick={handleWishlistToggle}
                                    className={`px-4 py-3 rounded flex items-center justify-center ${
                                        user && inWishlist
                                            ? "bg-red-100 text-red-800 hover:bg-red-200 border border-red-300"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
                                    }`}
                                >
                                    {user && inWishlist ? (
                                        <>
                                            <FaHeart className="text-red-500 mr-2" />
                                            Remove from Wishlist
                                        </>
                                    ) : (
                                        <>
                                            <FaRegHeart className="text-gray-500 mr-2" />
                                            {user
                                                ? "Add to Wishlist"
                                                : "Login to Save"}
                                        </>
                                    )}
                                </button>

                                {!user && (
                                    <Link
                                        to="/login"
                                        className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 text-center"
                                    >
                                        Login to Contact Seller
                                    </Link>
                                )}
                            </div>

                            {/* Message form - Only visible for logged-in users when product has valid user data */}
                            {user && product.user && product.user._id && (
                                <div className="mt-6 border-t pt-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Contact Seller
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Send a message to{" "}
                                        {product.user.name || "the seller"}{" "}
                                        about this product
                                    </p>
                                    <MessageForm
                                        recipientId={product.user._id}
                                        productId={product._id}
                                        onMessageSent={handleMessageSent}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
