"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Hamburger from "./Hamburger";

const navLinks = [
  {
    name: "What We Offer",
    href: "#",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();

  // Returns true when the current path matches the link's href.
  // Hash-only links (#, #pricing) only match on the home page ("/").
  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  const isActive = (href: string) => {
    // Home section
    if (href === "#") {
      return pathname === "/" && hash === "";
    }

    // Section links
    return pathname === "/" && hash === href;
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
          className={`flex items-center justify-between max-w-7xl w-full absolute z-100 top-0 left-0 right-0 mx-auto py-6 md:px-12 px-6 transition-all duration-300
          ${isOpen ? "bg-white" : ""}
          `}
        >
          {/* Desktop Nav */}
          <ul className="flex gap-8 items-center max-md:hidden">
            {navLinks.map((link) => {
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
                        ? "before:opacity-100 after:opacity-100"
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
          <div className="md:h-20 md:w-87.5 w-52 h-10 overflow-hidden flex items-center justify-center">
            <Image src="/wordmark.png" alt="Upscale" width={700} height={300} />
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className={`relative py-2 px-1 transition-all duration-300 max-md:hidden
          
                  text-green-950
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
                      pathname === "/contact"
                        ? "before:opacity-100 after:opacity-100"
                        : "before:opacity-0 after:opacity-0 hover:after:opacity-100 hover:before:opacity-100 hover:before:bg-lime-500 hover:after:bg-lime-500"
                    }
            `}
          >
            Contact Us
          </Link>

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
                  ? "opacity-100 translate-y-0 max-h-[500px] py-6"
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
                      className={`group relative flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-300
                        
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
                              ? "bg-white scale-100"
                              : "bg-green-900 scale-0 group-hover:scale-100"
                          }
                        `}
                      />

                      {/* Bottom Accent */}
                      <span
                        className={`absolute bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-[20%] rounded-full transition-all duration-300
                          
                          ${
                            active
                              ? "bg-white opacity-100"
                              : "bg-green-900 opacity-0 group-hover:opacity-100"
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
