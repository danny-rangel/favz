import Image from "next/image";

export default function AppBar() {
  return (
    <nav className="bg-transparent flex h-10 px-2 pt-6 pb-4 sm:py-8 md:py-10 container items-center text-md m-auto">
      <Image src="/logo.png" alt="favz" width={24} height={24}/>
      <div className="flex items-center text-white text-2xl font-sans">
        favz
      </div>
    </nav>
)}