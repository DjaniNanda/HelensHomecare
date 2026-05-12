import ServicePage from "./ServicePage";

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.14" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.14" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const config = {
  slug: "alzheimers-care",
  title: "Alzheimer's Care Services",
  heroTag: "Care Services",
  heroImage: "/18.jpg",
  subtitle:
    "Dedicated, stage-by-stage Alzheimer's care at home — preserving identity, ensuring safety, and supporting the entire family through every chapter.",
  intro: [
    "Alzheimer's disease presents unique and evolving challenges for both individuals and their families. At Helen's Home Care, we provide specialised Alzheimer's care designed to meet clients exactly where they are — adapting our approach as the disease progresses through its stages.",
    "Our trained caregivers understand the specific nature of Alzheimer's: the memory loss, the personality changes, the moments of clarity and confusion. We meet each moment with patience, warmth, and expertise — helping clients live with as much dignity, comfort, and meaning as possible, right in their own home.",
  ],
  introHighlights: [
    "Alzheimer's-specific caregiver training",
    "Stage-adapted care plans",
    "Identity-centred engagement activities",
    "Wandering prevention and safety",
    "Family education and guidance",
    "Compassionate end-stage support",
  ],
  items: [
    {
      icon: <BrainIcon />,
      title: "Stage-Adapted Care Planning",
      desc: "Care plans that evolve with the disease — from early-stage independence support to mid-stage supervision and late-stage comfort-focused care.",
    },
    {
      icon: <HeartIcon />,
      title: "Identity-Centred Engagement",
      desc: "Meaningful activities rooted in the client's personal history, interests, and values — music, reminiscence, storytelling, and familiar routines that connect them to who they are.",
    },
    {
      icon: <ShieldIcon />,
      title: "Wandering Prevention & Safety",
      desc: "Careful, discreet supervision to prevent unsafe wandering, combined with a safe home environment review and practical safety measures.",
    },
    {
      icon: <SunIcon />,
      title: "Daily Personal Care with Dignity",
      desc: "Assistance with bathing, dressing, grooming, and nutrition — delivered with patience and sensitivity, respecting the individual even as their needs increase.",
    },
    {
      icon: <UsersIcon />,
      title: "Family Education & Involvement",
      desc: "We equip families with the knowledge and communication strategies they need to stay connected and supportive throughout the Alzheimer's journey.",
    },
    {
      icon: <ClipboardIcon />,
      title: "Care Continuity & Documentation",
      desc: "Detailed care notes and consistent caregiver teams ensure that nothing is missed and that every professional involved in the client's care stays informed.",
    },
  ],
  whyPoints: [
    {
      title: "Specialised Alzheimer's Training",
      desc: "Our caregivers are trained specifically in Alzheimer's care — understanding how memory loss, mood changes, and communication difficulties evolve and how to respond with skill and compassion at every stage.",
    },
    {
      title: "Preserving Dignity Through Every Stage",
      desc: "As Alzheimer's progresses, dignity becomes even more important. We approach every interaction — from morning routines to mealtimes — with the utmost respect for the individual person.",
    },
    {
      title: "A Partner for the Whole Journey",
      desc: "Alzheimer's is a long road. Helen's Home Care is with you every step of the way — adapting, supporting, and communicating openly so neither the client nor their family ever feels alone.",
    },
  ],
  accent: "gold",
};

export default function AlzheimersCare() {
  return <ServicePage config={config} />;
}