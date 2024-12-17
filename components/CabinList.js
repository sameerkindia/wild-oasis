import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "@/components/CabinCard";
import { getCabins } from "@/lib/data-service";
import { getAllCabin } from "@/lib/actions";

async function CabinList({ filter }) {
  // noStore();

  // const newCabins = await getAllCabin();

  const cabins = await getAllCabin();

  // console.log('cabins from cabinList ',  newCabins)

  // const cabins = await getCabins();

  console.log('this ', cabins)

  if (!cabins) return null;

  let displayedCabins;

  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
