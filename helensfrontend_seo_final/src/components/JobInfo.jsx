import { useEffect, useState } from "react";
import "../componentscss/JobInfo.css";
import { useReveal } from "../hooks/useReveal";
import AssessmentSection from "./Assessmentsection.jsx";
import {
  BriefcaseIcon,
  CheckIcon,
  CheckCircleIcon,
  HeartIcon,
  ShieldIcon,
  StarIcon,
  UsersIcon,
  PhoneIcon,
  MailIcon,
  ArrowIcon,
} from "./icons";
import SEO from './SEO.jsx';

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const POSITIONS = [
  {
    id: 1,
    title: "Home Health Aide (HHA)",
    type: "Full-time / Part-time",
    location: "Gwinnett and its surroundings",
    desc: "Provide personal care, companionship, and daily living assistance to seniors and adults in their homes. Flexible scheduling available across all 10 counties.",
    requirements: [
      "HHA certificate or willingness to obtain",
      "Valid driver's license & reliable transportation",
      "CPR certification preferred",
    ],
    badge: "Hiring Now",
    image: "/15.jpg",
  },
  {
    id: 2,
    title: "Certified Nursing Assistant (CNA)",
    type: "Full-time / Part-time",
    location: "Gwinnett, DeKalb, Cobb & more",
    desc: "Deliver high-quality in-home nursing support to clients recovering at home. Be the daily anchor of comfort and safety for our clients and their families.",
    requirements: [
      "Active Georgia CNA license",
      "Minimum 1 year of experience",
      "Strong interpersonal and communication skills",
    ],
    badge: "Urgent",
    image: "/13.jpg",
  },
  {
    id: 3,
    title: "Companion / Sitter Caregiver",
    type: "Part-time / Flexible",
    location: "Across all 10 counties",
    desc: "Offer meaningful companionship, light housekeeping, transportation to appointments, and errand support. Perfect for those who lead with heart.",
    requirements: [
      "No certification required",
      "Caring, patient, and dependable personality",
      "Reliable transportation",
    ],
    badge: "Open",
    image: "/21.jfif",
  },
];

const PERKS = [
  { Icon: StarIcon,        title: "Competitive Weekly Pay",   desc: "Direct deposit every week with competitive hourly rates and performance-based bonuses." },
  { Icon: HeartIcon,       title: "Flexible Scheduling",      desc: "We build your schedule around your life — days, evenings, weekends, or live-in care." },
  { Icon: ShieldIcon,      title: "Free Training & Growth",   desc: "In-house training, certification support, and a clear path for career advancement." },
  { Icon: UsersIcon,       title: "Supportive Team",          desc: "A dedicated care coordinator available 24/7 to guide and support you in the field." },
  { Icon: CheckCircleIcon, title: "Mileage Reimbursement",    desc: "Get reimbursed for all travel between client visits across our service counties." },
  { Icon: BriefcaseIcon,   title: "Referral Bonuses",         desc: "Earn a bonus every time you refer a qualified caregiver who joins our team." },
];

const REQUIREMENTS = [
  "Must be 18 years of age or older",
  "Authorized to work in the United States",
  "Pass a comprehensive criminal background check",
  "Reliable transportation to client locations",
  "Genuine passion for helping others",
  "Strong communication and interpersonal skills",
];

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function JobHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`ji-hero ${loaded ? "ji-hero--loaded" : ""}`}>
      <div className="ji-hero-overlay" aria-hidden="true" />
      <div className="ji-hero-inner">
        <div className="ji-hero-copy">
          <span className="ji-hero-eyebrow">
            <span className="ji-eyebrow-dot" />
            Hiring Across Gwinnett and its surroundings
          </span>
          <h1 className="ji-hero-headline">
            Great People Deserve<br />
            <em>Great Opportunities</em>
          </h1>
          <p className="ji-hero-sub">
            Join Helen's Home Care and build a rewarding career helping seniors and adults
            live safely and comfortably at home. We value heart, reliability, and a genuine
            commitment to excellence in every visit.
          </p>
          <div className="ji-hero-actions">
            <a href="#positions" className="ji-btn-gold">View Open Positions</a>
            <a href="/assessment" className="ji-btn-ghost">
              Apply Now <ArrowIcon size={15} />
            </a>
          </div>
        </div>
        <div className="ji-hero-stats" aria-label="Quick facts">
          <div className="ji-stat-card">
            <span className="ji-stat-num">10+</span>
            <span className="ji-stat-label">Counties Served</span>
          </div>
          <div className="ji-stat-card">
            <span className="ji-stat-num">24/7</span>
            <span className="ji-stat-label">Team Support</span>
          </div>
          <div className="ji-stat-card">
            <span className="ji-stat-num">100%</span>
            <span className="ji-stat-label">Dedicated to Care</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PERK CARD — own component so hook is at top level
