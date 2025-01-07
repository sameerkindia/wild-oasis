"use server";

import { eachDayOfInterval } from "date-fns";
import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cabinModel from "@/database/cabins.model";
import { connectToDatabase } from "./mongooes";
import Bookings from "@/database/booking.model";
import mongoose from "mongoose";
import Guests from "@/database/guest.model";


export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// MongoDB And Mongoose


// export async function getAllCabin() {
//   try {
//     await connectToDatabase();
//     const cabin = await cabinModel.find();
//     // console.log(cabin)
//     // console.log("Cabin From MongoDB ", cabin)
//     return cabin;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function getOneCabin(id) {
//   // console.log("string Id ", id,)
//   // console.log("number Id ", id, typeof Number(id))

//   try {
//     await connectToDatabase();
//     // const cabin = await cabinModel.findById(Number(id));
//     const cabin = await cabinModel.findOne({ _id: id });

//     // console.log(cabin , "This is from getOneCabin")
//     // console.log('Single Cabin ' , cabin)

//     return cabin;
//   } catch (error) {
//     console.log("this is error from function ", error);
//   }
// }

// export async function getBookedDatesByCabinIdServer(cabinId) {
//   try {
//   await connectToDatabase()
//     // console.log('This is cabin Id:', cabinId);

//     // Get today's date in ISO format, starting at midnight UTC
//     let today = new Date();
//     today.setUTCHours(0, 0, 0, 0);
//     // const todayISO = today.toISOString();

//     // console.log("This was time " , today);

//     // const bookings = await Bookings.find()

//     // console.log('this is Bookings ' , bookings)

//     // const bookingsBy = await Bookings.find({
//     //   id: cabinId,
//     //   $or: [
//     //     { startDate: { $gte: today } }, // Future bookings
//     //     // { status: 'checked-in' }, // Current checked-in bookings
//     //   ],
//     // })
//     // // .lean(); // Use lean() to get plain objects instead of Mongoose documents

//     // console.log(bookingsBy , " This is bookings by")

//     // if (!bookings || bookings.length === 0) {
//     //   console.log("no data found")
//     //   // return [];
//     // }

//     // Query MongoDB for bookings

//     // const booking = await Bookings.find({ cabinId: cabinId });
//     // console.log(booking[0].startDate);
//     // console.log(typeof booking[0].startDate);
//     // console.log(booking[0].startDate);

//     //     const allBookings = await Bookings.find({}, { startDate: 1, cabinId: 1 });
//     // console.log("All Bookings ", allBookings);

//     const bookings = await Bookings.find({
//       cabinId: cabinId, // Match the specific cabin ID
//       startDate: { $gte: today }, // Start date is today or in the future
//       // { status: 'checked-in' },          // Include checked-in bookings
//     });

//     // console.log("This is booking By ", bookings);

//     if (!bookings) {
//       throw new Error("No bookings found.");
//     }

//     // Convert bookings into a list of individual booked dates
//     const bookedDates = bookings
//       .map((booking) => {
//         return eachDayOfInterval({
//           start: new Date(booking.startDate),
//           end: new Date(booking.endDate),
//         });
//       })
//       .flat(); // Flatten the array of arrays into a single array

//     return bookedDates;
//   } catch (error) {
//     console.error("Error fetching booked dates:", error.message);
//     throw new Error("Bookings could not be loaded.");
//   }
// }

// export async function getSettingsServer() {
//   try {
//     await connectToDatabase();

//     // Access the 'settings' collection directly
//     const collection = mongoose.connection.db.collection("settings");

//     // Fetch a single document from the 'settings' collection
//     const data = await collection.findOne({});

//     // console.log("Data from Mongo Setting ", data)

//     if (!data) {
//       throw new Error("Settings could not be loaded");
//     }

//     return JSON.parse(JSON.stringify(data));
//   } catch (error) {
//     console.error("Error fetching settings:", error);
//     throw error;
//   }
// }

// export async function createBooking(bookingData, formData) {

//   await connectToDatabase()

//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");

//   const newBooking = {
//     ...bookingData,
//     guestId: session.user.guestId,
//     numGuests: Number(formData.get("numGuests")),
//     observations: formData.get("observations").slice(0, 1000),
//     extraPrice: 0,
//     totalPrice: bookingData.cabinPrice,
//     isPaid: false,
//     hasBreakfast: false,
//     status: "unconfirmed",
//     created_at: new Date(),
//   };

//   // Insert the new booking document
//   const result = await Bookings.create(newBooking);

//   if (!result) {
//     throw new Error("Booking could not be created");
//   }

//   revalidatePath(`/cabins/${bookingData.cabinId}`);
//   redirect("/cabins/thankyou");
// }

// export async function getUserByEmail(email) {
//   try {
//     await connectToDatabase();
//     const user = await Guests.find({email});
//     // console.log(user , "this is from user by email")

//     // console.log(user);

//     if(user.length !== 0) return JSON.parse(JSON.stringify(user[0]))


//     return null ;

//   } catch (error) {
//     console.log(error)
//   }
// }

