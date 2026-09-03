"use client";

import { whyUsData } from "@/data/why-us-data";

export default function WhyUs() {
  return (
    <>
      <section className="w-full flex">
        <div className="max-w-7xl w-full flex flex-col gap-20 px-4 mx-auto ">
          <div className="flex justify-between max-md:flex-col gap-4 md:items-end">
            <div className="flex gap-4 flex-col">
              <h2 className="capitalize text-green-950 md:text-5xl text-2xl font-medium ">
                Why choose us?
              </h2>
              <p className="md:text-lg text-sm font-medium max-w-3xl text-black/60 w-full">
                We design and build websites for businesses & individuals that want to be
                found. Every site comes with local SEO,
                Google Maps optimization, integrated contact details and
                social links, plus ongoing support so your business looks
                good and shows up when people search for it.
              </p>
            </div>

            <button className="px-6 py-2 font-medium text-white w-fit bg-green-950 rounded-lg shrink-0 h-fit">
              Request a Quote
            </button>
          </div>

          <div className="grid md:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 ">
            {whyUsData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="relative overflow-hidden flex flex-col cursor-pointer justify-between gap-4 rounded-lg text-green-950 group hover:bg-green-950 hover:text-white bg-green-100 md:p-6 p-4 ease-in-out duration-500 delay-100"
                >
                  <div className="pointer-events-none absolute inset-0 text-current opacity-[0.14] group-hover:opacity-[0.26] transition-opacity duration-1000">
                    {item.pattern}
                  </div>

                  <div className="relative z-10 flex flex-col justify-between gap-4 h-full">
                    <Icon size={40} className="max-md:size-8" />

                    <h3 className="md:text-4xl text-3xl">{item.title}</h3>

                    <p className="font-medium">{item.description}</p>

                    <button className="mt-4 md:mt-12 px-6 py-2 text-white group-hover:bg-green-100 group-hover:text-green-950 font-medium bg-green-950 rounded-lg shrink-0 h-fit ease-in-out duration-300 w-fit">
                      {item.buttonText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}