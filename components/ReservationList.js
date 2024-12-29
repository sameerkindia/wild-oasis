'use client'

import { deleteReservation } from "@/lib/actions";
import ReservationCard from "./ReservationCard";
import {useOptimistic} from 'react'

function ReservationList({ bookings }) {

  console.log(bookings , " this is bookings from reservation")

  const [optimisticBooking, optimisticDelete] = useOptimistic(bookings , (curBooking, bookingId)=>{
    // console.log(typeof bookingId , " this is booking id from useOptimistic hook")
    // console.log( typeof curBooking[1]._id, "This is currunt booking")
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
