import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import TextExpander from "@/components/TextExpander";
import { getAllCabin, getOneCabin } from "@/lib/actions";
import {
  getBookedDatesByCabinId,
  getCabin,
  getCabins,
  getSettings,
} from "@/lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

// PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
// };

// export const revalidate = 0;

export async function generateMetadata({ params }) {
  // const { name } = await getCabin(params.cabinId);
  const { name } = await getOneCabin(params.cabinId);
  // const cabin = await getOneCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  // const cabins = await getCabins();
  const cabins = await getAllCabin();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getOneCabin(params.cabinId);

  const { _id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  let imageData = image?.data?.toString("base64");

  const plainCabin = JSON.parse(JSON.stringify(cabin))


  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex flex-col sm:grid grid-cols-[3fr_4fr] gap-10 sm:gap-14 2md:gap-20 border border-primary-800 py-3 px-4 sm:px-10 mb-14 sm:mb-24">
        <div className="relative scale-[1.15] max-sm:h-60 max-sm:w-full sm:-translate-x-3">
          {/* <Image
            fill
            src={image}
            alt={`Cabin ${name}`}
            className="object-cover"
          /> */}

          <Image src={`data:image/png;base64,${imageData}`} fill alt={`Cabin ${name}`} className="border-r border-primary-800 object-cover" />

        </div>

        <div>
          <h3 className="text-accent-100 font-black text-4xl sm:text-6xl 2md:text-7xl mb-3 sm:mb-5 sm:translate-x-[-254px] bg-primary-950 sm:p-6 pb-1 sm:w-[150%]">
            {name}
          </h3>

          <p className="text-base sm:text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-base sm:text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-base sm:text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-base sm:text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-3xl sm:text-4xl 2md:text-5xl font-semibold text-center mb-10 text-accent-400 text-pretty">
          Reserve {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={plainCabin} />
        </Suspense>
      </div>
    </div>
  );
}
