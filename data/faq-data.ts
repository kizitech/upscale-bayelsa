export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "I don't have a website yet — where do we start?",
    answer:
      "Most clients start there. We'll walk through what your business does, who you're trying to reach, and build a site around that from scratch — no templates that look like everyone else's.",
  },
  {
    id: 2,
    question: "Can you set up our social accounts if we already have some?",
    answer:
      "Yes. We'll audit what's live, clean up naming and bios so they match across platforms, and connect everything back to your website and Maps listing.",
  },
  {
    id: 3,
    question: "What does 'SEO friendly' actually mean for my business?",
    answer:
      "It means your site is structured so search engines understand what you do and where you do it — page titles, local keywords, load speed, and a Maps listing that agrees with your website.",
  },
  {
    id: 4,
    question: "How long does a typical project take?",
    answer:
      "A Presence package usually ships in two weeks. Growth packages run closer to four, since they include social setup and SEO foundations alongside the build.",
  },
  {
    id: 5,
    question: "Do you work with businesses outside of a specific industry?",
    answer:
      "We work across retail, food, services, and consulting. The process changes shape depending on your business, but the goal stays the same: make you easy to find and easy to trust.",
  },
];