"use client";

import React, { useState } from "react";
// import { uploadImage } from "./actions"; // Import the server action

export default function ImageUpload({previewImage}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate a temporary preview URL
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setUploadMessage("Please select an image first.");
      return;
    }

    try {
      // Call the server action
      // const result = await uploadImage(selectedImage);

      setUploadMessage(`Image uploaded successfully! ID: ${result.id}`);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadMessage("An error occurred while uploading the image.");
    }
  };

  return (
    <div className="image-upload">
      <h1>Update Image</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <div className="flex">
      {previewImage && (
        <div>
          <h3>Image:</h3>
          <img
            src={previewImage}
            alt="Selected Image"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        </div>
      )}      

      {previewUrl && (
        <div>
          <h3>Preview:</h3>
          <img
            src={previewUrl}
            alt="Selected Image"
            style={{ maxWidth: "300px", marginTop: "10px" }}
          />
        </div>
      )}
      </div>

      {/* <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Upload
      </button> */}

      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}
