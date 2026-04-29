import ServicePage from "./ServicePage";

const SmileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CoffeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const config = {
  title: "Companion Care Services",
  heroTag: "Care Services",
  heroImage: "/19.jpg",
  subtitle:
    "Meaningful companionship, social engagement, and light everyday support that keeps loneliness at bay and brightens each day.",
  intro: [
    "Loneliness and social isolation are serious concerns for many seniors and individuals receiving home care. Helen's Home Care companion services are designed to provide genuine human connection, daily living support, and practical help — ensuring clients feel valued, engaged, and supported every single day.",
    "Our compassionate companions build real relationships with clients. They listen, share stories, assist with errands, help around the house, and accompany clients to appointments and social events — making every interaction meaningful.",
  ],
  introHighlights: [
    "Genuine friendship and daily living support",
    "Transportation to appointments and errands",
    "Meal planning and light housekeeping",
    "Accompanying to social and recreational events",
    "Reading aloud and correspondence assistance",
    "Family and community connection",
  ],
  items: [
    {
      icon: <SmileIcon />,
      title: "Friendship & Emotional Support",
      desc: "Talking, listening, sharing experiences, playing games and cards — our companions provide the warm human connection that makes a real difference.",
    },
    {
      icon: <CarIcon />,
      title: "Transportation & Errands",
      desc: "Driving clients to medical appointments, the grocery store, the pharmacy, and other errands — keeping them independent and connected to their community.",
    },
    {
      icon: <HomeIcon />,
      title: "Light Housekeeping & Meal Prep",
      desc: "Assistance with light household duties, meal planning and preparation, and grocery shopping — so clients can focus on living rather than managing chores.",
    },
    {
      icon: <BookIcon />,
      title: "Reading & Correspondence",
      desc: "Reading to clients, helping organise and respond to mail, writing letters, and keeping clients connected with friends and family through written communication.",
    },
    {
      icon: <CoffeeIcon />,
      title: "Social & Recreational Activities",
      desc: "Accompanying clients on walks, to social events, recreational outings, and planning local trips — combating isolation and fostering a sense of joy and purpose.",
    },
    {
      icon: <MailIcon />,
      title: "Family & Community Connection",
      desc: "Helping clients stay in contact with loved ones, neighbours, and the broader community — whether in person, by phone, or through correspondence.",
    },
  ],
  whyPoints: [
    {
      title: "Real Relationships, Not Just Visits",
      desc: "Our companions are selected as much for their warmth and character as their professional skills. We match companions and clients thoughtfully to build genuine bonds.",
    },
    {
      title: "Combating Isolation Actively",
      desc: "We take a proactive approach to social wellbeing — encouraging outings, activities, and engagement that keep clients connected to the world around them.",
    },
    {
      title: "Holistic Support Beyond Tasks",
      desc: "Companion care from Helen's Home Care goes beyond checking items off a list. We care about the whole person — their mood, their interests, and their sense of belonging.",
    },
  ],
  accent: "gold",
};

export default function CompanionCare() {
  return <ServicePage config={config} />;
}