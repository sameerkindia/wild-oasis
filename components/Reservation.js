
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import { auth } from "@/lib/auth";
import { getBookedDatesByCabinIdMDB, getBookedDatesByCabinIdServer } from "@/lib/actions";
// import { getBookedDatesByCabinId } from "@/lib/actions";

async function Reservation({ cabin }) {

  

  // console.log('this is Cabin => ', cabin)
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinIdServer(cabin.id)
  ]);

  // const thisData = await getBookedDatesByCabinIdServer(cabin.id);

  // console.log("this Data  " , thisData)

  // getBookedDatesByCabinId(cabin.id),

  // console.log(bookedDates)

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
