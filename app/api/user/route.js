

import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongooes";

export async function POST(request) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    // Parse the request body
    const { email, name } = await request.json();

    // Check if the user already exists
    const userExists = await db.collection("guests").findOne({ email });

    if (!userExists) {
      // Insert the new user into the database
      const result = await db.collection("guests").insertOne({ email, name });

      return new Response(
        JSON.stringify({
          success: true,
          user: result, 
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "User already exists",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Database Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req,res) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    // Fetch all users
    // const users = await db.collection("guests").find({}).toArray();
    const user = await db.collection("guests").findOne({email : email});


    // const session = await auth()
    // session.user.guestId = users[0]._id


    return new Response(
      JSON.stringify({ success: true, user }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Database Error" , request : req , searchParams , email }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
