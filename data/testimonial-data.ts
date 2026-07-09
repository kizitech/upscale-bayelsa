export type Testimonial = {
  id: number;
  name: string;
  business: string;
  service: string;
  quote: string;
  rating: number;
  avatarColor: string;
};

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Amara Okafor",
    business: "Founder, Lace & Loom Boutique",
    service: "Website + Social Setup",
    quote:
      "We went from no online presence to a full storefront and Instagram shop in three weeks. Orders started coming in before the launch post even finished trending.",
    rating: 5,
    avatarColor: "bg-orange-200",
  },
  {
    id: 2,
    name: "Tunde Bakare",
    business: "Owner, Bakare & Sons Auto Repair",
    service: "Google Maps + SEO",
    quote:
      "Getting listed and verified on Maps properly doubled our walk-ins. People finally stop calling to ask if we're 'the one on the corner' — they just find us.",
    rating: 5,
    avatarColor: "bg-blue-200",
  },
  {
    id: 3,
    name: "Grace Adeyemi",
    business: "Director, Adeyemi Consulting",
    service: "Custom Website",
    quote:
      "They actually asked about our clients before designing anything. The site reads like it was built for a consultancy, not dropped in from a template.",
    rating: 5,
    avatarColor: "bg-purple-200",
  },
  {
    id: 4,
    name: "Chidi Nwosu",
    business: "Founder, Farmhouse Fresh",
    service: "Full Growth Package",
    quote:
      "Our search ranking, our socials, and our site all finally say the same thing about who we are. That consistency alone changed how customers talk about us.",
    rating: 5,
    avatarColor: "bg-green-200",
  },
];