"use client";

import { useState } from "react";
import { ArrowRightIcon, LightbulbIcon } from "@phosphor-icons/react";
import { whoWeAreData } from "@/data/who-are-we-data";


export default function WhoAreWe() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = whoWeAreData[activeIndex];

  return (
    <section className="w-full flex">
      <div className="max-w-7xl w-full max-md:flex-col flex rounded-xl items-start  gap-10 px-4 mx-auto">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col overflow-hidden gap-4 bg-black/10 md:pt-6 md:px-6 pt-4 px-4 rounded-3xl">
          
          <p className="uppercase text-green-950 text-sm font-semibold py-2 px-6 rounded-lg border border-green-950 w-fit">
            Who we are
          </p>

          <h1 className="capitalize md:text-5xl text-3xl font-medium">
            Driven by <span className="text-green-950">Compassion,</span>
            <br />
            Guided by Humanity
          </h1>

          {/* IMAGE + PILLS */}
          <div
            style={{
              backgroundImage: `url('${activeItem.image}')`,
            }}
            className="flex gap-4 flex-wrap bg-cover bg-center bg-black/30 min-h-64 rounded-t-3xl mt-4 w-full p-4 items-end transition-all duration-500"
          >
            {whoWeAreData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-green-950 text-white"
                    : "bg-white text-green-950"
                }`}
              >
                <p className="text-sm font-medium flex items-center justify-center h-full w-full">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex max-w-120 flex-1 gap-8 py-6 flex-col">
          
          <h1 className="capitalize md:text-3xl text-xl font-medium transition-all duration-300">
            {activeItem.title}
          </h1>

          <p className="max-md:text-sm text-black/70 transition-all duration-300">
            {activeItem.description}
          </p>

          <button className="flex w-fit overflow-hidden ease-in-out relative items-center group gap-2 bg-green-950 px-6 p-2 rounded-lg text-white font-medium">
            Learn More

            <span className="w-4">
              <ArrowRightIcon
                className="group-hover:translate-x-10 absolute top-2.5 translate-0 transition-transform duration-700 ease-in-out"
                size={22}
              />

              <LightbulbIcon
                className="group-hover:-translate-y-4 translate-y-6 absolute transition-transform duration-700 ease-in-out"
                size={32}
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}