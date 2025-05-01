import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["Books", "Gadgets", "Accessories"],
        },
        imageUrl: {
            type: String,
            default: "",
        },
        contactEmail: {
            type: String,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        contactPhone: {
            type: String,
            trim: true,
        },
        whatsappNumber: {
            type: String,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
