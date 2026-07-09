"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRightIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  FacebookLogoIcon,
  XLogoIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const serviceLinks = [
  "Custom Websites",
  "Simple Business Sites",
  "Social Media Setup",
  "SEO Optimization",
  "Google Maps Listings",
];

const companyLinks = ["About Us", "Our Work", "Pricing", "FAQ", "Contact"];

const socialLinks = [
  { icon: InstagramLogoIcon, label: "Instagram" },
  { icon: XLogoIcon, label: "X" },
  { icon: FacebookLogoIcon, label: "Facebook" },
  { icon: LinkedinLogoIcon, label: "LinkedIn" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.children ?? [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="w-full px-4 pb-4">
      <div
        ref={footerRef}
        className="max-w-7xl w-full mx-auto rounded-4xl bg-green-950 text-white px-6 py-14 md:px-14 md:py-16 flex flex-col gap-14"
      >
        {/* Top: brand + newsletter */}
        <div className="flex max-lg:flex-col justify-between gap-10 lg:items-end">
          <div className="flex flex-col gap-4 max-w-md">
            <h2 className="text-2xl md:text-3xl font-semibold capitalize">
              Ready to be easy to find?
            </h2>
            <p className="text-white/60 text-sm font-medium">
              Get occasional notes on SEO, local search, and what&apos;s working
              for businesses like yours. No spam, unsubscribe any time.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center gap-2 rounded-lg bg-white/10 p-1.5"
          >
            <EnvelopeSimpleIcon size={20} className="ml-3 text-white/50 shrink-0" />
            <input
              type="email"
              required
              placeholder="you@business.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none py-2"
            />
            <button
              type="submit"
              className="shrink-0 flex items-center gap-1 rounded-md bg-white text-green-950 px-4 py-2.5 text-sm font-medium transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Subscribe
              <ArrowUpRightIcon size={16} />
            </button>
          </form>
        </div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/10 pt-12">
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <span className="text-xl font-semibold">YourBrand</span>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              We build the websites, socials, and search presence that help
              growing businesses get found.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40 font-medium">
              Services
            </p>
            {serviceLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40 font-medium">
              Company
            </p>
            {companyLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40 font-medium">
              Contact
            </p>
            <a
              href="mailto:hello@yourbrand.com"
              className="text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit"
            >
              hello@yourbrand.com
            </a>
            <a
              href="tel:+2340000000000"
              className="text-sm text-white/70 hover:text-white transition-colors duration-200 w-fit"
            >
              +234 000 000 0000
            </a>
            <p className="text-sm text-white/70">Lagos, Nigeria</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex max-md:flex-col-reverse gap-6 justify-between items-center border-t border-white/10 pt-8">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} YourBrand. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-white/10 text-white hover:bg-white hover:text-green-950 transition-colors duration-200"
              >
                <Icon size={16} weight="fill" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}