// export async function createGuestDB(newGuest) {
//   try {
//     await connectToDatabase();
//     const data = await Guests.create(newGuest) 

//     return data;
//   } catch (error) {
//     if (error) {
//       console.error(error);
//       throw new Error('Guest could not be created');
//     }    
//   }
// }

// export async function updateGuest(formData) {
//   const session = await auth();

//   if (!session) throw new Error("You must be logged in");

//   const nationalID = formData.get("nationalID");
//   const [nationality, countryFlag] = formData.get("nationality").split("%");

//   if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
//     throw new Error("Please provide a valid natonal ID");

//   const updateData = { nationalID, nationality, countryFlag };

//   console.log(updateData , " this is from update guest")

//   // const { data, error } = await supabase
//   //   .from("guests")
//   //   .update(updateData)
//   //   .eq("id", session.user.guestId);

//   const data = await Guests.findOneAndUpdate(
//     { _id: session.user.guestId }, 
//     updateData, 
//     { new: true } // Return the updated document 
//   );

//   console.log(data , " after update ")

//   if (!data) {
//     console.error(error);
//     throw new Error("Guest could not be updated");
//   }

//   revalidatePath("/account/profile");
// }

// export async function getGuestBookings(guestId) {
//   try {
//     // Ensure database connection
//     await connectToDatabase();

//     // Fetch bookings for the given guestId
//     const bookings = await Bookings.find({ guestId });

//     // console.log(bookings)

//     if (!bookings.length) {
//       console.log("No bookings found for the guest");
//       return [];
//     }

//     // Enrich bookings with cabin details
//     const enrichedBookings = await Promise.all(
//       bookings.map(async (booking) => {
//         // Ensure booking is a plain JS object
//         const plainBooking = booking.toObject();

//         // console.log(booking.cabinId , "this is cabin id")

//         // Fetch cabin details
//         const { name, image } = await getOneCabin(booking.cabinId);

//         // Return enriched booking
//         return { ...plainBooking, cabin: { name, image } };
//       })
//     );

//     // console.log("Enriched Bookings:", enrichedBookings);
//     return JSON.parse(JSON.stringify(enrichedBookings));
//   } catch (error) {
//     console.error("Error in getGuestBookings:", error);
//     throw new Error("Failed to fetch guest bookings");
//   }
// }

// export async function getOneBooking(id) {
//   try {
//     await connectToDatabase();

//     const booking = await Bookings.find({ id });

//     // console.log("single Bookings ", booking);

//     return booking[0];
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function updateBooking(formData) {

//   await connectToDatabase()

//   // const bookingId = Number(formData.get("bookingId"));
//   const bookingId = formData.get("bookingId");

//   // console.log(formData , "Form Data ");

//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");
//   // const guestBookings = await getBookings(session.user.guestId);

//   const guestBooking = await Bookings.findOne({
//     _id: bookingId,
//     guestId: session.user.guestId,
//   });

//   // console.log("booking to update ", guestBooking);

//   // const guestBookingsIds = guestBookings.map((booking) => booking.id);

//   if (!guestBooking)
//     throw new Error("You are not allowed to delete this booking");

//   const updateData = {
//     numGuests: Number(formData.get("numGuests")),
//     observations: formData.get("observations").slice(0, 1000),
//   };

//   const updatedBooking = await Bookings.findOneAndUpdate(
//     { _id: bookingId },
//     updateData,
//     { new: true } // Return the updated document
//   );

//   if (!updatedBooking) {
//     return res.status(500).json({ message: "Booking could not be updated" });
//   }

//   revalidatePath(`/account/reservations/edit/${bookingId}`);
//   revalidatePath("/account/reservations");
//   redirect("/account/reservations");
// }

// export async function deleteReservation(bookingId) {

//   await connectToDatabase()

//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");

//   const booking = await Bookings.findOneAndDelete({
//     _id: bookingId,
//     guestId: session.user.guestId, // Ensure user owns the booking
//   });

//   if (!booking) {
//     throw new Error("You are not allowed to delete this booking");
//   }

//   // const { error } = await supabase
//   //   .from("bookings")
//   //   .delete()
//   //   .eq("id", bookingId);

//   // if (error) throw new Error("Booking could not be deleted");

//   revalidatePath("/account/reservations");
// }


// import { MongoClient, ObjectId } from "mongodb";

// const client = new MongoClient("YOUR_MONGO_DB_CONNECTION_STRING");

// async function connectToDatabase() {
//   if (!client.isConnected) {
//     await client.connect();
//   }
//   return client.db("YOUR_DATABASE_NAME");
// }

import { ObjectId } from "mongodb";


export async function getAllCabin() {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");
    const cabins = await db.collection("cabins").find({}).toArray();

    return cabins;
  } catch (error) {
    console.error("Error fetching cabins:", error);
    throw error;
  }
}

export async function getOneCabin(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");
    const cabin = await db.collection("cabins").findOne({ _id: new ObjectId(id)});

    return cabin;
  } catch (error) {
    console.error("Error fetching cabin:", error);
    throw error;
  }
}

