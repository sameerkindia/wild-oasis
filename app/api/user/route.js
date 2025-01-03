// import { connectToDatabase } from "@/lib/mongooes";

// export async function POST(req, res) {
//   try {
//     const client = await connectToDatabase();
//     const db = client.db("wild-oasis");
//     // const usersCollection = db.collection('users');

//     if (method === 'POST') {
//       // Store user in the database
//       const { email, name } = req.body;
//       // const result = await db.collection("guests").insertOne(newGuest);
//       const userExists = await db.collection("guests").findOne({ email });

//       if (!userExists) {
//         // const result = await usersCollection.insertOne({ email, name });
//         const result = await db.collection("guests").insertOne({ email, name });
//         return res.status(201).json({ success: true, user: result.ops[0] });
//       }

//       return res.status(200).json({ success: true, message: 'User already exists' });
//     }

//     if (method === 'GET') {
//       // Fetch all users (example)
//       const users = await db.collection("guests").find({}).toArray();
//       return res.status(200).json({ success: true, users });
//     }

//     return res.status(405).end(); // Method Not Allowed
//   } catch (error) {
//     console.error('Database Error:', error);
//     return res.status(500).json({ success: false, error: 'Database Error' });
//   }
// }


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

      // const session = await auth()
      // session.user.guestId = result.ops[0]._id

      // console.log(result , "this is from post")
      // console.log(auth , "this is from post endpoint")

      return new Response(
        JSON.stringify({
          success: true,
          user: result.ops[0], // `ops` is used in older MongoDB versions; adjust based on your driver version.
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

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    // Fetch all users
    const users = await db.collection("guests").find({}).toArray();

    // const session = await auth()
    // session.user.guestId = users[0]._id


    return new Response(
      JSON.stringify({ success: true, users }),
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
