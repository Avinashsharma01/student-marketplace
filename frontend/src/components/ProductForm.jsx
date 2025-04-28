import React from "react";
import { toast } from "react-toastify";

const ProductForm = ({
    product,
    setProduct,
    editingProduct,
    onCancel,
    onSuccess,
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setProduct({
            ...product,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Only require image for new products, not for edits
        if (!editingProduct && !product.image) {
            toast.error("Please upload an image");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", product.title);
            formData.append("description", product.description);
            formData.append("price", product.price);
            formData.append("category", product.category);

            // Only append image if it exists (new upload)
            if (product.image) {
                formData.append("image", product.image);
            }

            const api = await import("../services/app").then(
                (module) => module.default
            );

            if (editingProduct) {
                // Update existing product
                await api.put(
                    `/products/update/${editingProduct._id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                toast.success("Product updated successfully");
            } else {
                // Create new product
                await api.post("/products/post", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Product added successfully");
            }

            // Call the success callback
            onSuccess();
        } catch (error) {
            console.error(
                editingProduct
                    ? "Error updating product:"
                    : "Error creating product:",
                error
            );
            toast.error(
                error.response?.data?.message ||
                    (editingProduct
                        ? "Failed to update product"
                        : "Failed to add product")
            );
        }
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
            <h3 className="text-xl font-semibold mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="Books">Books</option>
                        <option value="Gadgets">Gadgets</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image{" "}
                        {editingProduct &&
                            "(Optional - leave empty to keep current image)"}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        required={!editingProduct}
                    />
                    {editingProduct && editingProduct.imageUrl && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500 mb-1">
                                Current image:
                            </p>
                            <img
                                src={
                                    editingProduct.imageUrl.startsWith("http")
                                        ? editingProduct.imageUrl
                                        : `http://localhost:5000${editingProduct.imageUrl}`
                                }
                                alt="Current product"
                                className="h-24 object-contain"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
