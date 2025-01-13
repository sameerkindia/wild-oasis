import SideNavigation from "@/components/SideNavigation";

  export const metadata = {
    title: 'Reservations'
  }


export default function Layout({children}){
  return <div className="flex gap-4 2md:gap-12 2md:grid grid-cols-[16rem_1fr] h-full relative">
    <SideNavigation />
    <div className="py-1">{children}</div>
  </div>
}