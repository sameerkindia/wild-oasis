"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
import cabinModel from "@/database/cabins.model";
import { connectToDatabase } from "./mongooes";
import Bookings from "@/database/booking.model";

export async function createBooking(bookingData, formData) {
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
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

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

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  // console.log(session)
  // console.log(session.user)
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // const [id , ...updatedFields] = formData
  // const id = formData.id;
  // const updatedFields = {numGuests : formData.numGuests , observations : formData.observations}

  // console.log(formData)
  // console.log("id ", formData.id)
  // console.log("updatedFields " , updatedFields)

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

// actions for Login and Logout

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

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
    const cabin = await cabinModel.findOne({ id: id });

    // console.log('Single Cabin ' , cabin)

    return cabin;
  } catch (error) {
    console.log("this is error from function ", error);
  }
}

// export async function getBookedDatesByCabinIdMDB(cabinId){

//   console.log("this is booked function " ,cabinId)

// }

// import { eachDayOfInterval } from 'date-fns';
// import BookingModel from '../models/Booking'; // Import your Mongoose Booking model

export async function getBookedDatesByCabinIdServer(cabinId) {
  try {
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
