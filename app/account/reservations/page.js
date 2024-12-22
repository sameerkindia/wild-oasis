import ReservationList from "@/components/ReservationList";
import { getGuestBookings } from "@/lib/actions";
import { auth } from "@/lib/auth";
// import ReservationCard from "../../../components/ReservationCard";
import { getBookings } from "@/lib/data-service";

export default async function Page() {
  const session = await auth();
  // console.log(session)
  // const bookings = await getBookings(session.user.guestId)
  const bookings = await getGuestBookings(session.user.guestId)

  // const plainBookings = JSON.parse(JSON.stringify(bookings))

  console.log("Guest bookings ", bookings)

  // CHANGE
  // const bookings = [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <>
        <ReservationList bookings={bookings} />
        </>
      )}
    </div>
  );
}
