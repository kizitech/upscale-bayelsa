"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import CircularBadge from "../../CircularBadge";

export default function HeroSection() {
  return (
    <>
      <section className="flex w-full relative  h-dvh">
        <div className=" bg-[url('/grid-layout.png')] opacity-5 bg-contain absolute top-0 left-0 w-full h-full z-10"></div>
        <div className="flex flex-col items-center justify-center relative z-20 w-full h-full">
          <p className="uppercase text-black/60 md:text-sm text-xs font-medium ">
            Consulting, Programming & design
          </p>
          <h1 className="md:text-7xl text-2xl text-center mt-4 font-semibold">
            <div className="flex gap-4 text-center justify-center items-center">
              We support
              <span className="bg-green-950 ease-in-out relative gap-4 hover:rounded-r-none duration-300 shrink-0 cursor-pointer text-sm rounded-lg md:h-10 md:w-10 h-8 w-8 m-0 font-semibold group flex items-center text-white justify-center overflow-visible">
                <span className="max-w-0 left-full absolute -translate-x-3 group-hover:translate-x-0 overflow-hidden group-hover:max-w-xs text-nowrap flex h-full items-center group-hover:pr-6 ease-in-out duration-500 bg-green-950 rounded-r-lg">
                  What we offer
                </span>
                <ArrowUpRightIcon size={22} />
              </span>
            </div>
            <div className="flex items-center justify-center md:-mt-6 -mt-2 text-6xl md:text-[10rem]">
              gr
              <div className="bg-linear-90 cursor-pointer from-white to-90% to-green-950 flex items-center h-fit p-2 md:p-5 rounded-full md:w-48 w-24 md:mt-10 mt-5">
                <div className="bg-white rounded-full relative md:p-6 p-2 w-full">
                  <div className="absolute  -left-1 md:-top-2 -top-1.5  md:h-16 md:w-16 h-7 w-7 bg-white rounded-full border border-black/10 shadow shadow-black/20 "></div>
                </div>
              </div>
              wth
            </div>
            of your business
          </h1>

          <p className="text-black/70 text-center mt-6 md:mt-10 md:text-sm text-xs font-medium">
            We want to help your business gain more visibility. <br />
            We focus on development with the understanding of your business
          </p>

          <button className="px-6 py-2 text-white bg-green-950 rounded-lg mt-10">
            Estimate the project
          </button>
        </div>

        <CircularBadge/>
      </section>
    </>
  );
}
