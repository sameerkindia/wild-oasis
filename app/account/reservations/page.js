import ReservationList from "@/components/ReservationList";
import { getGuestBookings } from "@/lib/actions";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth();
  const bookings = await getGuestBookings(session.user.guestId)


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
