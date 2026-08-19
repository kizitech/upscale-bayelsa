export type PricingTier = {
  id: number;
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  featured: boolean;
  features: string[];
  buttonText: string;
};

export const pricingData: PricingTier[] = [
  {
    id: 1,
    name: "Presence",
    tagline: "For businesses getting found for the first time",
    price: "150,000",
    cadence: "one-time",
    featured: false,
    features: [
      "5-page business website",
      "Google Business Profile setup",
      "Maps listing & verification",
      "Mobile-friendly design",
      "2 weeks turnaround",
    ],
    buttonText: "Start with Presence",
  },
  {
    id: 2,
    name: "Growth",
    tagline: "For businesses ready to be found and followed",
    price: "350,000",
    cadence: "one-time",
    featured: true,
    features: [
      "Everything in Presence",
      "Custom-designed website",
      "Instagram & Facebook setup",
      "On-page SEO foundation",
      "Content calendar, first month",
      "4 weeks turnaround",
    ],
    buttonText: "Start with Growth",
  },
  {
    id: 3,
    name: "Scale",
    tagline: "For businesses building a long-term engine",
    price: "Custom",
    cadence: "quoted per scope",
    featured: false,
    features: [
      "Everything in Growth",
      "Ongoing SEO & content support",
      "Multi-platform social management",
      "Monthly performance reporting",
      "Priority support line",
    ],
    buttonText: "Talk to us",
  },
];