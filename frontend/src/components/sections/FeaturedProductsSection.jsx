import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";

const FeaturedProductsSection = ({ featuredProducts }) => {
    if (featuredProducts.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Featured Items
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link
                        to="#browse-products"
                        className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-lg transition duration-300"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .getElementById("browse-products")
                                .scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        See All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProductsSection;
