import Image from "next/image";

export default function AppBar() {
  return (
    <nav className="bg-transparent flex h-12 px-2 container items-center text-md m-auto">
      <Image src="/logo.png" alt="favz" width={24} height={24}/>
      <div className="flex items-center text-white text-2xl font-sans">
        favz
      </div>
    </nav>
)}