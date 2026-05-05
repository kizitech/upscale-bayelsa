"use client";

import { ArrowDownLeftIcon } from "@phosphor-icons/react";

export default function CircularBadge() {
  return (
    <div className="flex group items-center hover:rotate-185 ease-in-out duration-1000 cursor-pointer z-30 absolute bottom-10 right-10 justify-center ">
      <div className="relative group-hover:scale-100 scale-60 w-40 h-40 ease-in-out duration-1000">
        {/* SVG circular text */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full animate-spin-slow"
        >
          <defs>
            <path
              id="circlePath"
              d="M 100, 100
                 m -75, 0
                 a 75,75 0 1,1 150,0
                 a 75,75 0 1,1 -150,0"
            />
          </defs>

          <text fill="black" fontSize="18" fontWeight="500" letterSpacing="2">
            <textPath href="#circlePath" startOffset="0%">
              UPSCALE YOUR BUSINESS • UPSCALE YOU •
            </textPath>
          </text>
        </svg>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-light">
            <ArrowDownLeftIcon size={32} />
          </span>
        </div>
      </div>
    </div>
  );
}
