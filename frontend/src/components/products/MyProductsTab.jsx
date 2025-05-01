import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

const MyProductsTab = () => {
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewProductForm, setShowNewProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        title: "",
        description: "",
        price: "",
        category: "Books",
        image: null,
        contactEmail: "",
        contactPhone: "",
        whatsappNumber: "",
    });

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const fetchMyProducts = async () => {
        try {
            setLoading(true);
            const api = await import("../../services/app").then(
                (module) => module.default
            );
            const response = await api.get("/products/myproducts");
            setMyProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching my products:", error);
            toast.error("Failed to load your products");
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const api = await import("../../services/app").then(
                    (module) => module.default
                );
                await api.delete(`/products/delete/${productId}`);
                toast.success("Product deleted successfully");
                fetchMyProducts();
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product");
            }
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setNewProduct({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            contactEmail: product.contactEmail || "",
            contactPhone: product.contactPhone || "",
            whatsappNumber: product.whatsappNumber || "",
            image: null, // Image is optional during edit
        });
        setShowNewProductForm(true);
    };

    const cancelForm = () => {
        setShowNewProductForm(false);
        setEditingProduct(null);
        setNewProduct({
            title: "",
            description: "",
            price: "",
            category: "Books",
            image: null,
            contactEmail: "",
            contactPhone: "",
            whatsappNumber: "",
        });
    };

    const handleFormSuccess = () => {
        // Reset form state
        setNewProduct({
            title: "",
            description: "",
            price: "",
            category: "Books",
            image: null,
            contactEmail: "",
            contactPhone: "",
            whatsappNumber: "",
        });
        setShowNewProductForm(false);
        setEditingProduct(null);
        fetchMyProducts();
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-0">
                    My Products
                </h2>
                {!showNewProductForm && (
                    <button
                        className="bg-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded hover:bg-green-700 w-full sm:w-auto"
                        onClick={() => setShowNewProductForm(true)}
                    >
                        Add New Product
                    </button>
                )}
            </div>

            {/* New/Edit Product Form */}
            {showNewProductForm && (
                <ProductForm
                    product={newProduct}
                    setProduct={setNewProduct}
                    editingProduct={editingProduct}
                    onCancel={cancelForm}
                    onSuccess={handleFormSuccess}
                />
            )}

            {/* Products List */}
            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : myProducts.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">
                        You haven't listed any products yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            showSellerActions={true}
                            onDelete={handleDeleteProduct}
                            onEdit={handleEditProduct}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProductsTab;
