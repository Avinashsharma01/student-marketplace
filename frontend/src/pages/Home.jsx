import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../services/app";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedProductsSection from "../components/FeaturedProductsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ProductBrowser from "../components/ProductBrowser";
import CtaSection from "../components/CtaSection";
import CloudinaryImageDebugger from "../components/CloudinaryImageDebugger";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const categories = ["Books", "Gadgets", "Accessories"];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get("/products");
            setProducts(response.data);

            // Get 3 random products as featured products
            if (response.data.length > 0) {
                const shuffled = [...response.data].sort(
                    () => 0.5 - Math.random()
                );
                setFeaturedProducts(shuffled.slice(0, 3));
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products");
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);

            // Build query parameters
            const params = new URLSearchParams();

            if (searchTerm) {
                params.append("keyword", searchTerm);
            }

            if (category && category !== "all") {
                params.append("category", category);
            }

            if (minPrice) {
                params.append("minPrice", minPrice);
            }

            if (maxPrice) {
                params.append("maxPrice", maxPrice);
            }

            const queryString = params.toString();
            const endpoint = queryString
                ? `/products/search?${queryString}`
                : "/products";

            const response = await api.get(endpoint);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error searching products:", error);
            toast.error("Search failed");
            setLoading(false);
        }
    };

    const handleCategoryChange = async (selectedCategory) => {
        try {
            setLoading(true);
            setCategory(selectedCategory);

            // Update search with new category
            const params = new URLSearchParams();

            if (searchTerm) {
                params.append("keyword", searchTerm);
            }

            if (selectedCategory && selectedCategory !== "all") {
                params.append("category", selectedCategory);
            }

            if (minPrice) {
                params.append("minPrice", minPrice);
            }

            if (maxPrice) {
                params.append("maxPrice", maxPrice);
            }

            const queryString = params.toString();
            const endpoint = queryString
                ? `/products/search?${queryString}`
                : "/products";

            const response = await api.get(endpoint);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error filtering by category:", error);
            toast.error("Failed to filter products");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <HeroSection user={user} />

            {/* Features Section */}
            <FeaturesSection />

            {/* Categories Section */}
            <CategoriesSection
                categories={categories}
                handleCategoryChange={handleCategoryChange}
            />

            {/* Featured Products */}
            <FeaturedProductsSection featuredProducts={featuredProducts} />

            {/* Testimonials Section */}
            <TestimonialsSection />

            {/* Browse All Products Section */}
            <ProductBrowser
                loading={loading}
                products={products}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                category={category}
                handleCategoryChange={handleCategoryChange}
                categories={categories}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
            />

            {/* Temporarily add the CloudinaryImageDebugger to diagnose image issues */}
            <div className="container mx-auto px-4">
                <CloudinaryImageDebugger />
            </div>

            {/* CTA Section */}
            <CtaSection user={user} />
        </div>
    );
};

export default Home;
