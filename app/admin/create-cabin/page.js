import SubmitButton from '@/components/SubmitButton';
import { createCabin } from '@/lib/cabin-action';
import React from 'react'

const page = () => {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Create Cabin
      </h2>

      <form
        action={createCabin}
        className="bg-primary-900 py-8 px-6 sm:px-10 2md:px-12 text-sm sm:text-lg flex gap-6 flex-col"
      >
        {/* <input className="hidden" name="_id" value={id} /> */}

        <div className="space-y-2">
          <label htmlFor="numGuests">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="maxCapacity">guests</label>
          <input
            type="number"
            name="maxCapacity"
            id="maxCapacity"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="regularPrice">Regular Price</label>
          <input
            type="number"
            name="regularPrice"
            id="regularPrice"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            name="discount"
            id="discount"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        {/* <div className="space-y-2">
          <ImageUpload />
        </div> */}

        <div className="space-y-2">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            // onChange={handleImageChange}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description">description</label>
          <textarea
            name="description"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Creating...">
            Create cabin
          </SubmitButton>

          {/* <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update reservation
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default page