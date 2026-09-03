"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRightIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { serviceCards, statsData } from "@/data/service-data";
import { ServiceCardType } from "@/types/service";

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

interface ServiceCardProps {
  card: ServiceCardType;
}

function ServiceCard({ card }: ServiceCardProps) {
  return (
    <div
      className={`
        relative
        w-full
        min-h-[380px]
        rounded-[30px]
        overflow-hidden
        p-5
        sm:p-6
        lg:p-8
        flex
        flex-col
        justify-between
        transition-all
        duration-500
        ${card.bgColor}
      `}
    >
      <div className={`w-full h-44 sm:h-52 flex rounded-2xl `} >
        <Image src={card.image} alt={card.title} width={4000} height={3000} className="w-full h-full z-50 object-cover rounded-2xl" />
      </div>

      <div className="flex justify-between items-center mt-10">
        <h3 className={`text-2xl font-medium max-w-[140px] leading-tight ${card.textColor}`}>
          {card.title}
        </h3>

        <button
          aria-label={`Learn more about ${card.title}`}
          className={`
            h-12
            w-12
            rounded-xl
            flex
            items-center
            justify-center
            shrink-0
            transition-transform
            duration-300
            hover:rotate-45
            ${card.buttonColor}
            ${card.buttonTextColor}
          `}
        >
          <ArrowUpRightIcon size={22} />
        </button>
      </div>

      <div className="absolute top-16 right-2 pointer-events-none">{card.path}</div>
      <div className="absolute -top-4 -left-4 pointer-events-none">{card.path}</div>
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
        x: distance * 14,
        y: Math.abs(distance) * 38,
        rotation: distance * 8,
        scale: 1 - Math.abs(distance) * 0.04,
        zIndex: count - Math.abs(distance),
      };
    });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter((card): card is HTMLDivElement => card !== null);

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 220,
            scale: 0.65,
            rotateY: -35,
            rotateX: 20,
            filter: "blur(10px)",
            transformPerspective: 1200,
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
            ease: "power4.out",
            duration: 1.5,
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
    <section ref={sectionRef} id="services" className="overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-medium md:text-5xl">
            The <span className="text-green-950">services</span> we offer
          </h1>

          <p className="mt-5 text-sm leading-7 text-black/70 md:text-base">
            From the first line of code to the top of the results page. We build websites,
            tune them for speed, and get them found.
          </p>
        </div>

        <div className="mt-20">
          {isMobile ? (
            // Buttons live in the horizontal padding around the swiper, not
            // on top of the slides, so they never overlap card content.
            <div className="relative">
              <Swiper
                centeredSlides
                spaceBetween={20}
                breakpoints={{
                  0: { slidesPerView: 1.05 },
                  480: { slidesPerView: 1.15 },
                  640: { slidesPerView: 1.3 },
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
              >
                {serviceCards.map((card, index) => (
                  <SwiperSlide key={index}>
                    <ServiceCard card={card} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* <button
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev()}
                className="
                  absolute
                  left-0
                  top-1/2
                  z-20
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  bg-white
                  shadow-sm
                  transition-colors
                  hover:bg-black/5
                "
              >
                <CaretLeftIcon size={20} weight="bold" />
              </button>

              <button
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext()}
                className="
                  absolute
                  right-0
                  top-1/2
                  z-20
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/10
                  bg-white
                  shadow-sm
                  transition-colors
                  hover:bg-black/5
                "
              >
                <CaretRightIcon size={20} weight="bold" />
              </button> */}

              {/* Pagination */}
              <div className="mt-8 flex justify-center gap-3">
                {serviceCards.map((card, index) => {
                  const active = activeIndex === index;

                  return (
                    <button
                      key={index}
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => swiperRef.current?.slideTo(index)}
                      className="h-2.5 rounded-full transition-all duration-300"
                      style={{
                        width: active ? 40 : 10,
                        backgroundColor: active ? card.themeColor : "#d1d5db",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              className="flex items-end justify-center gap-4 px-4 lg:gap-6 xl:gap-8"
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
                  className="
                    w-[17rem]
                    shrink-0
                    transition-all
                    duration-500
                    hover:-translate-y-5
                    hover:scale-105
                    lg:w-[18rem]
                    xl:w-[19rem]
                  "
                >
                  <ServiceCard card={card} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <h2 className="text-3xl font-bold text-green-950 md:text-4xl">{stat.value}</h2>
              <p className="mt-2 text-xs capitalize text-black/70 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}