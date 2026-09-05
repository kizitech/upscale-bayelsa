"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useServiceModal } from "../../ServiceModalContext";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { openModal } = useServiceModal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bannerRef.current, {
        scale: 0.94,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(contentRef.current?.children ?? [], {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full ">
      <div className="max-w-7xl w-full mx-auto px-4">
        <div
          ref={bannerRef}
          className="relative overflow-hidden rounded-4xl bg-green-950 px-4 py-10 md:px-20 md:py-24 flex flex-col items-center text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 md:top-0 top-10 opacity-10 md:opacity-20"
          >
            <Image src={`/squigle.png`} alt='#' quality={100} width={3000} height={2500} className=" md:rotate-120 scale-150 h-full w-full object-contain scale-100" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-50 -top-50 opacity-0 md:opacity-20"
          >
            <Image src={`/squigle.png`} alt='#' quality={100} width={3000} height={2500} className=" -rotate-10 scale-150 h-full w-full object-contain scale-100" />
          </div>

          <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-4 max-w-2xl">
            <p className="uppercase text-white/70 text-sm font-medium tracking-widest">
              Let&apos;s get you found
            </p>

            <h2 className="capitalize text-2xl md:text-5xl font-medium text-white leading-tight">
              Your next customer is already searching for you
            </h2>

            <p className="text-white/70 text-sm md:text-base font-medium max-w-lg">
              A website, a Maps listing, and social accounts that actually
              agree with each other. Let&apos;s build the version of your business
              people can find.
            </p>

            <button
              onClick={() => openModal()}
              className="mt-2 flex cursor-pointer items-center gap-2 px-7 py-3 text-green-950 bg-white rounded-lg font-medium transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Estimate the project
              <ArrowUpRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}