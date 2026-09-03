import { WhyUsItem } from "@/types/why-us";
import {
  UserCheckIcon,
  LightningIcon,
  ShieldCheckIcon,
  TrendUpIcon,
} from "@phosphor-icons/react";

export const whyUsData: WhyUsItem[] = [
  {
    id: 1,
    title: "Built Around Your Business",
    description:
      "No templates. Every site is designed around your brand, your services, and how your customers actually find you with contact info and social links built in from the start.",
    buttonText: "Start Your Project",
    icon: UserCheckIcon,
    pattern: (
      <svg
        className="absolute -top-8 -right-8 w-56 h-56 origin-top-right transition-transform duration-500 group-hover:animate-[pattern-pulse_4s_ease-in-out_infinite]"
        viewBox="0 0 160 160"
        fill="none"
      >
        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="48" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="26" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="80" cy="80" r="4" fill="currentColor" />
        <line x1="80" y1="0" x2="80" y2="24" stroke="currentColor" strokeWidth="1.5" />
        <line x1="80" y1="136" x2="80" y2="160" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="80" x2="24" y2="80" stroke="currentColor" strokeWidth="1.5" />
        <line x1="136" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Live in Days, Not Months",
    description:
      "Our build process is streamlined so your site launches fast optimized for speed from day one, because slow sites lose customers before they even load.",
    buttonText: "See Our Process",
    icon: LightningIcon,
    pattern: (
      <svg
        className="absolute -bottom-6 -left-10 w-64 h-64 origin-bottom-left transition-transform duration-500 group-hover:animate-[pattern-pulse_4s_ease-in-out_infinite]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <line x1="0" y1="160" x2="90" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="190" x2="130" y2="80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="45" y1="210" x2="170" y2="85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="75" y1="220" x2="200" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Secure Hosting & Support",
    description:
      "Every site is backed by managed hosting, SSL, regular backups, and ongoing maintenance so it stays online, stays safe, and stays yours to worry less about.",
    buttonText: "View Our Plans",
    icon: ShieldCheckIcon,
    pattern: (
      <svg
        className="absolute -top-10 -right-6 w-60 h-60 origin-top-right transition-transform duration-500 group-hover:animate-[pattern-pulse_4s_ease-in-out_infinite]"
        viewBox="0 0 180 180"
        fill="none"
      >
        <polygon
          points="90,10 130,32 130,76 90,98 50,76 50,32"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <polygon
          points="140,60 168,76 168,108 140,124 112,108 112,76"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <polygon
          points="50,100 78,116 78,148 50,164 22,148 22,116"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "SEO & Local Visibility",
    description:
      "We optimize your site and Google Business Profile so you rank on Maps and search, then track the results so growth isn't a guess, it's a number you can see.",
    buttonText: "Check Your Ranking",
    icon: TrendUpIcon,
    pattern: (
      <svg
        className="absolute -bottom-8 -right-8 w-64 h-56 origin-bottom-right transition-transform duration-500 group-hover:animate-[pattern-pulse_4s_ease-in-out_infinite]"
        viewBox="0 0 200 160"
        fill="none"
      >
        <polyline
          points="10,150 55,150 55,110 100,110 100,70 145,70 145,30 190,30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="55" cy="110" r="4" fill="currentColor" />
        <circle cx="100" cy="70" r="4" fill="currentColor" />
        <circle cx="145" cy="30" r="4" fill="currentColor" />
        <circle cx="190" cy="30" r="4" fill="currentColor" />
      </svg>
    ),
  },
];