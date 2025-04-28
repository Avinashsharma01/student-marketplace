import multer from 'multer';
import path from 'path';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';


// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Check file type
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

// Initialize multer
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB max size
    fileFilter: fileFilter
});

// Middleware to upload to Cloudinary
export const uploadToCloudinary = async (req, res, next) => {
    try {
        // If no file was uploaded, continue
        if (!req.file) {
            return next();
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'student-marketplace',
        });

        // Add Cloudinary URL to request body
        req.body.image = result.secure_url;
        req.body.cloudinaryId = result.public_id;

        // Remove local file after uploading to Cloudinary
        fs.unlinkSync(req.file.path);

        next();
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
};

// Utility function to fetch image from Cloudinary by public_id
export const fetchFromCloudinary = async (publicId) => {
    try {
        // Fetch the image resource details from Cloudinary
        const result = await cloudinary.api.resource(publicId);
        return result;
    } catch (error) {
        console.error('Error fetching from Cloudinary:', error);
        throw new Error('Failed to fetch image from Cloudinary');
    }
};

// Utility function to fetch multiple images from Cloudinary by folder
export const fetchImagesFromFolder = async (folderName = 'student-marketplace', maxResults = 100) => {
    try {
        // Fetch images from the specified folder
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: folderName,
            max_results: maxResults
        });
        return result.resources;
    } catch (error) {
        console.error('Error fetching images from Cloudinary folder:', error);
        throw new Error('Failed to fetch images from Cloudinary folder');
    }
};