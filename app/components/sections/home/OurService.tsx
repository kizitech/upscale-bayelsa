"use client";

import Path1 from "@/public/path1";
import Path2 from "@/public/path2";
import Path4 from "@/public/path4";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export default function OurService() {
  return (
    <>
      <section className="w-full flex">
        <div className="max-w-7xl w-full flex flex-col items-center justify-center  px-4 md:py-20 py-10 mx-auto ">
          <h1 className="capitalize md:text-5xl text-3xl mt-4 font-medium">
            The <span className="text-green-950">services</span> we offer
          </h1>
          <p className="uppercase max-w-3xl text-sm text-center mt-4 font-medium text-black/70">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus at
            illo veniam ipsam quasi sequi laboriosam esse voluptas molestiae
            corrupti.
          </p>

          <div className="flex w-fit gap-6 mt-16">
            <div className="rounded-4xl overflow-hidden bg-[#F4D06F] relative w-[18rem] flex flex-col gap-10 p-8 ">
              <div className="rounded-lg w-full h-40 bg-[#1F1300] "></div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl text-[#1F1300] font-medium max-w-20">
                  Personalized Program
                </h3>
                <button className="p-2 bg-[#1F1300] h-fit w-fit shrink-0 text-sm text-white rounded-lg">
                  <ArrowUpRightIcon size={22} />
                </button>
              </div>
              <div className="absolute top-14 right-4">
                <Path1 />
              </div>
              <div className="absolute -top-4 -left-4">
                <Path1 />
              </div>
            </div>

            <div className="rounded-4xl bg-lime-400 overflow-hidden w-[18rem] flex flex-col gap-10 p-8 relative ">
              <div className="rounded-lg w-full h-40 bg-green-950 "></div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl text-green-950 font-medium max-w-20">
                  Personalized Program
                </h3>
                <button className="p-2 bg-green-950 h-fit w-fit shrink-0 text-sm text-white rounded-lg">
                  <ArrowUpRightIcon size={22} />
                </button>
              </div>

              <div className="absolute top-14 right-4">
                <Path2 />
              </div>
              <div className="absolute -top-4 -left-4">
                <Path2 />
              </div>
            </div>

            <div className="rounded-4xl relative bg-green-950 w-[18rem] flex flex-col gap-10 p-8 overflow-hidden ">
              <div className="rounded-lg w-full h-40 bg-lime-400 "></div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl text-white font-medium max-w-20">
                  Personalized Program
                </h3>
                <button className="p-2 bg-lime-400 h-fit w-fit shrink-0 text-sm text-green-950 rounded-lg">
                  <ArrowUpRightIcon size={22} />
                </button>
              </div>

              <div className="absolute top-26 right-2">
                <Path4 />
              </div>
              <div className="absolute -top-4 -left-4">
                <Path4 />
              </div>
            </div>
          </div>

          <div className="flex gap-20 mt-16">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl text-green-950 font-bold">123</h1>
              <p className="capitalize font-medium ">Lorem, ipsum dolor.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl text-green-950 font-bold">123</h1>
              <p className="capitalize font-medium ">Lorem, ipsum dolor.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl text-green-950 font-bold">123</h1>
              <p className="capitalize font-medium ">Lorem, ipsum dolor.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl text-green-950 font-bold">123</h1>
              <p className="capitalize font-medium ">Lorem, ipsum dolor.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
