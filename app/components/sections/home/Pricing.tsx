"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckIcon } from "@phosphor-icons/react";

import { pricingData } from "@/data/pricing-data";
import { usePricingInquiry } from "../../PricingInquiryProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
   const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { openInquiryModal } = usePricingInquiry();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children ?? [], {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      const cards = cardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null,
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="w-full ">
      <div className="max-w-7xl w-full mx-auto px-4 flex flex-col items-center">
        <div
          ref={headingRef}
          className="flex flex-col items-center gap-4 text-center mb-16"
        >
          <p className="uppercase text-green-950 text-sm font-semibold py-2 px-6 rounded-lg border border-green-950 w-fit">
            Packages
          </p>
          <h2 className="capitalize text-3xl md:text-5xl font-medium max-w-2xl">
            Pick the starting point that{" "}
            <span className="text-green-950">fits</span> your business
          </h2>
          <p className="max-w-2xl text-black/60 text-sm md:text-base font-medium">
            Every package builds toward the same goal — a business that&apos;s
            easy to find, easy to trust, and easy to reach.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full">
          {pricingData.map((tier, index) => (
            <div
              key={tier.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`
                relative
                flex
                flex-col
                gap-6
                rounded-4xl
                p-8
                transition-all
                duration-500
                ease-in-out
                ${
                  tier.featured
                    ? "bg-green-950 text-white md:-translate-y-4 shadow-xl shadow-green-950/20"
                    : "bg-green-100 text-green-950"
                }
              `}
            >
              {tier.featured && (
                <span className="absolute -top-4 left-8 rounded-lg bg-[#A3E635] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-green-950">
                  Most Popular
                </span>
              )}

              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold">{tier.name}</h3>
                <p
                  className={`text-sm font-medium ${
                    tier.featured ? "text-white/70" : "text-green-950/60"
                  }`}
                >
                  {tier.tagline}
                </p>
              </div>

              <div className="flex items-end gap-2">
                <span className="text-3xl md:text-4xl font-bold">
                  {tier.price !== "Custom" ? `₦${tier.price}` : tier.price}
                </span>
                <span
                  className={`text-xs mb-1 ${
                    tier.featured ? "text-white/60" : "text-green-950/50"
                  }`}
                >
                  {tier.cadence}
                </span>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm font-medium"
                  >
                    <CheckIcon
                      size={18}
                      weight="bold"
                      className={`mt-0.5 shrink-0 ${
                        tier.featured ? "text-white" : "text-green-950"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
               onClick={() => openInquiryModal(String(tier.id))}
                className={`
                  mt-2
                  px-6
                  py-3
                  rounded-lg
                  font-medium
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    tier.featured
                      ? "bg-white text-green-950 hover:bg-white/90"
                      : "bg-green-950 text-white hover:bg-green-900"
                  }
                `}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
