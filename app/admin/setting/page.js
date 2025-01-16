import { getSettingsServer } from "@/lib/actions";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

const page = async () => {
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  } = await getSettingsServer();

  return (
    <section>
      <div className="flex justify-between gap-4">
      <h3 className="font-semibold text-2xl text-accent-400 mb-7">
        Setting For Booking
      </h3>
      <Link href='/admin/setting/edit'><PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" /></Link>
      </div>

      <div className="flex flex-col sm:grid grid-cols-2 gap-4 mt-6 sm:mt-4 2md:mt-0">
        <p className="flex gap-4 text-lg text-primary-200 max-sm:justify-between">
          Breakfast Price <span className="font-bold">{breakfastPrice}</span>
        </p>
        <p className="flex gap-4 text-lg text-primary-200 max-sm:justify-between">
        Min Booking Length <span className="font-bold">{minBookingLength}</span>
        </p>
        <p className="flex gap-4 text-lg text-primary-200 max-sm:justify-between">
        Max Booking Length <span className="font-bold">{maxBookingLength}</span>
        </p>
        <p className="flex gap-4 text-lg text-primary-200 max-sm:justify-between">
        Max Guest Per Booking <span className="font-bold">{maxGuestPerBooking}</span>
        </p>
      </div>
    </section>
  );
};

export default page;
