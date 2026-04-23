import ServicePage from "./ServicePage";

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const HeartPulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    <polyline points="8 12 10 14 14 10" />
  </svg>
);

const SunMoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const config = {
  title: "24/7 In-Home Care",
  heroTag: "Care Services",
  heroImage: "/25.jpg",
  subtitle:
    "Around-the-clock care and support for clients who need continuous oversight — day and night, weekends and holidays, without exception.",
  intro: [
    "Some individuals require more than just daytime support. Whether due to a complex medical condition, cognitive decline, recovery from a procedure, or simply the need for continuous reassurance, Helen's Home Care provides reliable 24/7 in-home care across Gwinnett County and surrounding areas.",
    "Our around-the-clock service ensures that a trained, compassionate caregiver is always present — giving clients the safety and security they need and giving families peace of mind knowing their loved one is never alone.",
  ],
  introHighlights: [
    "Continuous care day and night",
    "Overnight and live-in caregiver options",
    "Weekend and holiday coverage",
    "Emergency response readiness",
    "Caregiver shift handovers for consistency",
    "Regular family progress updates",
  ],
  items: [
    {
      icon: <ClockIcon />,
      title: "Round-the-Clock Presence",
      desc: "A trained caregiver is with your loved one at all hours, ensuring safety, comfort, and immediate response to any change in condition.",
    },
    {
      icon: <MoonIcon />,
      title: "Overnight & Live-In Care",
      desc: "For clients who need support through the night, we offer both live-in arrangements and overnight shift rotations — whichever best suits the individual.",
    },
    {
      icon: <ShieldIcon />,
      title: "Emergency Preparedness",
      desc: "Our caregivers are trained to respond calmly and effectively to emergencies, ensuring the appropriate steps are taken without delay.",
    },
    {
      icon: <HeartPulseIcon />,
      title: "Health Monitoring & Observation",
      desc: "Ongoing observation of the client's condition, including changes in behaviour, sleep, appetite, and physical health — reported promptly to family and healthcare providers.",
    },
    {
      icon: <SunMoonIcon />,
      title: "Weekend & Holiday Coverage",
      desc: "Care doesn't pause for weekends or public holidays. Our scheduling ensures uninterrupted coverage 365 days a year.",
    },
    {
      icon: <RefreshIcon />,
      title: "Consistent Caregiver Rotations",
      desc: "We carefully manage caregiver handovers and team assignments to maintain continuity, familiarity, and trust for every client.",
    },
  ],
  whyPoints: [
    {
      title: "Uninterrupted Peace of Mind",
      desc: "Knowing a trained caregiver is always present — day, night, weekend, or holiday — gives families the confidence to rest easy, no matter the situation.",
    },
    {
      title: "Rapid Response to Change",
      desc: "Conditions can shift quickly. Our caregivers are trained to detect and respond to changes in a client's condition promptly, minimising risk and preventing escalation.",
    },
    {
      title: "Tailored Continuity of Care",
      desc: "We build consistent caregiver teams for each client, so the people providing overnight and daily care know the individual's routines, preferences, and history.",
    },
  ],
  accent: "blue",
};

export default function InHomeCare() {
  return <ServicePage config={config} />;
}