import { storage } from "../lib/appwrite";
import { ID } from "appwrite";

const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID || "photos";

// Upload a file to Appwrite Storage
export const uploadFile = async (file) => {
    try {
        const response = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            file
        );
        return response;
    } catch (error) {
        throw error;
    }
};

// Get file preview URL
export const getFilePreview = (fileId) => {
    try {
        const result = storage.getFilePreview(
            BUCKET_ID,
            fileId,
            2000, // width
            2000, // height
            "center", // gravity
            100, // quality
        );
        return result;
    } catch (error) {
        throw error;
    }
};

// Get file download URL
export const getFileDownload = (fileId) => {
    try {
        const result = storage.getFileDownload(BUCKET_ID, fileId);
        return result;
    } catch (error) {
        throw error;
    }
};

// Delete a file
export const deleteFile = async (fileId) => {
    try {
        await storage.deleteFile(BUCKET_ID, fileId);
        return true;
    } catch (error) {
        throw error;
    }
};

// List all files
export const listFiles = async () => {
    try {
        const files = await storage.listFiles(BUCKET_ID);
        return files;
    } catch (error) {
        throw error;
    }
};
