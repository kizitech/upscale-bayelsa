"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
          className="relative overflow-hidden rounded-4xl bg-green-950 px-6 py-16 md:px-20 md:py-24 flex flex-col items-center text-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -bottom-32 h-80 w-80 rounded-full bg-white/5"
          />

          <div ref={contentRef} className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
            <p className="uppercase text-white/70 text-sm font-medium tracking-widest">
              Let&apos;s get you found
            </p>

            <h2 className="capitalize text-3xl md:text-5xl font-medium text-white leading-tight">
              Your next customer is already searching for you
            </h2>

            <p className="text-white/70 text-sm md:text-base font-medium max-w-lg">
              A website, a Maps listing, and social accounts that actually
              agree with each other. Let&apos;s build the version of your business
              people can find.
            </p>

            <button className="mt-2 flex items-center gap-2 px-7 py-3 text-green-950 bg-white rounded-lg font-medium transition-transform duration-200 hover:scale-[1.03] active:scale-95">
              Estimate the project
              <ArrowUpRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}