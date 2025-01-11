import SubmitButton from '@/components/SubmitButton';
import { getSettingsServer, updateSettings} from '@/lib/actions';
// import { updateSettings } from '@/lib/cabin-action';
import React from 'react'

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
        Update settings
      </h3>
      </div>

      <form
        action={updateSettings}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >

        <div className="space-y-2">
          <label htmlFor="minBookingLength">Min Booking Length</label>
          <input
            type="number"
            defaultValue={minBookingLength}
            name="minBookingLength"
            id="minBookingLength"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="maxBookingLength">Max Booking Length</label>
          <input
            type="number"
            defaultValue={maxBookingLength}
            name="maxBookingLength"
            id="maxBookingLength"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="maxGuestPerBooking">Max Guest Per Booking</label>
          <input
            type="number"
            defaultValue={maxGuestPerBooking}
            name="maxGuestPerBooking"
            id="maxGuestPerBooking"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="breakfastPrice">Breakfast Price</label>
          <input
            type="number"
            defaultValue={breakfastPrice}
            name="breakfastPrice"
            id="breakfastPrice"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update setting
          </SubmitButton>

        </div>
      </form>
    </section>
  )
}

export default page