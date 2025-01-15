import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  // console.log("this is CAbin Card ", cabin);
  const { _id, name, maxCapacity, regularPrice, discount, image } = cabin;

  let imageData = image?.data?.toString("base64");

  return (
    <div className="flex 2md:flex-row flex-col border-primary-800 border">
      <div className="relative h-40 2md:h-[unset] w-full 2md:w-40">
        <Image src={`data:image/png;base64,${imageData}`} fill alt={`Cabin ${name}`} className="border-r border-primary-800 object-cover" />
      </div>
      
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-4 ms:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-xl desktop:text-2xl mb-3">
            {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-base desktop:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl desktop:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl desktop:text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${_id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900 text-sm desktop:base"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