export async function getBookedDatesByCabinIdServer(cabinId) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const bookings = await db.collection("bookings").find({
      cabinId: cabinId,
      startDate: { $gte: today },
    }).toArray();

    if (!bookings.length){

      return bookings; 
    }

    const bookedDates = bookings
      .map((booking) => {
        return eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        });
      })
      .flat();

    return JSON.parse(JSON.stringify(bookedDates));
  } catch (error) {
    console.error("Error fetching booked dates:", error);
    throw new Error("Bookings could not be loaded.");
  }
}

export async function getSettingsServer() {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");
    const settings = await db.collection("settings").findOne({});
    if (!settings) throw new Error("Settings could not be loaded");
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}

export async function createBooking(bookingData, formData) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    const session = await auth(); 
    if (!session) throw new Error("You must be logged in");

    const newBooking = {
      ...bookingData,
      guestId: new ObjectId(session.user.guestId),
      numGuests: Number(formData.get("numGuests")),
      observations: formData.get("observations").slice(0, 1000),
      extraPrice: 0,
      totalPrice: bookingData.cabinPrice,
      isPaid: false,
      hasBreakfast: false,
      status: "unconfirmed",
      created_at: new Date(),
    };

    const result = await db.collection("bookings").insertOne(newBooking);
    if (!result.insertedId) throw new Error("Booking could not be created");

    revalidatePath(`/cabins/${bookingData.cabinId}`);
    redirect("/cabins/thankyou"); 
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  // console.log(" email function is calling")
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");
    const user = await db.collection("guests").findOne({ email });
  // console.log(user ," email function is calling");

    return user || null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

export async function getGuestBookings(guestId) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");
    // console.log(guestId, " this is guest id")
    const bookings = await db.collection("bookings").find({ guestId: new ObjectId(guestId)}).toArray();
    if (!bookings.length) return [];

    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        // console.log(booking, " this is booking id")
        const cabin = await db.collection("cabins").findOne({ _id: new ObjectId(booking.cabinId)});
        return { ...booking, cabin: { name: cabin.name, image: cabin.image } };
      })
    );

    return JSON.parse( JSON.stringify(enrichedBookings));
  } catch (error) {
    console.error("Error fetching guest bookings:", error);
    throw new Error("Failed to fetch guest bookings");
  }
}

export async function getOneBooking(id) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");
    const booking = await db.collection("bookings").findOne({ _id: new ObjectId(id) });
    return booking;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
}

export async function updateBooking(formData) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    const bookingId = formData.get("bookingId");
    // console.log(bookingId , " this is form update booking")
    const session = await auth(); // Replace with your auth method
    if (!session) throw new Error("You must be logged in");

    const guestBooking = await db.collection("bookings").findOne({
      _id: new ObjectId(bookingId),
      guestId: new ObjectId(session.user.guestId),
    });

    // console.log(guestBooking , " this is form update booking")


    if (!guestBooking) throw new Error("You are not allowed to update this booking");

    const updateData = {
      numGuests: Number(formData.get("numGuests")),
      observations: formData.get("observations").slice(0, 1000),
    };

    const updatedBooking = await db.collection("bookings").findOneAndUpdate(
      { _id: new ObjectId(bookingId) },
      { $set: updateData },
      { returnDocument: "after" }
    );

    // console.log(updatedBooking.value , " this is form updated booking value")
    // console.log(updatedBooking , " this is form updated booking")

    // if (!updatedBooking.value) throw new Error("Booking could not be updated");

    revalidatePath(`/account/reservations/edit/${bookingId}`); // Replace with your path revalidation method
    revalidatePath("/account/reservations");
    redirect("/account/reservations"); // Replace with your redirect method
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}

export async function deleteReservation(bookingId){
  try{
    const client = await connectToDatabase();
  const db = client.db("wild-oasis");

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const booking = await db.collection("bookings").findOneAndDelete({
    _id: new ObjectId( bookingId),
    guestId: new ObjectId(session.user.guestId),
  });

  if (!booking) {
    throw new Error("You are not allowed to delete this booking");
  }

  // if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
  } catch (error){ 
    console.error("Error Deleting booking:", error);
    throw error;
  }
}




export async function createGuestDB(newGuest) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");
    const result = await db.collection("guests").insertOne(newGuest);
    return result.ops[0];
  } catch (error) {
    console.error("Error creating guest:", error);
    throw error;
  }
}

export async function updateGuest(formData) {
  try {
    const client = await connectToDatabase();
    const db = client.db("wild-oasis");

    const session = await auth(); // Replace with your auth method
    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid national ID");

    const updateData = { nationalID, nationality, countryFlag };

    const result = await db.collection("guests").findOneAndUpdate(
      { _id: new ObjectId(session.user.guestId) },
      { $set: updateData },
      { returnDocument: "after" }
    );

    // if (!result.value) throw new Error("Guest could not be updated");

    revalidatePath("/account/profile"); // Replace with your path revalidation method
  } catch (error) {
    console.error("Error updating guest:", error);
    throw error;
  }
}
