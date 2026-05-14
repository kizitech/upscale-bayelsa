import Path1 from "@/public/path1";
import Path2 from "@/public/path2";
import Path4 from "@/public/path4";
import { ServiceCardType, StatType } from "@/types/service";

export const serviceCards: ServiceCardType[] = [
  {
    title: "Personalized Program",
    bgColor: "bg-[#F4D06F]",
    cardColor: "bg-[#1F1300]",
    textColor: "text-[#1F1300]",
    buttonColor: "bg-[#1F1300]",
    buttonTextColor: "text-white",
    path: <Path1 />,
  },

  {
    title: "Personalized Program",
    bgColor: "bg-lime-400",
    cardColor: "bg-green-950",
    textColor: "text-green-950",
    buttonColor: "bg-green-950",
    buttonTextColor: "text-white",
    path: <Path2 />,
  },

  {
    title: "Personalized Program",
    bgColor: "bg-green-950",
    cardColor: "bg-lime-400",
    textColor: "text-white",
    buttonColor: "bg-lime-400",
    buttonTextColor: "text-green-950",
    path: <Path4 />,
  },
];

export const statsData: StatType[] = [
  {
    value: "123",
    label: "Lorem, ipsum dolor.",
  },

  {
    value: "123",
    label: "Lorem, ipsum dolor.",
  },

  {
    value: "123",
    label: "Lorem, ipsum dolor.",
  },

  {
    value: "123",
    label: "Lorem, ipsum dolor.",
  },
];