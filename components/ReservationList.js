'use client'

import { deleteReservation } from "@/lib/actions";
import ReservationCard from "./ReservationCard";
import {useOptimistic} from 'react'

function ReservationList({ bookings }) {

  const [optimisticBooking, optimisticDelete] = useOptimistic(bookings , (curBooking, bookingId)=>{
    return curBooking.filter(booking => booking._id != bookingId)})

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId)
    await deleteReservation(bookingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard booking={JSON.parse(JSON.stringify(booking))} key={booking._id} onDelete={handleDelete} />
      ))}
    </ul>
  );
}

export default ReservationList;
