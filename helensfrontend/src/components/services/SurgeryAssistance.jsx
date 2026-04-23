import ServicePage from "./ServicePage";

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const HeartPulseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const PillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3" />
    <circle cx="18" cy="18" r="4" />
    <path d="M15.5 15.5L20.5 20.5" />
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

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const config = {
  title: "Assistance Before and After Surgery",
  heroTag: "Care Services",
  heroImage: "/24.jpg",
  subtitle:
    "Expert pre- and post-surgical support to prepare your home, accompany you on procedure day, and assist through a safe, comfortable recovery.",
  intro: [
    "Undergoing surgery is significant — and so is the recovery process. Whether you are preparing for an elective procedure or recovering from an emergency operation, Helen's Home Care provides structured, compassionate assistance before and after surgery to ensure the process is as smooth and stress-free as possible.",
    "We coordinate directly with surgical teams to understand specific pre- and post-operative care instructions, and we prepare both the client and the home environment for a safe recovery. Our support extends from the night before surgery through the full post-operative recovery period.",
  ],
  introHighlights: [
    "Pre-surgery home preparation",
    "Transportation to and from the facility",
    "Post-operative monitoring and observation",
    "Medication reminders and management",
    "Wound care guidance and hygiene support",
    "Follow-up appointment coordination",
  ],
  items: [
    {
      icon: <CalendarIcon />,
      title: "Pre-Surgery Preparation",
      desc: "Helping clients prepare physically and practically — organising the home, handling pre-operative instructions, and ensuring everything is in place for the day of surgery.",
    },
    {
      icon: <CarIcon />,
      title: "Transportation & Accompaniment",
      desc: "Providing reliable transportation to and from the surgical facility, and staying with the client during the procedure to offer support and ensure a safe return home.",
    },
    {
      icon: <HomeIcon />,
      title: "Post-Op Home Setup",
      desc: "Arranging the home environment for post-surgical comfort and safety — including bed positioning, bathroom access, and necessary equipment.",
    },
    {
      icon: <PillIcon />,
      title: "Medication & Pain Management Support",
      desc: "Ensuring prescribed post-operative medications are taken correctly and on schedule, and monitoring for signs of adverse reactions or missed doses.",
    },
    {
      icon: <HeartPulseIcon />,
      title: "Recovery Monitoring",
      desc: "Careful observation of the client's condition during recovery — including wound sites, pain levels, appetite, and mobility — with prompt escalation of any concerns.",
    },
    {
      icon: <ActivityIcon />,
      title: "Gradual Return to Activity",
      desc: "Supporting clients as they regain strength and mobility, following post-operative guidelines to encourage safe, progressive recovery at the right pace.",
    },
  ],
  whyPoints: [
    {
      title: "Expert Surgical Support",
      desc: "Our caregivers are trained to understand and follow post-operative care instructions precisely, reducing the risk of complications and supporting a smoother, faster recovery.",
    },
    {
      title: "One Point of Support for Everything",
      desc: "From the pre-surgery shop to post-op wound observation, we handle the practical details — so clients and families can focus on recovery, not logistics.",
    },
    {
      title: "Ongoing Through Full Recovery",
      desc: "We don't just cover the first day home. Our surgical assistance can extend through the full recovery period, however long it takes, until the client is fully independent again.",
    },
  ],
  accent: "gold",
};

export default function SurgeryAssistance() {
  return <ServicePage config={config} />;
}