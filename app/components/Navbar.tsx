"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Hamburger from "./Hamburger";

const navLinks = [
  {
    name: "What We Offer",
    href: "/#services",
  },
  {
    name: "Pricing",
    href: "/#pricing",
  },
  {
    name: "Who We Are",
    href: "/#about",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Returns true when the current path matches the link's href.
  // Hash-only links (#, #pricing) only match on the home page ("/").
 useEffect(() => {
  if (pathname !== "/") return;

  const sectionLinks = navLinks.filter((link) => link.href.startsWith("#"));

  const sections = sectionLinks
    .map((link) => document.getElementById(link.href.slice(1)))
    .filter((section): section is HTMLElement => section !== null);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            Math.abs(a.boundingClientRect.top) -
            Math.abs(b.boundingClientRect.top),
        );

      if (visibleSections.length > 0) {
        setActiveSection(`#${visibleSections[0].target.id}`);
      }
    },
    {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" && activeSection === href;
    }

    return pathname === href;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-90 transition-all duration-300 md:hidden
        ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <header className="relative">
        <nav
          className={`
    flex items-center justify-between
    left-1/2 -translate-x-1/2
    transition-all duration-500 ease-out
    z-100
    ${isOpen ? "max-md:bg-white max-md:rounded-b-none" : ""}
    ${
      scrolled
        ? `
          fixed
          top-5
          md:max-w-5xl
          w-[94%]
          md:w-[calc(100%-2rem)]
          rounded-2xl
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
          py-4
          md:px-8
          px-2
        `
        : `
          absolute
          top-0
          max-w-7xl
          w-full
          py-6
          md:px-12
          px-6
          bg-transparent
        `
    }

    ${isOpen && !scrolled ? "bg-white" : ""}
  `}
        >
          {/* Desktop Nav */}
          <ul className="flex gap-8 items-center max-md:hidden">
            {navLinks.slice(0, 2).map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative py-2 px-1 transition-all duration-300
                    ${
                      active
                        ? "text-green-950"
                        : "text-black/70 hover:text-green-950"
                    }

                    before:absolute
                    before:left-1/2
                    before:-translate-x-1/2
                    before:top-0
                    before:h-1
                    before:w-[20%]
                    before:rounded-full
                    before:bg-green-950
                    before:transition-all
                    before:duration-300
                    
                    after:absolute
                    after:left-1/2
                    after:-translate-x-1/2
                    after:bottom-0
                    after:h-1
                    after:w-[20%]
                    after:rounded-full
                    after:bg-green-950
                    after:transition-all
                    after:duration-300

                    ${
                      active
                        ? "before:opacity-60 after:opacity-100"
                        : "before:opacity-0 after:opacity-0 hover:after:opacity-100 hover:before:opacity-100 hover:before:bg-lime-500 hover:after:bg-lime-500"
                    }
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logo */}
          <Link
          href="/"
            className={`
    overflow-hidden flex items-center justify-center transition-all duration-500

    ${scrolled ? "w-40 h-14" : "w-64 h-24 max-md:w-32 max-md:h-12"}
  `}
          >
            <Image
              src="/wordmark.png"
              alt="Upscale"
              width={700}
              height={300}
              className={`object-cover ${scrolled ? "max-md:h-30 h-30 max-md:w-50! w-100" : "max-md:h-30 h-60 max-md:w-50! w-100"}`}
            />
          </Link>

          {/* Desktop CTA */}
          {navLinks.slice(2, 4).map((item, i) => {
              const active = isActive(item.href);

            return (
              <div key={i} className="max-md:hidden">
                <Link
                    href={item.href}
                    className={`relative py-2 px-1 transition-all duration-300
                    ${
                      active
                        ? "text-green-950"
                        : "text-black/70 hover:text-green-950"
                    }

                    before:absolute
                    before:left-1/2
                    before:-translate-x-1/2
                    before:top-0
                    before:h-1
                    before:w-[20%]
                    before:rounded-full
                    before:bg-green-950
                    before:transition-all
                    before:duration-300
                    
                    after:absolute
                    after:left-1/2
                    after:-translate-x-1/2
                    after:bottom-0
                    after:h-1
                    after:w-[20%]
                    after:rounded-full
                    after:bg-green-950
                    after:transition-all
                    after:duration-300

                    ${
                      active
                        ? "before:opacity-60 after:opacity-100"
                        : "before:opacity-0 after:opacity-0 hover:after:opacity-100 hover:before:opacity-100 hover:before:bg-lime-500 hover:after:bg-lime-500"
                    }
                    `}
                  >
                    {item.name}
                  </Link>
              </div>
            );
          })}

          {/* Hamburger */}
          <div className="relative md:hidden flex z-[120]">
            <button className="h-fit w-fit">
              <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute top-full left-0 w-full bg-white z-[110] md:hidden overflow-hidden transition-all duration-500 ease-in-out
              
              ${
                isOpen
                  ? "opacity-100 translate-y-0 max-h-125 rounded-b-2xl py-6"
                  : "opacity-0 -translate-y-4 max-h-0 py-0 pointer-events-none"
              }
            `}
          >
            <ul className="flex flex-col gap-2 px-6">
              {navLinks.map((link, index) => {
                const active = isActive(link.href);

                return (
                  <li
                    key={link.name}
                    className={`transition-all duration-500
                    ${
                      isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }
                    `}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`group relative flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300
                        
                        ${
                          active
                            ? "bg-green-950 text-white"
                            : "text-black/80 hover:bg-black/5"
                        }
                      `}
                    >
                      <span>{link.name}</span>

                      {/* Mobile Indicator */}
                      <span
                        className={`h-2 w-2 rounded-full transition-all duration-300
                          
                          ${
                            active
                              ? "bg-[#A3E635] scale-100"
                              : "bg-green-900 scale-0 group-hover:scale-100"
                          }
                        `}
                      />
                    </Link>
                  </li>
                );
              })}

              {/* CTA */}
              <li
                className={`transition-all duration-500
                ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }
                `}
                style={{
                  transitionDelay: "250ms",
                }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`w-full flex items-center justify-center py-3 rounded-xl mt-2 transition-all duration-300
                    ${
                      pathname === "/contact"
                        ? "bg-green-950 text-white"
                        : "bg-black text-white hover:bg-green-950"
                    }
                  `}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
