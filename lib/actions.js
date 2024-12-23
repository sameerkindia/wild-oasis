"use server";

import { eachDayOfInterval } from "date-fns";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import cabinModel from "@/database/cabins.model";
import { connectToDatabase } from "./mongooes";
import Bookings from "@/database/booking.model";
import mongoose from "mongoose";
import Guests from "@/database/guest.model";

// export async function createBooking(bookingData, formData) {
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
//   };

//   const { error } = await supabase.from("bookings").insert([newBooking]);

//   if (error) throw new Error("Booking could not be created");

//   revalidatePath(`/cabins/${bookingData.cabinId}`);
//   redirect("/cabins/thankyou");
// }

export async function updateGuest(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid natonal ID");

  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

// export async function deleteReservation(bookingId) {
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");
//   // console.log(session)
//   // console.log(session.user)
//   const guestBookings = await getBookings(session.user.guestId);
//   const guestBookingsIds = guestBookings.map((booking) => booking.id);

//   if (!guestBookingsIds.includes(bookingId))
//     throw new Error("You are not allowed to delete this booking");

//   const { error } = await supabase
//     .from("bookings")
//     .delete()
//     .eq("id", bookingId);

//   if (error) throw new Error("Booking could not be deleted");

//   revalidatePath("/account/reservations");
// }

// export async function updateBooking(formData) {
//   const bookingId = Number(formData.get("bookingId"));

//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");
//   const guestBookings = await getBookings(session.user.guestId);
//   const guestBookingsIds = guestBookings.map((booking) => booking.id);

//   if (!guestBookingsIds.includes(bookingId))
//     throw new Error("You are not allowed to delete this booking");

//   const updateData = {
//     numGuests: Number(formData.get("numGuests")),
//     observations: formData.get("observations").slice(0, 1000),
//   };

//   // const [id , ...updatedFields] = formData
//   // const id = formData.id;
//   // const updatedFields = {numGuests : formData.numGuests , observations : formData.observations}

//   // console.log(formData)
//   // console.log("id ", formData.id)
//   // console.log("updatedFields " , updatedFields)

//   const { error } = await supabase
//     .from("bookings")
//     .update(updateData)
//     .eq("id", bookingId)
//     .select()
//     .single();

//   if (error) throw new Error("Booking could not be updated");

//   revalidatePath(`/account/reservations/edit/${bookingId}`);
//   revalidatePath("/account/reservations");
//   redirect("/account/reservations");
// }

// actions for Login and Logout

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// MongoDB And Mongoose

export async function getAllCabin() {
  try {
    await connectToDatabase();
    const cabin = await cabinModel.find();
    // console.log(cabin)
    // console.log("Cabin From MongoDB ", cabin)
    return cabin;
  } catch (error) {
    console.log(error);
  }
}

export async function getOneCabin(id) {
  // console.log("string Id ", id,)
  // console.log("number Id ", id, typeof Number(id))

  try {
    await connectToDatabase();
    // const cabin = await cabinModel.findById(Number(id));
    const cabin = await cabinModel.findOne({ _id: id });

    // console.log(cabin , "This is from getOneCabin")
    // console.log('Single Cabin ' , cabin)

    return cabin;
  } catch (error) {
    console.log("this is error from function ", error);
  }
}

export async function getBookedDatesByCabinIdServer(cabinId) {
  try {
  await connectToDatabase()
    // console.log('This is cabin Id:', cabinId);

    // Get today's date in ISO format, starting at midnight UTC
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    // const todayISO = today.toISOString();

    // console.log("This was time " , today);

    // const bookings = await Bookings.find()

    // console.log('this is Bookings ' , bookings)

    // const bookingsBy = await Bookings.find({
    //   id: cabinId,
    //   $or: [
    //     { startDate: { $gte: today } }, // Future bookings
    //     // { status: 'checked-in' }, // Current checked-in bookings
    //   ],
    // })
    // // .lean(); // Use lean() to get plain objects instead of Mongoose documents

    // console.log(bookingsBy , " This is bookings by")

    // if (!bookings || bookings.length === 0) {
    //   console.log("no data found")
    //   // return [];
    // }

    // Query MongoDB for bookings

    // const booking = await Bookings.find({ cabinId: cabinId });
    // console.log(booking[0].startDate);
    // console.log(typeof booking[0].startDate);
    // console.log(booking[0].startDate);

    //     const allBookings = await Bookings.find({}, { startDate: 1, cabinId: 1 });
    // console.log("All Bookings ", allBookings);

    const bookings = await Bookings.find({
      cabinId: cabinId, // Match the specific cabin ID
      startDate: { $gte: today }, // Start date is today or in the future
      // { status: 'checked-in' },          // Include checked-in bookings
    });

    // console.log("This is booking By ", bookings);

    if (!bookings) {
      throw new Error("No bookings found.");
    }

    // Convert bookings into a list of individual booked dates
    const bookedDates = bookings
      .map((booking) => {
        return eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        });
      })
      .flat(); // Flatten the array of arrays into a single array

    return bookedDates;
  } catch (error) {
    console.error("Error fetching booked dates:", error.message);
    throw new Error("Bookings could not be loaded.");
  }
}

