import ImageUpload from "@/components/ImageUpload";
import SubmitButton from "@/components/SubmitButton";
import {
  getGuestBookings,
  getOneBooking,
  getOneCabin,
  updateBooking,
} from "@/lib/actions";
import { getBooking, getCabin } from "@/lib/data-service";

export default async function Page({ params }) {
  const { id } = params;

  const { name, regularPrice, discount, maxCapacity, description, image } = await getOneCabin(
    id
  );

  // CHANGE
  // const maxCapacity = cabin.maxCapacity;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Cabin Id #{id}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input className="hidden" name="_id" value={id} />

        <div className="space-y-2">
          <label htmlFor="numGuests">Name</label>
          <input
            type="text"
            defaultValue={name}
            name="name"
            id="name"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="maxCapacity">guests</label>
          <input
            type="number"
            defaultValue={maxCapacity}
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
            defaultValue={regularPrice}
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
            defaultValue={discount}
            name="discount"
            id="discount"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <ImageUpload previewImage={image} />
        </div>

        <div className="space-y-2">
          <label htmlFor="description">description</label>
          <textarea
            name="description"
            defaultValue={description}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>

          {/* <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update reservation
          </button> */}
        </div>
      </form>
    </div>
  );
}

{
  /* <select
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
          </select> */
}
