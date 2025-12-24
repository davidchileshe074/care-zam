import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserGroupIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { createChild } from "../services/firestore";
import api from "../services/api";

const AddChild = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        needs: "",
        background: "",
        photoFile: null,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo" && files && files[0]) {
            setFormData({
                ...formData,
                photoFile: files[0],
            });
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            let photoUrl = null;

            // Upload photo to our Node.js backend if provided
            if (formData.photoFile) {
                const uploadFormData = new FormData();
                uploadFormData.append("image", formData.photoFile);

                const uploadResponse = await api.post("/upload", uploadFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                photoUrl = uploadResponse.imageUrl;
            }

            // Create child document in MongoDB
            await createChild({
                name: formData.name,
                age: parseInt(formData.age),
                needs: formData.needs.split(",").map((n) => n.trim()),
                background: formData.background,
                photoUrl: photoUrl,
            });

            setSuccess(true);
            setFormData({
                name: "",
                age: "",
                needs: "",
                background: "",
                photoFile: null,
            });
            setPreviewUrl(null);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error("Error adding child:", err);
            setError(err.message || "Failed to add child. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.main
            className="min-h-screen bg-blue-50 p-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center text-blue-700 mb-6 space-x-3">
                    <UserGroupIcon className="h-10 w-10" />
                    <h1 className="text-4xl font-bold">Add Child Profile</h1>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        Child profile added successfully!
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-lg space-y-6"
                >
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Child's Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Enter child's full name"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Age *
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            min="0"
                            max="18"
                            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="Age in years"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Background/Story
                        </label>
                        <textarea
                            name="background"
                            value={formData.background}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                            rows={4}
                            placeholder="Brief background about the child"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Needs (comma-separated) *
                        </label>
                        <input
                            type="text"
                            name="needs"
                            value={formData.needs}
                            onChange={handleChange}
                            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                            placeholder="e.g., School supplies, Clothes, Books"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            Photo
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
                                <PhotoIcon className="h-5 w-5 mr-2" />
                                Choose Photo
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="hidden"
                                    disabled={loading}
                                />
                            </label>
                            {formData.photoFile && (
                                <span className="text-sm text-gray-600">
                                    {formData.photoFile.name}
                                </span>
                            )}
                        </div>
                        {previewUrl && (
                            <div className="mt-4">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Adding Child..." : "Add Child Profile"}
                    </button>
                </form>
            </div>
        </motion.main>
    );
};

export default AddChild;
