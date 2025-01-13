
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import { auth } from "@/lib/auth";
import { getBookedDatesByCabinIdMDB, getBookedDatesByCabinIdServer, getSettingsServer } from "@/lib/actions";


async function Reservation({ cabin }) {

  const [settings, bookedDates] = await Promise.all([
    getSettingsServer(),
    getBookedDatesByCabinIdServer(cabin._id)
  ]);

  const session = await auth();

  return (
    <div className="flex flex-col max-2md:gap-8 2md:grid grid-cols-2 border border-primary-800 min-h-[400px]">
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
