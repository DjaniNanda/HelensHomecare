import { useEffect, useState } from "react";
import "../componentscss/HiringProcess.css";
import { useReveal } from "../hooks/useReveal";
import {
  MailIcon,
  PhoneIcon,
  UsersIcon,
  ShieldIcon,
  ClipboardIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ArrowIcon,
} from "./icons";
import SEO from './SEO.jsx';

/* ══════════════════════════════════════
   DATA  — 7-step flow
══════════════════════════════════════ */
const STEPS = [
  {
    step: "01",
    title: "Fill Out the Assessment",
    desc: "Complete our quick online assessment form — it takes less than 5 minutes. Tell us about your experience, availability, and the type of care role you're interested in. No lengthy resume required.",
    duration: "Day 1",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80",
    imageAlt: "Person filling out an online form",
  },
  {
    step: "02",
    title: "Confirmation Email",
    desc: "Once you submit your assessment, you'll receive an automatic confirmation email acknowledging your application. Keep an eye on your inbox — our team reviews every submission within 1 business day.",
    duration: "Day 1 – 2",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=700&q=80",
    imageAlt: "Email confirmation on a laptop",
  },
  {
    step: "03",
    title: "A Team Member Will Call You",
    desc: "A member of our recruitment team will personally call you within 2 business days for a brief 15-minute conversation. We'll learn more about your background, your goals, and answer any questions you have about the role.",
    duration: "Days 2 – 3",
    image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=700&q=80",
    imageAlt: "Recruiter on phone call",
  },
  {
    step: "04",
    title: "In-Person Interview",
    desc: "Meet with our care manager at our Lawrenceville office or virtually. We'll talk about your background, your values, and how we can support you in your role. This is a two-way conversation — we want you to feel confident about joining our team.",
    duration: "Days 4 – 7",
    image: "/16.jpg",
    imageAlt: "In-person job interview",
  },
  {
    step: "05",
    title: "Background Check",
    desc: "All caregivers undergo a thorough check covering criminal history, reference verification, and driving record review. Your safety and the safety of our clients is our top priority. This typically takes 3 to 5 business days.",
    duration: "Days 7 – 12",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&q=80",
    imageAlt: "Background check documents",
  },
  {
    step: "06",
    title: "Start Making a Difference",
    desc: "You're officially part of the Helen's Home Care family! We'll match you with your first clients and support you every step of the way through your dedicated care coordinator. Your journey of impact begins here.",
    duration: "Day 12+",
    image: "/17.jpg",
    imageAlt: "Caregiver making a difference",
  },
];