══════════════════════════════════════ */
function PerkCard({ Icon, title, desc, delay }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`ji-perk-card ji-reveal ${visible ? "ji-revealed" : ""}`}
      style={{ transitionDelay: delay }}
    >
      <span className="ji-perk-icon"><Icon size={24} /></span>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

/* ══════════════════════════════════════
   WHY JOIN US
══════════════════════════════════════ */
function WhyJoinUs() {
  const [titleRef, titleVisible] = useReveal(0.1);
  return (
    <section className="ji-perks">
      <div className="ji-container">
        <div
          ref={titleRef}
          className={`ji-section-head ji-reveal ${titleVisible ? "ji-revealed" : ""}`}
        >
          <span className="ji-tag">Why Join Us</span>
          <h2 className="ji-section-title">Benefits & Perks</h2>
          <p className="ji-section-sub">
            At Helen's Home Care, we believe great caregivers deserve great support.
            We invest in the people who make our mission possible every day.
          </p>
        </div>
        <div className="ji-perks-grid">
          {PERKS.map(({ Icon, title, desc }, i) => (
            <PerkCard key={title} Icon={Icon} title={title} desc={desc} delay={`${i * 0.08}s`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   POSITION CARD — own component
══════════════════════════════════════ */
function PositionCard({ pos, delay }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <article
      ref={ref}
      className={`ji-pos-card ji-reveal ${visible ? "ji-revealed" : ""}`}
      style={{ transitionDelay: delay }}
    >
      {/* Position image */}
      <div className="ji-pos-img-wrap">
        <img src={pos.image} alt={pos.title} className="ji-pos-img" />
        <span className="ji-pos-img-badge">{pos.badge}</span>
      </div>
 
      <div className="ji-pos-top">
        <h3 className="ji-pos-title">{pos.title}</h3>
        <div className="ji-pos-meta">
          <BriefcaseIcon size={13} />
          <span>{pos.type}</span>
          <span className="ji-pos-sep" aria-hidden="true">·</span>
          <span>{pos.location}</span>
        </div>
      </div>
      <p className="ji-pos-desc">{pos.desc}</p>
      <ul className="ji-pos-req">
        {pos.requirements.map((r) => (
          <li key={r}><CheckIcon size={13} />{r}</li>
        ))}
      </ul>
      <a href="/assessment" className="ji-pos-apply-btn">
        Apply for this Role <ArrowIcon size={14} />
      </a>
    </article>
  );
}
 
function Positions() {
  const [titleRef, titleVisible] = useReveal(0.1);
  return (
    <section className="ji-positions" id="positions">
      <div className="ji-container">
        <div
          ref={titleRef}
          className={`ji-section-head ji-reveal ${titleVisible ? "ji-revealed" : ""}`}
        >
          <span className="ji-tag">Current Openings</span>
          <h2 className="ji-section-title">Open Positions</h2>
          <p className="ji-section-sub">
            Actively hiring across Gwinnett, DeKalb, Cobb, Fulton, Clayton, Henry,
            Walton, Morrow, Rockdale, and Forsyth counties.
          </p>
        </div>
        <div className="ji-positions-grid">
          {POSITIONS.map((pos, i) => (
            <PositionCard key={pos.id} pos={pos} delay={`${i * 0.1}s`} />
          ))}
        </div>
      </div>
    </section>
  );
}
/* ══════════════════════════════════════
   REQUIREMENTS
══════════════════════════════════════ */
function Requirements() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="ji-reqs">
      <div className="ji-container">
        <div
          ref={ref}
          className={`ji-reqs-inner ji-reveal ${visible ? "ji-revealed" : ""}`}
        >
          <div className="ji-reqs-copy">
            <span className="ji-tag ji-tag--gold">General Requirements</span>
            <h2 className="ji-reqs-title">What We Look For</h2>
            <p className="ji-reqs-sub">
              Experience is a plus, but heart is a must. We welcome caregivers at every
              stage of their journey — we'll train you for the rest.
            </p>
            <a href="/hiring-process" className="ji-btn-outline">
              See the Hiring Process <ArrowIcon size={14} />
            </a>
          </div>
          <ul className="ji-reqs-list">
            {REQUIREMENTS.map((r) => (
              <li key={r}>
                <span className="ji-reqs-check"><CheckIcon size={13} /></span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function JobInfo() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SEO
        title="Caregiver Jobs in Gwinnett County | Helen's Home Care Careers"
        description="Join Helen's Home Care as a Home Health Aide or Companion Caregiver. Flexible hours, competitive pay, and meaningful work serving seniors in Gwinnett County, GA."
        canonical="/job-info"
      />
    <main className="ji-page">
      <JobHero />
      <Requirements />
      <Positions />
      <WhyJoinUs />
      <AssessmentSection/>
    </main>
    </>
  );
}