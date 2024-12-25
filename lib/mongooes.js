// import mongoose from "mongoose";

// let isConnected = false;

// export const connectToDatabase = async () => {
//   mongoose.set("strictQuery", true);

//   if (!process.env.MONGODB_URL) return console.log("MISSING MONGODB_URL");

//   if (isConnected) return console.log("MongoDB is already connected");

//   try {
//     await mongoose.connect(process.env.MONGODB_URL, { dbName: "wild-oasis" });
//     isConnected = true;

//     console.log("MongoDB is connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable.");
}

/**
 * Global cache for mongoose connection.
 * Prevents multiple connections during hot reloads in development.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (cached.conn) {
    console.log("MongoDB is already connected");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "wild-oasis",
      })
      .then((mongoose) => {
        console.log("MongoDB is connected");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