const FAQS = [
  {
    q: "Do I need prior experience to apply?",
    a: "Not for all roles. Our Companion/Sitter Caregiver positions require no certification — just a caring attitude and reliability. HHA and CNA positions do require relevant credentials.",
  },
  {
    q: "How long does the full hiring process take?",
    a: "From application to first shift, most candidates are onboarded within 2 to 3 weeks depending on background check processing times.",
  },
  {
    q: "Is the orientation session paid?",
    a: "Yes. All mandatory orientation and training sessions are compensated at your agreed hourly rate.",
  },
  {
    q: "What counties does Helen's Home Care serve?",
    a: "We serve Gwinnett, DeKalb, Cobb, Fulton, Clayton, Henry, Morrow, Walton, Rockdale, and Forsyth counties.",
  },
  {
    q: "Can I work part-time or choose my hours?",
    a: "Absolutely. We offer full-time, part-time, and flexible schedules including days, evenings, and weekends. We'll work around your availability.",
  },
  {
    q: "What documents do I need to bring?",
    a: "A government-issued photo ID, Social Security card or work authorization, and any relevant certifications such as your HHA or CNA license and CPR card.",
  },
];

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function HPHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`hp-hero ${loaded ? "hp-hero--loaded" : ""}`}>
      <div className="hp-hero-overlay" aria-hidden="true" />
      <div className="hp-hero-inner">
        <span className="hp-hero-eyebrow">
          <span className="hp-eyebrow-dot" />
          Simple & Transparent
        </span>
        <h1 className="hp-hero-headline">Our Hiring Process</h1>
        <p className="hp-hero-sub">
          We've built a straightforward, respectful process that gets you working in as
          little as two weeks. Here's exactly what to expect — no surprises, no long waits.
        </p>
        <div className="hp-hero-actions">
          <a href="/assessment" className="hp-btn-gold">
            <MailIcon size={17} /> Apply Now
          </a>
          <a href="/job-info" className="hp-btn-ghost">
            <BriefcaseIcon size={17} /> View Open Roles
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   STEP CARD — alternating layout with image
══════════════════════════════════════ */
function StepCard({ s, index, isLast }) {
  const [ref, visible] = useReveal(0.08);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`hp-step-row hp-reveal ${visible ? "hp-revealed" : ""} ${isEven ? "" : "hp-step-row--reverse"}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      {/* Image side */}
      <div className="hp-step-img-side">
        <div className="hp-step-img-wrap">
          <img src={s.image} alt={s.imageAlt} className="hp-step-img" />
          <div className="hp-step-img-overlay" />
          <span className="hp-step-img-num">{s.step}</span>
        </div>
      </div>

      {/* Content side */}
      <div className="hp-step-content-side">
        {/* Connector line (not on last) */}
        {!isLast && <div className="hp-step-v-connector" aria-hidden="true" />}

        <div className="hp-step-body">
          <div className="hp-step-meta">
            <span className="hp-step-num-label">Step {s.step}</span>
            <span className="hp-step-dur">{s.duration}</span>
          </div>
          <h3 className="hp-step-title">{s.title}</h3>
          <p className="hp-step-desc">{s.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   TIMELINE
══════════════════════════════════════ */
function Timeline() {
  const [titleRef, titleVisible] = useReveal(0.1);
  return (
    <section className="hp-timeline">
      <div className="hp-container">
        <div
          ref={titleRef}
          className={`hp-section-head hp-reveal ${titleVisible ? "hp-revealed" : ""}`}
        >
          <span className="hp-tag">Step by Step</span>
          <h2 className="hp-section-title">From Assessment to First Shift</h2>
          <p className="hp-section-sub">
            Six clear steps. We keep you informed at every stage so you always know what's next.
          </p>
        </div>
        <div className="hp-steps-rows">
          {STEPS.map((s, i) => (
            <StepCard key={s.step} s={s} index={i} isLast={i === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   FAQ ITEM — own component
══════════════════════════════════════ */
function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`hp-faq-item hp-reveal ${open ? "hp-faq-item--open" : ""} ${visible ? "hp-revealed" : ""}`}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <button
        className="hp-faq-q"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {item.q}
        <span className="hp-faq-chevron" aria-hidden="true" />
      </button>
      <div className="hp-faq-a">
        <p>{item.a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [titleRef, titleVisible] = useReveal(0.1);
  return (
    <section className="hp-faq">
      <div className="hp-container">
        <div
          ref={titleRef}
          className={`hp-section-head hp-reveal ${titleVisible ? "hp-revealed" : ""}`}
        >
          <span className="hp-tag hp-tag--light">Got Questions?</span>
          <h2 className="hp-section-title">Frequently Asked Questions</h2>
          <p className="hp-section-sub">
            Answers to the most common questions we receive from candidates going through our process.
          </p>
        </div>
        <div className="hp-faq-list">
          {FAQS.map((f, i) => (
            <FAQItem key={f.q} item={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CTA
══════════════════════════════════════ */
function HPCTA() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="hp-cta">
      <div className="hp-container">
        <div
          ref={ref}
          className={`hp-cta-inner hp-reveal ${visible ? "hp-revealed" : ""}`}
        >
          <CheckCircleIcon size={52} className="hp-cta-icon" />
          <h2 className="hp-cta-title">Ready to Start?</h2>
          <p className="hp-cta-sub">
            The first step takes less than 5 minutes. Fill out the assessment and we'll take it from there.
          </p>
          <div className="hp-cta-actions">
            <a href="/assessment" className="hp-btn-gold">
              <ClipboardIcon size={18} /> Fill Out Assessment
            </a>
            <a href="/job-info" className="hp-btn-ghost">
              <BriefcaseIcon size={18} /> Browse Positions <ArrowIcon size={14} />
            </a>
          </div>
          <div className="hp-cta-contact">
            <a href="tel:+17708614402" className="hp-cta-phone">
              <PhoneIcon size={16} /> Or call us: 770-861-4402
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function HiringProcess() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <SEO
        title="How to Join Our Team | Helen's Home Care Hiring Process"
        description="Learn how to apply and join Helen's Home Care team of compassionate caregivers in Gwinnett County. Simple steps — apply today and start making a difference."
        canonical="/hiring-process"
      />
    <main className="hp-page">
      <HPHero />
      <Timeline />
      <FAQ />
      <HPCTA />
    </main>
    </>
  );
}