import axios from "axios";

const endpoint = "http://localhost:5180/api/ImageUpload";

const ImageUploadService = (() => {
    const uploadImage = async (image: File) => {
        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await axios.post(endpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;
        } catch (error) {
            console.error("Failed to upload image:", error);
            throw error;
        }
    };

    return { uploadImage };
})();

export default ImageUploadService;
