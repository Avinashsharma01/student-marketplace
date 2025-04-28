import React, { useState, useEffect } from "react";
import axios from "axios";

const CloudinaryImageDebugger = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://localhost:5000/api/products/images/folder"
                );
                setImages(response.data);

                if (response.data && response.data.length > 0) {
                    // Get the first image for detailed debugging
                    const firstImage = response.data[0];
                    setDebugInfo({
                        secure_url: firstImage.secure_url || "Not available",
                        url: firstImage.url || "Not available",
                        public_id: firstImage.public_id || "Not available",
                        format: firstImage.format || "Not available",
                    });
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) return <div className="p-4">Loading Cloudinary images...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-4 bg-gray-100 rounded-lg mt-8">
            <h3 className="text-xl font-bold mb-4">
                Cloudinary Image Debugger
            </h3>

            {debugInfo && (
                <div className="mb-6 p-4 bg-white rounded shadow">
                    <h4 className="font-semibold mb-2">
                        Debug Info (First Image)
                    </h4>
                    <div className="space-y-1 text-sm">
                        <p>
                            <span className="font-medium">secure_url:</span>{" "}
                            {debugInfo.secure_url}
                        </p>
                        <p>
                            <span className="font-medium">url:</span>{" "}
                            {debugInfo.url}
                        </p>
                        <p>
                            <span className="font-medium">public_id:</span>{" "}
                            {debugInfo.public_id}
                        </p>
                        <p>
                            <span className="font-medium">format:</span>{" "}
                            {debugInfo.format}
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.slice(0, 8).map((image, index) => (
                    <div key={index} className="bg-white p-2 rounded shadow">
                        {image.secure_url ? (
                            <img
                                src={image.secure_url}
                                alt={`Cloudinary Test ${index}`}
                                className="w-full h-32 object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/300x200?text=Error+Loading";
                                }}
                            />
                        ) : (
                            <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                                No URL
                            </div>
                        )}
                        <p className="text-xs mt-1 truncate">
                            {image.public_id}
                        </p>
                    </div>
                ))}
            </div>

            {images.length === 0 && (
                <p className="text-center py-4">
                    No images found in Cloudinary folder
                </p>
            )}
        </div>
    );
};

export default CloudinaryImageDebugger;
