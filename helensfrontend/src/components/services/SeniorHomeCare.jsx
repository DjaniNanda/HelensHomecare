import ServicePage from "./ServicePage";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const config = {
  title: "Senior Home Care Services",
  heroTag: "Care Services",
  heroImage: "/15.jpg",
  subtitle:
    "Compassionate, personalised care that allows seniors to age gracefully in the comfort and familiarity of their own home.",
  intro: [
    "At Helen's Home Care, we believe that every senior deserves to live with dignity, independence, and the highest possible quality of life — right at home. Our senior home care services are thoughtfully designed to support the unique physical, emotional, and social needs of older adults across Gwinnett County and surrounding communities.",
    "Our experienced caregivers work closely with clients and their families to build personalised care plans that evolve alongside each individual's needs — whether that means light assistance a few hours a week or comprehensive daily support.",
  ],
  introHighlights: [
    "Personalised care plans for every client",
    "Skilled, background-checked caregivers",
    "Flexible scheduling — hours or full days",
    "Family updates and open communication",
  ],
  items: [
    {
      icon: <HomeIcon />,
      title: "In-Home Daily Assistance",
      desc: "Support with activities of daily living including bathing, dressing, grooming, and mobility — delivered with respect and sensitivity.",
    },
    {
      icon: <HeartIcon />,
      title: "Medication Reminders",
      desc: "Gentle reminders to take prescribed medications on schedule, reducing the risk of missed doses and supporting overall health management.",
    },
    {
      icon: <ClipboardIcon />,
      title: "Personalised Care Plans",
      desc: "Every care plan is built around the specific needs, preferences, and routines of the individual — and updated as circumstances change.",
    },
    {
      icon: <UsersIcon />,
      title: "Family Coordination",
      desc: "We keep family members informed and involved, offering regular updates and open communication so loved ones always know their family member is well cared for.",
    },
    {
      icon: <CalendarIcon />,
      title: "Flexible Scheduling",
      desc: "From a few hours a week to daily care, our scheduling adapts to your needs — including weekends and evenings.",
    },
    {
      icon: <ShieldIcon />,
      title: "Safety & Fall Prevention",
      desc: "Our caregivers are trained to identify and address home safety risks, reducing the likelihood of falls and accidents.",
    },
  ],
  whyPoints: [
    {
      title: "Experienced Local Caregivers",
      desc: "Our team is rooted in the Gwinnett community. Every caregiver is thoroughly screened, trained, and genuinely passionate about delivering exceptional senior care.",
    },
    {
      title: "Care That Adapts to You",
      desc: "We don't use one-size-fits-all approaches. Your care plan is built around your life, your routines, and your goals — and it evolves as your needs do.",
    },
    {
      title: "Family-Centred Approach",
      desc: "We understand that caring for a senior is a family journey. We include and support the whole family, providing transparency and peace of mind at every step.",
    },
  ],
  accent: "blue",
};

export default function SeniorHomeCare() {
  return <ServicePage config={config} />;
}