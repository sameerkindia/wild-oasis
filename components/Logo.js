import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <div className="relative h-12 w-12 sm:h-[60px] sm:w-[60px]">
      <Image src="/logo.png" fill alt="The Wild Oasis logo" />
      </div>
      <span className="text-lg sm:text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
