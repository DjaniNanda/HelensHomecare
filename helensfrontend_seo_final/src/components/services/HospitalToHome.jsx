import ServicePage from "./ServicePage";

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
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

const PillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M10.5 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v3" />
    <circle cx="18" cy="18" r="4" />
    <path d="M15.5 15.5L20.5 20.5" />
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

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const config = {
  slug: "hospital-to-home",
  title: "Hospital to Home Transition Care",
  heroTag: "Care Services",
  heroImage: "/23.jpg",
  subtitle:
    "Safe, structured support for clients returning home after a hospital stay — reducing the risk of readmission and ensuring a smooth, confident recovery.",
  intro: [
    "Returning home after a hospitalisation is a critical and often vulnerable period. Without the right support in place, the risk of complications, falls, and hospital readmission can increase significantly. Helen's Home Care provides dedicated hospital-to-home transition care designed to bridge the gap between inpatient care and independent living.",
    "Our caregivers work alongside healthcare providers and families to ensure the home environment is safe, that discharge instructions are followed, and that clients have the hands-on support they need to recover confidently and comfortably.",
  ],
  introHighlights: [
    "Coordination with hospital discharge teams",
    "Home safety assessments before arrival",
    "Medication management and reminders",
    "Follow-up appointment transportation",
    "Recovery monitoring and observation",
    "Family communication and updates",
  ],
  items: [
    {
      icon: <HomeIcon />,
      title: "Pre-Discharge Planning",
      desc: "We engage early — coordinating with hospital staff to understand care requirements and preparing the home environment before the client arrives.",
    },
    {
      icon: <ShieldIcon />,
      title: "Home Safety Assessment",
      desc: "A review of the home environment to identify and address hazards such as fall risks, inaccessible bathrooms, or inadequate equipment before the client returns.",
    },
    {
      icon: <PillIcon />,
      title: "Medication Management",
      desc: "Ensuring the correct medications are in place, discharge prescriptions are filled, and clients take their medications on time as directed by their physician.",
    },
    {
      icon: <ClipboardIcon />,
      title: "Following Discharge Instructions",
      desc: "Careful adherence to post-discharge care plans — including wound care guidance, activity restrictions, dietary requirements, and follow-up schedules.",
    },
    {
      icon: <UsersIcon />,
      title: "Family Communication",
      desc: "Keeping family members informed of recovery progress, any concerning changes, and upcoming appointments — so everyone stays aligned and reassured.",
    },
    {
      icon: <ActivityIcon />,
      title: "Recovery Monitoring",
      desc: "Ongoing observation of the client's condition during the critical recovery window, with prompt escalation to medical professionals if concerns arise.",
    },
  ],
  whyPoints: [
    {
      title: "Reducing Readmission Risk",
      desc: "The period immediately after discharge is when readmission risk is highest. Our structured support plan significantly reduces this risk by catching issues early and ensuring proper care is delivered at home.",
    },
    {
      title: "Seamless Care Coordination",
      desc: "We work directly with hospital discharge teams, primary care physicians, and specialists to create a seamless handover — so nothing is missed and the client feels supported from the moment they leave the hospital.",
    },
    {
      title: "Confidence for Families",
      desc: "Families often feel uncertain when a loved one comes home from hospital. Our transparent communication and expert care give them the reassurance they need during a stressful time.",
    },
  ],
  accent: "blue",
};

export default function HospitalToHome() {
  return <ServicePage config={config} />;
}