'use client'

import { deleteReservation } from "@/lib/actions";
import ReservationCard from "./ReservationCard";
import {useOptimistic} from 'react'

function ReservationList({ bookings }) {

  const [optimisticBooking, optimisticDelete] = useOptimistic(bookings , (curBooking, bookingId)=>{ return curBooking.filter(booking => booking.id !== bookingId)})

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId)
    await deleteReservation(bookingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default ReservationList;
