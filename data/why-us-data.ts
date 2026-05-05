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
    title: "Personalized Program",
    description:
      "We tailor each program to your specific needs so you get the best results possible.",
    buttonText: "Join Now",
    icon: UserCheckIcon,
  },
  {
    id: 2,
    title: "Fast Results",
    description:
      "Our proven system ensures you start seeing results in a short time.",
    buttonText: "Get Started",
    icon: LightningIcon,
  },
  {
    id: 3,
    title: "Secure & Reliable",
    description:
      "Your data and progress are safe with our secure and trusted platform.",
    buttonText: "Learn More",
    icon: ShieldCheckIcon,
  },
  {
    id: 4,
    title: "Track Your Growth",
    description:
      "Monitor your progress with powerful tracking tools and insights.",
    buttonText: "View Progress",
    icon: TrendUpIcon,
  },
];