"use client"

import { TextAlignRightIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
     <header className=" ">
       <nav className="flex items-center justify-between max-w-7xl  w-full  absolute z-100 top-0 left-0 right-0 mx-auto py-4 md:px-12 px-6">
        <ul className="flex gap-8 items-center max-md:hidden">
          <li>
            <Link className="hover:underline  text-black/70 hover:text-green-950 ease-in-out duration-300 cursor-pointer" href="/">What We Offer</Link>
          </li>
          <li>
            <Link className="hover:underline text-black/70 hover:text-green-950 ease-in-out duration-300 cursor-pointer" href="/">Pricing</Link>
          </li>
        </ul>
        <div className="h-[80px] w-[350px] overflow-hidden flex items-center justify-center"> 
          <Image src="/wordmark.png" alt="Upscale" width={700} height={300} />
        </div>
        <Link className="hover:underline text-black/70 hover:text-green-950 ease-in-out duration-300 cursor-pointer max-md:hidden" href="/" >Contact Us</Link>

        <div className="relative md:hidden">
            <button onToggle={()=> setIsOpen(!isOpen)} className="">
            <TextAlignRightIcon size={32} />
        </button>

        </div>

        {isOpen && (
        <div className="absolute top-full h-100 w-[80%] rounded-lg bg-white right-4"></div>
        )}


      </nav>
      {isOpen && (
        <div className="h-dvh w-full absolute top-0 left-0 backdrop-blur-xs bg-black/10 z-30"></div>
      )}
     </header>
    </>
  );
}
