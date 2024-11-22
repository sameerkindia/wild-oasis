import Logo from "../components/Logo";
import Navigation from "../components/Navigation";

import {Josefin_Sans} from 'next/font/google'

const josefin = Josefin_Sans({subsets:["latin"], display:'swap'})

import "./../styles/globals.css"

export const metadata = {
  title: {
    template:"%s | The Wild Oasis",
    default:"Welcome | The Wild Oasis"
  },
  description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} bg-primary-950 min-h-screen text-primary-100`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