// export async function getBookedDatesByCabinIdServer(cabinId) {

//   console.log(cabinId)
//   try {

//     await connectToDatabase()

//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);

//     const bookings = await Bookings.find({
//       cabinId,
//       $or: [
//         { startDate: { $gte: today } },
//         { status: 'checked-in' }
//       ]
//     });

//     console.log("Booking from server ", bookings)

//     const bookedDates = bookings.flatMap((booking) => {
//       return eachDayOfInterval({
//         start: new Date(booking.startDate),
//         end: new Date(booking.endDate),
//       });
//     });

//     return bookedDates;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Bookings could not get loaded');
//   }
// }

// export async function getBookedDatesByCabinId(cabinId) {
//   try {
//     await connectToDatabase();

//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);

//     const bookings = await Bookings.find({
//       cabinId,
//       $or: [
//         { startDate: { $gte: today } },
//         { status: 'checked-in' },
//       ],
//     });

//     const bookedDates = bookings.flatMap((booking) => {
//       return eachDayOfInterval({
//         start: new Date(booking.startDate),
//         end: new Date(booking.endDate),
//       });
//     });

//     return bookedDates;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Bookings could not get loaded');
//   }
// }

export async function getSettingsServer() {
  try {
    await connectToDatabase();

    // Access the 'settings' collection directly
    const collection = mongoose.connection.db.collection("settings");

    // Fetch a single document from the 'settings' collection
    const data = await collection.findOne({});

    // console.log("Data from Mongo Setting ", data)

    if (!data) {
      throw new Error("Settings could not be loaded");
    }

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
}

export async function createBooking(bookingData, formData) {

  await connectToDatabase()

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
    created_at: new Date(),
  };

  console.log(newBooking, " This is Booking Data");

  // console.log("New Booking Data", newBooking);

  // Insert the new booking document
  const result = await Bookings.create(newBooking);

  //  console.log(result)

  if (!result) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function getUserByEmail(email) {
  try {
    await connectToDatabase();
    const user = await Guests.find();

    console.log(user);

    return user;
  } catch (error) {
    console.log(error)
  }
}

// export async function getGuestBookings(guestId) {
//   // // console.log('guestId ' , guestId)
//   // const { data, error, count } = await supabase
//   //   .from('bookings')
//   //   // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
//   //   .select(
//   //     'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)'
//   //   )
//   //   .eq('guestId', guestId)
//   //   .order('startDate');

//   //   // console.log('Bookings data ',data)

//   // if (error) {
//   //   console.error(error);
//   //   throw new Error('Bookings could not get loaded');
//   // }

//   // return data;

//   try{
//     await connectToDatabase()
//     const bookings = await Bookings.find({guestId : guestId})

//     console.log(bookings , "Booking from ")

//     // console.log(bookings, " Guest Bookings")

//     // bookings.map(async (booking , index) => {
//     //   console.log(booking)
//     //   // const {name , image} = await getOneCabin(booking.id);
//     //   const cabin = await getOneCabin(booking.id);

//     //   console.log(cabin , "index " , index)

//     //   return {...booking}
//     // })

//     const enrichedBookings = await Promise.all(
//       bookings.map(async (booking, index) => {
//         const newBooking = JSON.parse(JSON.stringify(bookings))
//         console.log(newBooking.name , " New Booking from guest")
//         console.log(booking.get(name) , " Booking from guest")

//         const {name , image} = await getOneCabin(booking.id);
//         return { ...booking, cabin:{ name , image} }; // Add cabin data to each booking object
//       })
//     );

//     console.log(enrichedBookings)

//     // return JSON.parse(JSON.stringify(enrichedBookings));

//     return enrichedBookings

//   } catch (error){
//     console.log(error)
//   }
// }

// export async function getGuestBookings(guestId) {
//   try{
//     await connectToDatabase()
//     const bookings = await Bookings.find({guestId : guestId})

//     console.log(bookings , "Booking from ")

//     const enrichedBookings = await Promise.all(
//       bookings.map(async (booking, index) => {
//         const newBooking = JSON.parse(JSON.stringify(bookings))
//         console.log(newBooking.name , " New Booking from guest")
//         console.log(booking.get(name) , " Booking from guest")

//         const {name , image} = await getOneCabin(booking.id);
//         return { ...booking, cabin:{ name , image} }; // Add cabin data to each booking object
//       })
//     );

//     console.log(enrichedBookings)

//     return enrichedBookings

//   } catch (error){
//     console.log(error)
//   }
// }

export async function getGuestBookings(guestId) {
  try {
    // Ensure database connection
    await connectToDatabase();

    // Fetch bookings for the given guestId
    const bookings = await Bookings.find({ guestId });

    // console.log(bookings)

    if (!bookings.length) {
      console.log("No bookings found for the guest");
      return [];
    }

    // Enrich bookings with cabin details
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        // Ensure booking is a plain JS object
        const plainBooking = booking.toObject();

        // console.log(booking.cabinId , "this is cabin id")

        // Fetch cabin details
        const { name, image } = await getOneCabin(booking.cabinId);

        // Return enriched booking
        return { ...plainBooking, cabin: { name, image } };
      })
    );

    // console.log("Enriched Bookings:", enrichedBookings);
    return JSON.parse(JSON.stringify(enrichedBookings));
  } catch (error) {
    console.error("Error in getGuestBookings:", error);
    throw new Error("Failed to fetch guest bookings");
  }
}

