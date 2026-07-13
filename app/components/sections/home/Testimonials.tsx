"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  StarIcon,
  QuotesIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import { testimonialsData } from "@/data/testimonial-data";

gsap.registerPlugin(ScrollTrigger);

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonialsData)[number];
}) {
  return (
    <div className="flex h-full min-h-[340px] flex-col rounded-3xl border border-black/10 bg-white p-4 md:p-8 transition-shadow duration-300 hover:shadow-lg">
      <QuotesIcon
        size={38}
        weight="fill"
        className="mb-6 text-green-950/15"
      />

      <p className="flex-1 text-sm leading-7 text-black/70 md:text-base">
        {testimonial.quote}
      </p>

      <div className="mt-6 flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <StarIcon
            key={i}
            size={16}
            weight="fill"
            className="text-green-950"
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-5">
      <div className="flex gap-2 items-center">
          <div
          className={`h-11 w-11 shrink-0 rounded-full ${testimonial.avatarColor}`}
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-black">
            {testimonial.name}
          </p>
          <p className="truncate text-xs text-black/50">
            {testimonial.business}
          </p>
        </div>
      </div>

        <span className="shrink-0 w-fit rounded-lg bg-green-950/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-green-950">
          {testimonial.service}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children ?? [], {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".testimonial-slide", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4">
        {/* Heading */}
        <div
          ref={headingRef}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="w-fit rounded-lg border border-green-950 px-6 py-2 text-sm font-semibold uppercase text-green-950">
              What clients say
            </p>

            <h2 className="text-3xl font-medium capitalize leading-tight md:text-5xl">
              Businesses that got{" "}
              <span className="text-green-950">found</span> because they got
              started
            </h2>
          </div>

          <p className="max-w-md text-sm font-medium leading-7 text-black/60 md:text-lg">
            Real feedback from businesses we&apos;ve taken from invisible to
            unmissable — online and on the map.
          </p>
        </div>

        {/* Swiper */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            loop
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: 1.15,
              },
              640: {
                slidesPerView: 1.4,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            className="!overflow-visible"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide
                key={testimonial.id}
                className="testimonial-slide !h-auto"
              >
                <div className="h-full py-2">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Controls */}
          <div className="mt-10 flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <button
                aria-label="Previous testimonial"
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:border-green-950 hover:bg-green-950 hover:text-white"
              >
                <CaretLeftIcon size={20} weight="bold" />
              </button>

              <button
                aria-label="Next testimonial"
                onClick={() => swiperRef.current?.slideNext()}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 hover:border-green-950 hover:bg-green-950 hover:text-white"
              >
                <CaretRightIcon size={20} weight="bold" />
              </button>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-8 bg-green-950"
                      : "w-2.5 bg-black/20 hover:bg-black/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}