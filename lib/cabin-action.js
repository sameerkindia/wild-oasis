"use server"

import { connectToDatabase } from "./mongooes";

import { Buffer } from "buffer";

export async function uploadImage(file) {
  if (!file) {
    throw new Error("No file provided.");
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer()); // Convert file to buffer

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    // Store image in the database
    const result = await db.collection("images").insertOne({
      filename: file.name,
      contentType: file.type,
      data: buffer,
      uploadedAt: new Date(),
    });

    return {
      success: true,
      message: "Image uploaded successfully!",
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload the image.");
  }
}

export async function createCabin(formData){

  try {
    // Parse form data
    const name = formData.get("name");
    const maxCapacity = parseInt(formData.get("maxCapacity"), 10);
    const regularPrice = parseFloat(formData.get("regularPrice"));
    const discount = parseFloat(formData.get("discount"));
    const description = formData.get("description");
    const imageFile = formData.get("image");

    // Convert image to buffer
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    // Insert cabin details and image into the database
    const result = await db.collection("cabins").insertOne({
      name,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image: {
        filename: imageFile.name,
        contentType: imageFile.type,
        data: imageBuffer,
      },
      createdAt: new Date(),
    });

    return { success: true, message: "Cabin created successfully!" };
  } catch (error) {
    console.error("Error creating cabin:", error);
    throw new Error("Failed to create cabin.");
  }

}


// try{

//   const imageFile = cabinData.get("image")

//   await connectToDatabase()

//   const buffer = Buffer.from(await imageFile.arrayBuffer()); // Convert file to buffer


  

//   console.log(imageFile , "this is image file")

//   console.log(buffer , "this is buffer Data")

//   console.log(cabinData , "this is from cabin action")

// }catch(error){

// }