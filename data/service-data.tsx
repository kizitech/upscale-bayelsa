import Path1 from "@/public/path1";
import Path2 from "@/public/path2";
import Path4 from "@/public/path4";

// import WebsiteBuildImage from "@/public/services/website-build.webp";
// import SiteOptimizationImage from "@/public/services/site-optimization.webp";
// import SeoGrowthImage from "@/public/services/seo-growth.webp";

import { ServiceCardType, StatType } from "@/types/service";

export const serviceCards: ServiceCardType[] = [
  {
    title: "Website Build",
    description:
      "High-converting, modern websites designed to turn visitors into customers.",
    bgColor: "bg-[#F4D06F]",
    cardColor: "bg-[#1F1300]",
    textColor: "text-[#1F1300]",
    buttonColor: "bg-[#1F1300]",
    buttonTextColor: "text-white",
    themeColor: "#1F1300",
    path: <Path1 />,
    image: "/service-img3.jpg",
  },

  {
    title: "Site Optimization",
    description:
      "Faster, smoother and more reliable websites built for a better user experience.",
    bgColor: "bg-lime-400",
    cardColor: "bg-green-950",
    textColor: "text-green-950",
    buttonColor: "bg-green-950",
    buttonTextColor: "text-white",
    themeColor: "#052E16",
    path: <Path2 />,
    image: "/service-img4.jpg",
  },

  {
    title: "SEO Growth",
    description:
      "Data-driven SEO strategies that improve visibility, rankings and organic traffic.",
    bgColor: "bg-green-950",
    cardColor: "bg-lime-400",
    textColor: "text-white",
    buttonColor: "bg-lime-400",
    buttonTextColor: "text-green-950",
    themeColor: "#A3E635",
    path: <Path4 />,
    image: "/service-img1.jpg",
  },
];

export const statsData: StatType[] = [
  {
    value: "180+",
    label: "Websites delivered",
  },
  {
    value: "3.4x",
    label: "Average organic traffic growth",
  },
  {
    value: "98%",
    label: "Client retention rate",
  },
  {
    value: "24/7",
    label: "Performance monitoring",
  },
];