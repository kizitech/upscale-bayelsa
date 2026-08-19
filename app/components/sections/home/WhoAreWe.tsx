"use client";

import { ClipboardTextIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Wide, horizontal-flowing path — used on md+ where the section is short and wide.
const SQUIGGLE_PATH_HORIZONTAL =
  "M-50,220 C60,40 140,380 230,230 \
   C270,160 250,90 300,90 \
   C360,90 380,170 320,220 \
   C270,260 250,220 280,180 \
   C320,130 420,60 520,220 \
   C600,340 680,40 760,120 \
   C800,160 800,230 760,250 \
   C710,275 690,210 730,175 \
   C775,135 850,140 900,220 \
   C970,335 1040,60 1120,190 \
   C1170,270 1200,220 1250,230";

// Tall, vertical-flowing path — authored from scratch for a narrow, tall
// viewBox so it reads as an intentional vertical squiggle, not a stretched
// horizontal one. Same rhythm of loops/curls, just running top to bottom.
const SQUIGGLE_PATH_VERTICAL =
  "M220,-50 C40,60 380,140 230,230 \
   C160,270 90,250 90,300 \
   C90,360 170,380 220,320 \
   C260,270 220,250 180,280 \
   C130,320 60,420 220,520 \
   C340,600 40,680 120,760 \
   C160,800 230,800 250,760 \
   C275,710 210,690 175,730 \
   C135,775 140,850 220,900 \
   C335,970 60,1040 190,1120 \
   C270,1170 220,1200 230,1250";

export default function WhoAreWe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [drawProgress, setDrawProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let ticking = false;
    let rafId = 0;

    const updateProgress = () => {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;

      if (prefersReducedMotion) {
        setDrawProgress(1);
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const start = viewportHeight;
      const end = -rect.height * 0.65;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.min(1, Math.max(0, raw));

      setDrawProgress(clamped);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    rafId = requestAnimationFrame(updateProgress);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const dashOffset = 1 - drawProgress;

  return (
    <section ref={sectionRef} className="w-full flex relative overflow-hidden">
      {/* Squiggly accent line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Vertical squiggle — mobile/tablet only, its own authored path */}
        <svg
          viewBox="0 0 400 1200"
          preserveAspectRatio="xMidYMid slice"
          className="block md:hidden absolute inset-0 w-full h-full"
          fill="none"
        >
          <defs>
            <linearGradient
              id="squiggleGradientV"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#032e15" />
              <stop offset="45%" stopColor="#032e15" />
              <stop offset="100%" stopColor="#A3E635" />
            </linearGradient>
            <filter
              id="squiggleShadowV"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
          </defs>

          <path
            d={SQUIGGLE_PATH_VERTICAL}
            stroke="#052e16"
            strokeWidth="42"
            strokeLinecap="round"
            filter="url(#squiggleShadowV)"
            opacity="0.3"
            transform="translate(6,10)"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={dashOffset}
          />

          <path
            d={SQUIGGLE_PATH_VERTICAL}
            stroke="url(#squiggleGradientV)"
            strokeWidth="42"
            strokeLinecap="round"
            className="opacity-80"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={dashOffset}
          />

          <path
            d={SQUIGGLE_PATH_VERTICAL}
            stroke="#dcfce7"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.35"
            transform="translate(-2,-3)"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={dashOffset}
          />
        </svg>

        {/* Horizontal squiggle — desktop only, original wide path */}
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="hidden md:block absolute inset-0 w-full h-full mt-20"
          fill="none"
        >
          <defs>
            <linearGradient
              id="squiggleGradientH"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#032e15" />
              <stop offset="45%" stopColor="#032e15" />
              <stop offset="100%" stopColor="#A3E635" />
            </linearGradient>
            <filter
              id="squiggleShadowH"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
            </filter>
          </defs>

          <path
            d={SQUIGGLE_PATH_HORIZONTAL}
            stroke="#052e16"
            strokeWidth="96"
            strokeLinecap="round"
            filter="url(#squiggleShadowH)"
            opacity="0.3"
            transform="translate(8,14)"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={dashOffset}
          />

          <path
            d={SQUIGGLE_PATH_HORIZONTAL}
            stroke="url(#squiggleGradientH)"
            strokeWidth="96"
            strokeLinecap="round"
            className="opacity-80"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={dashOffset}
          />

          <path
            d={SQUIGGLE_PATH_HORIZONTAL}
            stroke="#dcfce7"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.35"
            transform="translate(-3,-4)"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={dashOffset}
          />
        </svg>
      </div>

      <div className="max-w-5xl w-full flex-col flex rounded-xl items-start gap-8 md:gap-10 px-4 sm:px-6 mx-auto relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl font-medium md:text-5xl text-green-950">
            Who Are We
          </h1>

          <p className="mt-4 md:mt-5 text-sm leading-7 text-black/70 md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus at
            illo veniam ipsam quasi sequi laboriosam esse voluptas molestiae
            corrupti.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full h-full gap-4 p-2 sm:p-4">
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2 rounded-lg p-4 bg-gray-500/20 backdrop-blur-xl border border-white/40 flex gap-4 flex-col w-full lg:max-w-90">
            <div className="w-full rounded-lg bg-white aspect-square"></div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl sm:text-2xl font-medium">Kizito Ohani</h3>
              <p className="text-sm text-black/70">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                totam accusantium et. Itaque maxime doloremque inventore nam
                esse architecto vitae.
              </p>
              <button className="px-6 py-2 w-fit text-white bg-green-950 rounded-lg">
                View Portfolio
              </button>
            </div>
          </div>

          <div className="bg-gray-500/20 backdrop-blur-xl border border-white/40 rounded-lg min-h-40 sm:min-h-50 p-5 flex flex-col justify-between">
            <span className="text-5xl sm:text-6xl md:text-7xl font-semibold text-green-950">
              06+
            </span>
            <div>
              <h4 className="text-base font-medium">Years combined</h4>
              <p className="text-sm text-black/70">
                Experience shipping products across design and engineering.
              </p>
            </div>
          </div>

          <div className="bg-gray-500/20 backdrop-blur-xl border border-white/40 rounded-lg min-h-40 sm:min-h-50 p-5 flex flex-col justify-between">
           <ClipboardTextIcon className="text-green-950" size={62} />
            <div>
              <h4 className="text-base font-medium">Our approach</h4>
              <p className="text-sm text-black/70">
                We pair thoughtful design with clean, dependable code.
              </p>
            </div>
          </div>

          <div className="sm:col-span-2 bg-gray-500/20 backdrop-blur-xl border border-white/40 rounded-lg p-4 gap-4 flex flex-col-reverse sm:flex-row justify-end min-h-fit sm:min-h-70">
            <div className="flex flex-col justify-center sm:items-end text-left sm:text-right gap-3 sm:gap-4 flex-1">
              <h3 className="text-xl sm:text-2xl font-medium">
                Kensuomo Travis
              </h3>
              <p className="text-sm text-black/70">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                totam accusantium et. Itaque maxime doloremque inventore nam
                esse architecto vitae.
              </p>
              <button className="px-6 py-2 w-fit sm:mx-0 text-white bg-green-950 rounded-lg">
                View Portfolio
              </button>
            </div>
            <div className="max-md:w-full aspect-square sm:h-70  rounded-lg bg-white overflow-hidden ">
              <Image
                src="/ken-profile.jpeg"
                alt=""
                height={1500}
                width={1000}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}