export async function getOneBooking(id) {
  try {
    await connectToDatabase();

    const booking = await Bookings.find({ id });

    // console.log("single Bookings ", booking);

    return booking[0];
  } catch (error) {
    console.log(error);
  }
}

export async function updateBooking(formData) {
  // const bookingId = Number(formData.get("bookingId"));
  const bookingId = formData.get("bookingId");

  // console.log(formData , "Form Data ");

  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  // const guestBookings = await getBookings(session.user.guestId);

  const guestBooking = await Bookings.findOne({
    _id: bookingId,
    guestId: session.user.guestId,
  });

  // console.log("booking to update ", guestBooking);

  // const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBooking)
    throw new Error("You are not allowed to delete this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const updatedBooking = await Bookings.findOneAndUpdate(
    { _id: bookingId },
    updateData,
    { new: true } // Return the updated document
  );

  if (!updatedBooking) {
    return res.status(500).json({ message: "Booking could not be updated" });
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const booking = await Bookings.findOneAndDelete({
    _id: bookingId,
    guestId: session.user.guestId, // Ensure user owns the booking
  });

  if (!booking) {
    throw new Error("You are not allowed to delete this booking");
  }

  // const { error } = await supabase
  //   .from("bookings")
  //   .delete()
  //   .eq("id", bookingId);

  // if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}
