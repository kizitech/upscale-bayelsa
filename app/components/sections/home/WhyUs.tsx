"use client";

import { whyUsData } from "@/data/why-us-data";

export default function WhyUs() {
  return (
    <>
      <section className="w-full flex">
        <div className="max-w-7xl w-full flex flex-col gap-20 px-4 py-10 mx-auto ">
          <div className="flex justify-between max-md:flex-col gap-10 items-end">
            <div className="flex gap-4 flex-col">
              <h2 className="capitalize text-green-950 text-5xl font-medium ">
                Why choose us?
              </h2>
              <p className="text-lg bg-red font-medium max-w-3xl text-black/60 w-full">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Praesentium error expedita impedit aut facilis. Nesciunt
                mollitia praesentium molestiae blanditiis suscipit, unde quod
                laboriosam magnam nobis. Sunt iure voluptatem molestiae hic.
              </p>
            </div>

            <button className="px-6 py-2 font-medium text-white bg-green-950 rounded-lg shrink-0 h-fit">
              Get Started
            </button>
          </div>

          <div className="grid md:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 ">
            {whyUsData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="flex flex-col cursor-pointer justify-between gap-4 rounded-lg text-green-950 group hover:bg-green-950 hover:text-white bg-green-100 md:p-6 p-4 ease-in-out duration-500 delay-100"
                >
                  <Icon size={40} />

                  <h3 className="text-4xl">{item.title}</h3>

                  <p className="font-medium">{item.description}</p>

                  <button className="mt-4 px-6 py-2 text-white group-hover:bg-green-100 group-hover:text-green-950 font-medium bg-green-950 rounded-lg shrink-0 h-fit ease-in-out duration-300">
                    {item.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
