// import { UsersIcon } from "@heroicons/react/24/solid";
// import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

function AdminCabinCard({ cabin }) {
  const { _id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border-primary-800 border">
      <div className="relative flex-1">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="border-r border-primary-800 object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex flex-col gap-3 mb-2">
            <p className="text-lg text-primary-200">
              Capacity <span className="font-bold">{maxCapacity}</span>
            </p>
            <p className="text-lg text-primary-200">
              Discount <span className="font-bold">{discount && 0}</span>
            </p>
            <p className="text-lg text-primary-200">
              Price <span className="font-bold">{regularPrice}</span>
            </p>
          </div>

          {/* <p className="flex gap-3 justify-start items-baseline">
            {discount > 0 ? (
            <>
              <span className="text-3xl font-[350]">
                Discount ${discount && 0}
              </span>
              <span className="line-through font-semibold text-primary-600">
                Price ${regularPrice}
              </span>
            </>
             ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )} 
            <span className="text-primary-200">/ night</span>
          </p> */}
        </div>
      </div>
      <div className="bg-primary-950 border-t border-t-primary-800 text-right">
        <Link
          href={`/admin/cabins/edit/${_id}`}
          className="border-l border-b border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default AdminCabinCard;

{
  /* <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${_id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div> */
}
