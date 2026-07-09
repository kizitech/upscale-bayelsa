"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarIcon, QuotesIcon } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import { testimonialsData } from "@/data/testimonial-data";

gsap.registerPlugin(ScrollTrigger);

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonialsData)[number];
}) {
  return (
    <div className="relative flex h-full flex-col gap-6 rounded-4xl border border-black/10 bg-white p-6 md:p-8">
      <QuotesIcon
        size={36}
        weight="fill"
        className="text-green-950/15"
      />

      <p className="flex-1 text-sm leading-relaxed text-black/70 md:text-base">
        {testimonial.quote}
      </p>

      <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <StarIcon key={i} size={16} weight="fill" className="text-green-950" />
        ))}
      </div>

      <div className="flex items-center gap-3 border-t border-black/10 pt-5">
        <div className={`h-11 w-11 shrink-0 rounded-full ${testimonial.avatarColor}`} />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-black">{testimonial.name}</p>
          <p className="text-xs text-black/50">{testimonial.business}</p>
        </div>
        <span className="ml-auto shrink-0 rounded-lg bg-green-950/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-green-950">
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
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
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
    <section ref={sectionRef} className="w-full ">
      <div className="max-w-7xl w-full mx-auto px-4 flex flex-col">
        <div
          ref={headingRef}
          className="flex justify-between max-md:flex-col gap-4 md:items-end mb-14"
        >
          <div className="flex gap-4 flex-col">
            <p className="uppercase text-green-950 text-sm font-semibold py-2 px-6 rounded-lg border border-green-950 w-fit">
              What clients say
            </p>
            <h2 className="capitalize text-2xl md:text-5xl font-medium max-w-2xl">
              Businesses that got <span className="text-green-950">found</span>{" "}
              because they got started
            </h2>
          </div>

          <p className="md:text-lg text-sm font-medium max-w-md text-black/60 w-full">
            Real feedback from businesses we&apos;ve taken from invisible to
            unmissable — online and on the map.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full !overflow-visible"
        >
          {testimonialsData.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="testimonial-slide !h-auto py-2">
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center items-center gap-2 mt-10">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`
                h-2.5
                rounded-full
                transition-all
                duration-300
                ease-in-out
                ${activeIndex === index ? "w-8 bg-green-950" : "w-2.5 bg-black/20"}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}