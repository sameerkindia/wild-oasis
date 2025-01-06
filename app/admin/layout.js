// import AdminNavigation from "@/components/adminNavigation";
// import SideNavigation from "@/components/SideNavigation";

import AdminNavigation from "@/components/AdminNavigation"

  export const metadata = {
    title: 'Reservations'
  }


export default function Layout({children}){
  return <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
    <AdminNavigation />
    <div className="py-1">{children}</div>
  </div>
}