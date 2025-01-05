import AdminCabinCard from '@/components/AdminCabinCard'
import { getAllCabin } from '@/lib/actions'
import React from 'react'

const page = async () => {

  const cabins = await getAllCabin()

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        All Cabins
      </h2>

      {cabins.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <>
        <ul className="space-y-6">
          {cabins.map(cabin => <AdminCabinCard key={cabin._id} cabin={cabin} />)}
        </ul>
        </>
      )}
    </div>
  )
}

export default page