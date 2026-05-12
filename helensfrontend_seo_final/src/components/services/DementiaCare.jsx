import ServicePage from "./ServicePage";

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.14" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.14" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const config = {
  slug: "dementia-care",
  title: "Dementia Care Services",
  heroTag: "Care Services",
  heroImage: "/22.jpg",
  subtitle:
    "Specialist dementia care delivered at home — providing safety, structure, and dignity for clients and compassionate guidance for their families.",
  intro: [
    "Dementia affects millions of families, and navigating its progression requires a specialised approach. At Helen's Home Care, our dementia care services are specifically designed to support clients at every stage of cognitive decline — providing the structure, consistency, and compassionate presence that makes a meaningful difference.",
    "Our caregivers are trained in dementia-specific care techniques, including behaviour management, meaningful engagement, and safe supervision. We create calm, familiar routines that reduce anxiety and confusion, allowing clients to feel safe and dignified in their own home.",
  ],
  introHighlights: [
    "Dementia-trained caregivers",
    "Consistent routines to reduce confusion",
    "Behaviour management techniques",
    "Safe home environment practices",
    "Respite for family caregivers",
    "Stage-appropriate activity engagement",
  ],
  items: [
    {
      icon: <ClockIcon />,
      title: "Structured Daily Routines",
      desc: "Consistent, predictable schedules that reduce confusion and agitation — helping clients feel oriented, secure, and in control of their day.",
    },
    {
      icon: <ShieldIcon />,
      title: "Safety Supervision",
      desc: "Continuous, attentive supervision to prevent wandering, falls, and other risks associated with dementia — keeping clients safe without restricting their dignity.",
    },
    {
      icon: <BrainIcon />,
      title: "Cognitive Engagement Activities",
      desc: "Stage-appropriate activities designed to stimulate the mind, maintain skills, and provide enjoyment — from reminiscence exercises to music, puzzles, and light creative work.",
    },
    {
      icon: <HeartIcon />,
      title: "Behaviour & Mood Management",
      desc: "Trained techniques for managing challenging behaviours with patience and de-escalation — reducing distress for both the client and their family.",
    },
    {
      icon: <UsersIcon />,
      title: "Family Support & Guidance",
      desc: "We work closely with families to provide education, emotional support, and practical guidance on how to communicate and engage with their loved one effectively.",
    },
    {
      icon: <HomeIcon />,
      title: "Respite for Family Caregivers",
      desc: "Providing family caregivers with essential breaks while ensuring their loved one continues to receive expert, consistent care in a familiar environment.",
    },
  ],
  whyPoints: [
    {
      title: "Specialist Training in Dementia Care",
      desc: "Our caregivers receive focused training in dementia-specific approaches — understanding the condition's progression and knowing how to respond compassionately at every stage.",
    },
    {
      title: "Consistency That Reduces Anxiety",
      desc: "We prioritise consistency in caregivers, routines, and environment — because familiarity is one of the most powerful tools for managing dementia-related anxiety and confusion.",
    },
    {
      title: "Support for the Whole Family",
      desc: "We recognise that dementia affects the entire family. We offer education, open communication, and respite care to ensure family caregivers are supported alongside their loved ones.",
    },
  ],
  accent: "blue",
};

export default function DementiaCare() {
  return <ServicePage config={config} />;
}