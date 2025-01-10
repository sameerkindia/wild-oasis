import { getSettingsServer } from "@/lib/actions";
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
      <div className="flex items-center justify-between gap-4">
      <h3 className="font-semibold text-2xl text-accent-400 mb-7">
        Setting For Booking
      </h3>
      <Link href='/admin/setting/edit'>Edit</Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <p className="flex gap-4 text-lg text-primary-200">
          Breakfast Price <span className="font-bold">{breakfastPrice}</span>
        </p>
        <p className="flex gap-4 text-lg text-primary-200">
        Min Booking Length <span className="font-bold">{minBookingLength}</span>
        </p>
        <p className="flex gap-4 text-lg text-primary-200">
        Max Booking Length <span className="font-bold">{maxBookingLength}</span>
        </p>
        <p className="flex gap-4 text-lg text-primary-200">
        Max Guest Per Booking <span className="font-bold">{maxGuestPerBooking}</span>
        </p>
      </div>
    </section>
  );
};

export default page;
