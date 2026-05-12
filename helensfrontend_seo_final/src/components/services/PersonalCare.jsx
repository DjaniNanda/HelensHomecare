import ServicePage from "./ServicePage";

const DropletIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const HandsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
    <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const MoveIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <polyline points="5 9 2 12 5 15" />
    <polyline points="9 5 12 2 15 5" />
    <polyline points="15 19 12 22 9 19" />
    <polyline points="19 9 22 12 19 15" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const PillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3" />
    <circle cx="18" cy="18" r="4" />
    <path d="M15.5 15.5L20.5 20.5" />
  </svg>
);

const config = {
  slug: "personal-care",
  title: "Personal Care Services",
  heroTag: "Care Services",
  heroImage: "/20.jpg",
  subtitle:
    "Hands-on, dignified assistance with daily personal care activities — preserving independence and maintaining the quality of life our clients deserve.",
  intro: [
    "Personal care is at the heart of what we do at Helen's Home Care. When daily tasks become challenging due to age, illness, or disability, our caregivers step in to provide respectful, professional assistance — treating every client with the dignity and sensitivity they deserve.",
    "From assistance with bathing and grooming to mobility support and continence care, our personal care services are tailored to each client's specific needs and comfort levels. We take the time to understand individual preferences and build trust with every person in our care.",
  ],
  introHighlights: [
    "Bathing, showering, and perineal care",
    "Grooming, hair care, and dressing assistance",
    "Mobility, transfers, and positioning",
    "Continence and incontinence care",
    "Skin care and nail maintenance",
    "Medication reminders and observation",
  ],
  items: [
    {
      icon: <DropletIcon />,
      title: "Bathing & Hygiene Assistance",
      desc: "Comprehensive support with bed bathing, sponge bathing, tub bathing, and showering — performed with care and complete respect for client privacy.",
    },
    {
      icon: <SunIcon />,
      title: "Grooming & Dressing",
      desc: "Assistance with shaving, hair brushing and styling, applying make-up, and selecting and wearing appropriate clothing each day.",
    },
    {
      icon: <MoveIcon />,
      title: "Transfers & Mobility Support",
      desc: "Safe assistance with transfers between bed, wheelchair, and chair using proper techniques including transfer belts and mechanical lifts where needed.",
    },
    {
      icon: <HandsIcon />,
      title: "Continence Care",
      desc: "Discreet, compassionate bowel and bladder care including monitoring, incontinence care, and assistance with bedpans, urinals, and commode use.",
    },
    {
      icon: <PillIcon />,
      title: "Medication Assistance",
      desc: "Reminding clients to take medications, placing them within reach, providing water, and storing medications safely — ensuring adherence to prescribed schedules.",
    },
    {
      icon: <ActivityIcon />,
      title: "Skin & Nail Care",
      desc: "Washing and drying skin, applying body lotions, observing skin changes, and basic nail maintenance including soaking, trimming, and cuticle care.",
    },
  ],
  whyPoints: [
    {
      title: "Dignity in Every Interaction",
      desc: "We train every caregiver to approach personal care with the highest level of sensitivity and respect — ensuring clients never feel diminished or uncomfortable.",
    },
    {
      title: "Professionally Trained Caregivers",
      desc: "Our team is skilled in proper personal care techniques, including safe transfer methods, skin observation, and continence care — minimising risk and maximising comfort.",
    },
    {
      title: "Tailored to Each Individual",
      desc: "No two clients are the same. We learn each person's preferences, routines, and boundaries to deliver care that truly fits their life.",
    },
  ],
  accent: "blue",
};

export default function PersonalCare() {
  return <ServicePage config={config} />;
}