
import AdminNavigation from "@/components/AdminNavigation";
import AdminRoute from "@/components/AdminRoute";

export const metadata = {
  title: "Reservations",
};

export default function Layout({ children }) {
  return (
    <AdminRoute>
      <div className="flex gap-4 2md:gap-12 2md:grid grid-cols-[16rem_1fr] h-full relative">
        <AdminNavigation />
        <div className="py-1 max-2md:grow">{children}</div>
      </div>
    </AdminRoute>
  );
}
