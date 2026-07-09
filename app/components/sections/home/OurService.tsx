"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import { serviceCards, statsData } from "@/data/service-data";

gsap.registerPlugin(ScrollTrigger);

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

function ServiceCard({ card }: { card: (typeof serviceCards)[number] }) {
  return (
    <div
      className={`
        relative
        w-full
        rounded-[32px]
        overflow-hidden
        p-5
        md:p-8
        flex
        flex-col
        gap-10
        ${card.bgColor}
      `}
    >
      <div className={`w-full h-40 rounded-xl ${card.cardColor}`} />

      <div className="flex justify-between items-center">
        <h3 className={`text-2xl font-medium max-w-24 ${card.textColor}`}>
          {card.title}
        </h3>

        <button
          className={`
            p-2
            rounded-lg
            shrink-0
            ${card.buttonColor}
            ${card.buttonTextColor}
          `}
        >
          <ArrowUpRightIcon size={22} />
        </button>
      </div>

      <div className="absolute top-20 right-2">{card.path}</div>
      <div className="absolute -top-4 -left-4">{card.path}</div>
    </div>
  );
}

export default function OurService() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  const isMobile = useIsMobile();

  const [activeIndex, setActiveIndex] = useState(0);

  const arc = useMemo(() => {
    const count = serviceCards.length;
    const center = (count - 1) / 2;

    return serviceCards.map((_, index) => {
      const distance = index - center;

      return {
        x: distance * 10,
        y: Math.abs(distance) * 35,
        rotation: distance * 7,
        scale: 1 - Math.abs(distance) * 0.03,
        zIndex: count - Math.abs(distance),
      };
    });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(
        (card): card is HTMLDivElement => card !== null,
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 250,
            scale: 0.6,
            rotateY: -40,
            rotateX: 35,
            rotation: 0,
            filter: "blur(10px)",
            transformPerspective: 1000,
            transformOrigin: "center center",
          },
          {
            opacity: 1,
            x: arc[index].x,
            y: arc[index].y,
            rotation: arc[index].rotation,
            scale: arc[index].scale,
            rotateY: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 35%",
              scrub: 1.2,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [arc, isMobile]);

  return (
    <section ref={sectionRef} className="max-w-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-medium capitalize">
          The <span className="text-green-950">services</span> we offer
        </h1>

        <p className="max-w-3xl mt-4 md:text-center text-black/70 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus at
          illo veniam ipsam quasi sequi laboriosam esse voluptas molestiae
          corrupti.
        </p>

        <div className="w-full mt-20">
          {isMobile ? (
            <>
              <Swiper
                slidesPerView={1.15}
                centeredSlides
                spaceBetween={20}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {serviceCards.map((card, index) => (
                  <SwiperSlide key={index}>
                    <ServiceCard card={card} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination */}
              <div className="flex justify-center items-center gap-3 mt-8">
                {serviceCards.map((card, index) => {
                  const active = activeIndex === index;

                  return (
                    <button
                      key={index}
                      onClick={() => swiperRef.current?.slideTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className="h-2.5 rounded-full transition-all duration-300"
                      style={{
                        width: active ? 42 : 10,
                        backgroundColor: active ? card.themeColor : "#D1D5DB",
                      }}
                    />
                  );
                })}
              </div>

             
            </>
          ) : (
            <div
              className="flex justify-center items-end gap-8"
              style={{ perspective: "1500px" }}
            >
              {serviceCards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  style={{
                    zIndex: arc[index].zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  className={`
                    relative
                    w-[18rem]
                    shrink-0
                    rounded-[32px]
                    overflow-hidden
                    cursor-pointer
                    p-8
                    flex
                    flex-col
                    gap-10
                    transition-transform
                    duration-300
                    hover:-translate-y-4
                    ${card.bgColor}
                  `}
                >
                  <div className={`w-full h-40 rounded-xl ${card.cardColor}`} />

                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-2xl font-medium max-w-24 ${card.textColor}`}
                    >
                      {card.title}
                    </h3>

                    <button
                      className={`
                        p-2
                        rounded-lg
                        shrink-0
                        ${card.buttonColor}
                        ${card.buttonTextColor}
                      `}
                    >
                      <ArrowUpRightIcon size={22} />
                    </button>
                  </div>

                  <div className="absolute top-20 right-2">{card.path}</div>

                  <div className="absolute -top-4 -left-4">{card.path}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20 w-full max-w-4xl mt-20">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-green-950">
                {stat.value}
              </h2>

              <p className="text-black/70 capitalize max-md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
