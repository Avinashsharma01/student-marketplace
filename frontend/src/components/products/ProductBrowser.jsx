import React from "react";
import ProductCard from "./ProductCard";

const ProductBrowser = ({
    loading,
    products,
    searchTerm,
    setSearchTerm,
    handleSearch,
    category,
    handleCategoryChange,
    categories,
}) => {
    return (
        <section id="browse-products" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Browse Products
                </h2>

                {/* Search and Filter */}
                <div className="bg-white p-4 rounded-lg shadow mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                        <div className="flex-1 mb-4 md:mb-0">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleSearch()
                                    }
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-700">Category:</span>
                            <select
                                value={category}
                                onChange={(e) =>
                                    handleCategoryChange(e.target.value)
                                }
                                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl">Loading...</div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-10">
                        <h2 className="text-xl text-gray-600">
                            No products found
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Try a different search term or category
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductBrowser;
