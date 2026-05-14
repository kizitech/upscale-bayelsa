"use client";

import { serviceCards, statsData } from "@/data/service-data";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export default function OurService() {
  return (
    <section className="w-full flex">
      <div className="max-w-7xl w-full flex flex-col md:items-center justify-center px-4 md:py-20 py-10 mx-auto">
        <h1 className="capitalize md:text-5xl text-3xl mt-4 font-medium">
          The <span className="text-green-950">services</span> we offer
        </h1>

        <p className="capitalize max-w-3xl text-sm md:text-center mt-4 font-medium text-black/70">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Ducimus at illo veniam ipsam quasi sequi laboriosam esse
          voluptas molestiae corrupti.
        </p>

        {/* cards */}
        <div className="flex w-full overflow-scroll cards items-center justify-center  gap-6 mt-16">
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className={`rounded-4xl overflow-hidden relative w-[18rem] flex flex-col gap-10 p-8 shrink-0 ${card.bgColor}`}
            >
              <div
                className={`rounded-lg w-full h-40 ${card.cardColor}`}
              ></div>

              <div className="flex justify-between items-center">
                <h3
                  className={`text-2xl font-medium max-w-20 ${card.textColor}`}
                >
                  {card.title}
                </h3>

                <button
                  className={`p-2 h-fit w-fit shrink-0 text-sm rounded-lg ${card.buttonColor} ${card.buttonTextColor}`}
                >
                  <ArrowUpRightIcon size={22} />
                </button>
              </div>

              <div className="absolute top-20 right-2">
                {card.path}
              </div>

              <div className="absolute -top-4 -left-4">
                {card.path}
              </div>
            </div>
          ))}
        </div>

        {/* stats */}
        <div className="grid max-md:grid-cols-2 grid-cols-4 w-full max-w-4xl gap-10 md:gap-20 mt-16">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <h1 className="md:text-4xl text-2xl text-green-950 font-bold">
                {stat.value}
              </h1>

              <p className="capitalize max-md:text-xs text-black/70 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}