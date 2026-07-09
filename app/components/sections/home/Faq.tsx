"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlusIcon } from "@phosphor-icons/react";

import { faqData } from "@/data/faq-data";

gsap.registerPlugin(ScrollTrigger);

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqData)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-black/10 py-6">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="text-base md:text-xl font-medium text-black">
          {item.question}
        </span>

        <span
          className={`
            shrink-0
            flex
            items-center
            justify-center
            h-9
            w-9
            rounded-lg
            bg-green-950
            text-white
            transition-transform
            duration-300
            ease-in-out
            ${isOpen ? "rotate-45" : "rotate-0"}
          `}
        >
          <PlusIcon size={18} weight="bold" />
        </span>
      </button>

      <div
        className="grid transition-all duration-500 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="pt-4 pr-12 text-sm md:text-base leading-relaxed text-black/60">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openId, setOpenId] = useState<number | null>(faqData[0]?.id ?? null);

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

      gsap.from(listRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full ">
      <div className="max-w-5xl w-full mx-auto px-4 flex flex-col items-center">
        <div ref={headingRef} className="flex flex-col items-center gap-4 text-center mb-14">
          <p className="uppercase text-green-950 text-sm font-semibold py-2 px-6 rounded-lg border border-green-950 w-fit">
            FAQ
          </p>
          <h2 className="capitalize text-3xl md:text-5xl font-medium max-w-xl">
            Questions we hear <span className="text-green-950">often</span>
          </h2>
        </div>

        <div ref={listRef} className="w-full">
          {faqData.map((item) => (
            <FaqRow
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}