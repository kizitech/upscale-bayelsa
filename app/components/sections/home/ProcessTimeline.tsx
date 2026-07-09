"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BRAND = "#032e15";

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "1",
    title: "Project Discovery Call",
    description:
      "Party we years to order allow asked of. We so opinion friends me message as delight.",
  },
  {
    number: "2",
    title: "Project Discovery Call",
    description:
      "His defective nor convinced residence own. Connection has put impossible own apartments boisterous.",
  },
  {
    number: "3",
    title: "Project Discovery Call",
    description:
      "From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly.",
  },
];

// Dot positions along the connector path, matched to each step's card position
const dotPositions = [
  { x: 130, y: 270 },
  { x: 480, y: 150 },
  { x: 800, y: 70 },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const desktopCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading + CTA intro
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

      // Draw the connecting line
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });
      }

      // Pop in dots in sequence
      const dots = dotRefs.current.filter(Boolean);
      if (dots.length) {
        gsap.from(dots, {
          scale: 0,
          transformOrigin: "center",
          duration: 0.5,
          ease: "back.out(3)",
          stagger: 0.5,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });
      }

      // Reveal each desktop step card
      desktopCardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.4 + i * 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });
      });

      // Reveal each mobile step card
      mobileCardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.4 + i * 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6  sm:pb-10 lg:px-16"
    >
      {/* Ambient background circle */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-10 hidden h-[420px] w-[420px] rounded-full opacity-[0.06] lg:block"
        style={{ backgroundColor: BRAND }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div ref={headingRef} className=" max-w-xl ">
          <p
            className="mb-3 text-sm font-medium tracking-widest"
            style={{ color: BRAND }}
          >
            STOCKIE OPERATION ACROSS THE WORLD
          </p>
          <h2 className="mb-4 text-3xl font-semibold capitalize leading-tight text-black sm:text-5xl">
            We have best team
            <br className="hidden sm:block" /> and best process
          </h2>
          <p className="mb-7 text-sm leading-relaxed text-slate-500 sm:text-base">
            Yet bed any for travelling assistance indulgence unpleasing. Not
            thoughts all exercise blessing. Indulgence way everything joy.
          </p>
          <button
            type="button"
            className="rounded-md px-7 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            style={{ backgroundColor: BRAND }}
          >
            Get Started
          </button>
        </div>

        {/* ---------- Desktop / tablet layout: wavy connector ---------- */}
        <div className="relative md:-mt-[7.5rem] hidden md:block">
          <svg
            viewBox="0 0 1000 420"
            className="pointer-events-none absolute -top-10 -rotate-[10deg] inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              ref={pathRef}
              d="M0,150 C55,185 70,255 130,270
                 C210,288 250,205 330,205
                 C410,205 405,150 480,150
                 C570,150 555,235 645,225
                 C735,215 705,95 800,70
                 C825,63 850,70 875,58"
              fill="none"
              stroke={BRAND}
              strokeWidth="3"
              strokeLinecap="round"
            />
            
          </svg>

          <div
            className="relative grid grid-cols-3 gap-8"
            style={{ height: 420 }}
          >
            {/* Step 1 */}
            <div
              ref={(el) => {
                desktopCardRefs.current[0] = el;
              }}
              className="relative"
              style={{ top: 270 }}
            >
              <div className="absolute -top-10 left-14 h-14 w-14 p-4  rounded-xl bg-white">
                <div className="h-full w-full rounded-xl bg-gray-300"></div>
              </div>

              <span
                aria-hidden
                className="absolute -left-2 -top-6 select-none text-7xl font-black leading-none text-gray-500"
              >
                1
              </span>
              <div className="relative max-w-[260px] pt-16">
                <h3 className="mb-2 text-base font-bold text-slate-900">
                  {steps[0].title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {steps[0].description}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              ref={(el) => {
                desktopCardRefs.current[1] = el;
              }}
              className="relative"
              style={{ top: 150 }}
            >
              <div className="absolute -top-12 left-20 h-14 w-14 rounded-lg p-4 bg-white">
                <div className="h-full w-full rounded-xl bg-gray-300"></div>
              </div>

              <span
                aria-hidden
                className="absolute -left-2 -top-4 select-none text-7xl font-black leading-none text-gray-500"
              >
                2
              </span>
              <div className="relative max-w-[260px] pt-16">
                <h3 className="mb-2 text-base font-bold text-slate-900">
                  {steps[1].title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {steps[1].description}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              ref={(el) => {
                desktopCardRefs.current[2] = el;
              }}
              className="relative"
              style={{ top: 70 }}
            >
              <div className="absolute -top-20 left-6 h-14 w-14 rounded-lg p-4 bg-white">
                <div className="h-full w-full rounded-xl bg-gray-300"></div>
              </div>

              <span
                aria-hidden
                className="absolute -left-2 -top-4 select-none text-7xl font-black leading-none text-gray-500"
              >
                3
              </span>
              <div className="relative max-w-[260px] pt-16">
                <h3 className="mb-2 text-base font-bold text-slate-900">
                  {steps[2].title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {steps[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Mobile layout: simple vertical timeline ---------- */}
        <div className="relative mt-14 md:hidden">
          <div
            aria-hidden
            className="absolute bottom-0 left-[13px] top-0 w-[2px]"
            style={{ backgroundColor: BRAND }}
          />
          <ul className="space-y-10">
            {steps.map((step, i) => (
              <li
                key={step.number}
                ref={(el) => {
                  mobileCardRefs.current[i] = el;
                }}
                className="relative pl-10"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-slate-200 shadow"
                />
                <h3 className="mb-1.5 text-base font-bold text-black">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}