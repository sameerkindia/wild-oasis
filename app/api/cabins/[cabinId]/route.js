import { getBookedDatesByCabinIdServer, getOneCabin } from "@/lib/actions";
// import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";

export async function GET(request , {params}) {

  const {cabinId} = params;

  try{
    const [cabin, bookedDates] = await Promise.all([getOneCabin(cabinId), getBookedDatesByCabinIdServer(cabinId)])

    return Response.json({cabin,bookedDates})
  } catch {
    return Response.json({message: "Cabin not found"})
  }

  // console.log(request)
  // console.log('params ' , params)

  // return Response.json({text: "test"});
}