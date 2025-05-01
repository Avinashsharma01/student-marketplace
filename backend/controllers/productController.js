import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// Post Product
export const postProduct = async (req, res) => {
    try {
        const { title, description, price, category, contactEmail, contactPhone, whatsappNumber } = req.body;

        // Get image URL from Cloudinary result if available
        const imageUrl = req.body.image || null;

        const product = await Product.create({
            title,
            description,
            price,
            category,
            imageUrl,
            contactEmail,
            contactPhone,
            whatsappNumber,
            user: req.user.userId, // Linking the product to the logged-in user
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get All Products
export const getAllProducts = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;

        // Build filter object based on query parameters
        let filter = {};

        // Add price filter if min or max price is provided
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        const products = await Product.find(filter).populate("user", "name email");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get User's Products
export const getUserProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.userId }).populate("user", "name email");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Search Products
export const searchProducts = async (req, res) => {
    try {
        const { keyword, minPrice, maxPrice, category } = req.query;

        // Build filter object
        let filter = {};

        // Add keyword search if provided
        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Add category filter if provided
        if (category) {
            filter.category = category;
        }

        // Add price filter if min or max price is provided
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        const products = await Product.find(filter).populate("user", "name email");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("user", "name email");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Products by Category
export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const { minPrice, maxPrice } = req.query;

        // Build filter object
        let filter = { category };

        // Add price filter if min or max price is provided
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        const products = await Product.find(filter).populate("user", "name email");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Update Product
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        // Check ownership
        if (product.user.toString() !== req.user.userId)
            return res.status(403).json({ message: "Not authorized" });

        const updateData = { ...req.body };

        // If there's a new image uploaded via Cloudinary
        if (req.body.image) {
            updateData.imageUrl = req.body.image;

            // Delete old image from Cloudinary if it exists and has a public_id
            if (product.imageUrl && product.imageUrl.includes('cloudinary.com')) {
                try {
                    // Extract public_id from URL - this is a simplified approach
                    const urlParts = product.imageUrl.split('/');
                    const filenameWithExtension = urlParts[urlParts.length - 1];
                    const publicId = `student-marketplace/${filenameWithExtension.split('.')[0]}`;

                    await cloudinary.uploader.destroy(publicId);
                } catch (err) {
                    console.error("Error deleting old image from Cloudinary:", err);
                }
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.user.toString() !== req.user.userId)
            return res.status(403).json({ message: "Not authorized" });

        // Delete image from Cloudinary if it exists
        if (product.imageUrl && product.imageUrl.includes('cloudinary.com')) {
            try {
                // Extract public_id from URL - this is a simplified approach
                const urlParts = product.imageUrl.split('/');
                const filenameWithExtension = urlParts[urlParts.length - 1];
                const publicId = `student-marketplace/${filenameWithExtension.split('.')[0]}`;

                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error("Error deleting image from Cloudinary:", err);
            }
        }

        await product.deleteOne();

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
