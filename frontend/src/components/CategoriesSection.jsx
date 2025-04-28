import React from "react";
import { Link } from "react-router-dom";

const CategoriesSection = ({ categories, handleCategoryChange }) => {
    return (
        <section className="py-16 bg-gray-50" id="categories">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Browse By Category
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                            onClick={() => handleCategoryChange(cat)}
                        >
                            <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                                <h3 className="text-2xl font-bold text-white">
                                    {cat}
                                </h3>
                            </div>
                            <div className="p-4 text-center">
                                <Link
                                    to="#browse-products"
                                    className="text-blue-600 hover:underline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleCategoryChange(cat);
                                    }}
                                >
                                    Browse {cat}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
