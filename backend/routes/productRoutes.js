import express from "express";
import {
    postProduct,
    getAllProducts,
    getProductsByCategory,
    updateProduct,
    deleteProduct,
    getProductById,
    searchProducts,
    getUserProducts
} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import { upload, uploadToCloudinary, fetchFromCloudinary, fetchImagesFromFolder } from "../middleware/upload.js";

const router = express.Router();

// Protected route to post a product with image upload
router.post("/post", protect, upload.single("image"), uploadToCloudinary, postProduct);

// Public route - get all products
router.get("/", getAllProducts);

// Public route - search products
router.get("/search", searchProducts);

// Protected route - get user's own products
router.get("/myproducts", protect, getUserProducts);

// Public route - get products by category
router.get("/category/:category", getProductsByCategory);

// Route to fetch a single image from Cloudinary by public_id
router.get("/image/:publicId", async (req, res) => {
    try {
        const image = await fetchFromCloudinary(req.params.publicId);
        res.json(image);
    } catch (error) {
        res.status(500).json({ message: "Error fetching image", error: error.message });
    }
});

// Route to fetch all images from a Cloudinary folder (with default folder)
router.get("/images/folder", async (req, res) => {
    try {
        const folderName = 'student-marketplace';
        const maxResults = req.query.limit ? parseInt(req.query.limit) : 100;

        const images = await fetchImagesFromFolder(folderName, maxResults);
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
});

// Route to fetch all images from a specific Cloudinary folder
router.get("/images/folder/:folderName", async (req, res) => {
    try {
        const folderName = req.params.folderName;
        const maxResults = req.query.limit ? parseInt(req.query.limit) : 100;

        const images = await fetchImagesFromFolder(folderName, maxResults);
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Error fetching images", error: error.message });
    }
});

// Public route - get a single product by ID (this must come after other specific routes)
router.get("/:id", getProductById);

// Protected routes - update & delete
router.put("/update/:id", protect, upload.single("image"), uploadToCloudinary, updateProduct);
router.delete("/delete/:id", protect, deleteProduct);

export default router;
