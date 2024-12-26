
// import mongoose from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URL;

// if (!MONGODB_URL) {
//   throw new Error("Please define the MONGODB_URL environment variable.");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export const connectToDatabase = async () => {
//   mongoose.set("strictQuery", true);

//   if (cached.conn) {
//     console.log("MongoDB is already connected");
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URL, {
//         dbName: "wild-oasis",
//       })
//       .then((mongoose) => {
//         console.log("MongoDB is connected");
//         return mongoose;
//       });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (error) {
//     cached.promise = null;
//     throw error;
//   }

//   return cached.conn;
// };


import { MongoClient } from 'mongodb';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable.");
}

let cachedClient;

export const connectToDatabase = async () => {
  if (cachedClient) {
    console.log("DB already connected")
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URL);

  try {
    await client.connect();
    console.log("DB Connected")
    cachedClient = client;
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};