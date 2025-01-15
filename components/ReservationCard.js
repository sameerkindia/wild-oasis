import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Link from "next/link";
import Image from "next/image";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

async function ReservationCard({ booking, onDelete }) {
  const {
    _id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabin:{ name, image }
  } = booking;

  let imageData = image?.data?.toString("base64");


  return (
    <div className="flex border border-primary-800 max-sm:flex-col relative">
      <div className="relative h-32 aspect-square">
        <Image src={`data:image/png;base64,${imageData}`} fill alt={`Cabin ${name}`} className="border-r border-primary-800 object-cover" />
      </div>

      <div className="flex-grow px-4 ms:px-6 py-3 flex flex-col gap-2 2md:gap-0">
        <div className="flex justify-between">
          <h3 className="text-lg sm:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-min ms:h-7 max-ms:p-2 px-3 uppercase text-[10px] ms:text-xs font-bold flex items-center rounded-sm max-ms:absolute top-4 right-4">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-min ms:h-7 max-ms:p-2 px-3  uppercase text-[10px] ms:text-xs font-bold flex items-center rounded-sm max-ms:absolute top-4 right-4">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm ms:text-base sm:text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-3 ms:gap-5 mt-auto items-baseline max-sm:flex-wrap">
          <p className="text-lg sm:text-xl font-semibold text-accent-400">${totalPrice}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-base sm:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex max-sm:ml-auto sm:flex-col sm:border-l border-primary-800 sm:w-[100px]">
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${_id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 sm:border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 max-sm:p-4"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={_id} onDelete={onDelete} customClass="max-sm:p-4" />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
