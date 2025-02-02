import SubmitButton from "@/components/SubmitButton";
import {
  getGuestBookings,
  getOneBooking,
  getOneCabin,
  updateBooking,
} from "@/lib/actions";
import { getBooking, getCabin } from "@/lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;

  const { numGuests, observations, cabinId } = await getOneBooking(bookingId);
  console.log("cabinID ", cabinId);
  const { maxCapacity } = await getOneCabin(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation <span className=" max-ms:hidden">#{bookingId}</span>
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-6 ms:py-8 px-4 ms:px-6 sm:px-10 2md:px-12 text-sm sm:text-lg flex gap-6 flex-col"
      >
        <input className="hidden" name="bookingId" value={bookingId} />
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            defaultValue={numGuests}
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
