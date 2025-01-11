import { auth } from "@/lib/auth";
import Logo from "./Logo";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";


async function Header() {
  const session = await auth();

  return (
    <header className='border-b border-primary-900 px-8 py-5 overflow-x-hidden'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo />
        <Navigation />
        <MobileNavigation session={session} />
      </div>
    </header>
  );
}

export default Header;
