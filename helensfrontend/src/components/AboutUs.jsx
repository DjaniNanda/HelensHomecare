import { useEffect, useState } from "react";
import "../componentscss/AboutUs.css";
import AssessmentSection from "./Assessmentsection.jsx";
import { useReveal } from "../hooks/useReveal";
import {
  StarIcon, ShieldIcon, HandsIcon,
  HeartIcon, HomeIcon, UsersIcon,
  CheckIcon, PinIcon, PhoneIcon,
} from "./icons";

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const VALUES = [
  {
    Icon: StarIcon,
    iconClass: "au-val-svg",
    title: "Serve Passionately",
    desc: "We seek highly skilled caregivers who are genuinely passionate about providing the best possible care — every single visit, every single day.",
    color: "blue",
  },
  {
    Icon: ShieldIcon,
    iconClass: "au-val-svg",
    title: "Dignity & Respect",
    desc: "Every client deserves to be treated with unwavering dignity and respect, regardless of their care needs or level of dependency.",
    color: "gold",
  },
  {
    Icon: HandsIcon,
    iconClass: "au-val-svg",
    title: "Present & Engaged",
    desc: "We design personalized care plans tailored to each individual — staying flexible, attentive, and truly engaged at every step of the journey.",
    color: "sky",
  },
];

const STATS = [
  { Icon: HeartIcon, iconClass: "au-stat-svg", value: "100%", label: "Dedicated to Your Comfort" },
  { Icon: HomeIcon,  iconClass: "au-stat-svg", value: "10+",  label: "Counties Served" },
  { Icon: UsersIcon, iconClass: "au-stat-svg", value: "24/7", label: "Available Support" },
];

const LOCATIONS = [
  "Gwinnett", "DeKalb", "Cobb", "Fulton", "Clayton",
  "Henry", "Morrow", "Walton", "Rockdale", "Forsyth",
];

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function AboutHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className={`au-hero ${loaded ? "au-hero--loaded" : ""}`} id="about">
      <div className="au-hero-blob au-hero-blob--1" aria-hidden="true" />
      <div className="au-hero-blob au-hero-blob--2" aria-hidden="true" />
      <div className="au-hero-inner">
        <div className="au-hero-copy">
          <div className="au-hero-badge">
            <span className="au-hero-badge-dot" />
            Serving Gwinnett County and its surroundings since 2026
          </div>
          <h1 className="au-hero-headline">
            Holistic Care,<br />
            <em>Rooted in Purpose</em>
          </h1>
          <p className="au-hero-sub">
            Helen's Home Care is a privately owned and operated non-medical personal care provider
            built on one simple belief — everyone deserves quality care in the place
            where they feel safest.
          </p>
          <div className="au-hero-actions">
            <a href="/assessment" className="au-btn-primary">Request a Free Assessment</a>
            <a href="tel:+17708614402" className="au-btn-secondary">Call 770-861-4402</a>
          </div>
        </div>

        <div className="au-hero-visual">
          <div className="au-hero-img-frame">
            <img src="/5.jfif" alt="Caring nurse with elderly patient at home" className="au-hero-img" loading="eager" />
            <div className="au-hero-img-badge">
              <HeartIcon className="au-stat-svg" />
              <span>Care with heart</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   OUR STORY
═══════════════════════════════════════ */
function OurStory() {
  const [ref, visible] = useReveal(0.08);
  return (
    <section className="au-story" ref={ref}>
      <div className={`au-story-inner ${visible ? "au-revealed" : ""}`}>

        {/* Image side */}
        <div className="au-story-visual">
          <div className="au-story-img-wrap">
            <img src="/6.jfif" alt="Caregiver with elderly patient in a warm home setting" className="au-story-img" loading="lazy" />
          </div>
          <div className="au-story-accent-card">
            <p className="au-story-accent-quote">
              "She often found that people enjoyed a higher quality of life when care comes to them."
            </p>
          </div>
        </div>

        {/* Copy side */}
        <div className="au-story-copy">
          <span className={`au-eyebrow ${visible ? "au-revealed" : ""}`}>Our Story</span>
          <h2 className={`au-section-title ${visible ? "au-revealed" : ""}`}>
            Born from a Nurse's<br /><em>Years of Experience</em>
          </h2>
          <p className="au-story-text">
            Helen's Home Care is founded by a nurse with years of experience working alongside hundreds of elderly patients.
            Throughout her career, she noticed something profound — many people did not need to travel to a doctor's office
            or hospital for their care. What they truly enjoyed was skilled, compassionate care delivered in the comfort of their own home.
          </p>
          <p className="au-story-text">
            That insight became her mission. She set out to build a home care agency where she and other dedicated professionals
            could provide holistic, personalized care to local seniors — allowing them to maintain their independence, their routines,
            and their dignity without ever leaving the place they love most.
          </p>
          <div className="au-story-checks">
            <div className="au-story-check"><span className="au-check-dot"><CheckIcon size={14} /></span>Privately owned &amp; operated</div>
            <div className="au-story-check"><span className="au-check-dot"><CheckIcon size={14} /></span>Serving Gwinnett county and its surroundings areas</div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   MISSION
═══════════════════════════════════════ */
function Mission() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="au-mission" ref={ref}>
      <div className={`au-mission-inner ${visible ? "au-revealed" : ""}`}>
        <span className={`au-eyebrow au-eyebrow--light ${visible ? "au-revealed" : ""}`}>Our Mission</span>
        <h2 className={`au-section-title au-section-title--light ${visible ? "au-revealed" : ""}`}>
          Enabling Independent Living,<br /><em>Right at Home</em>
        </h2>
        <p className="au-mission-text">
          Our mission is to offer quality care enabling our clients to maintain independent living
          in the comfort of their own home and communities. Whether at home, in hospital,
          in a senior living facility, or elsewhere — our passionate care team provides
          individualized services and flexible support every step of the way.
        </p>

        <div className="au-stats">
          {STATS.map(({ Icon, iconClass, value, label }) => (
            <div className="au-stat" key={label}>
              <div className="au-stat-icon"><Icon className={iconClass} /></div>
              <span className="au-stat-value">{value}</span>
              <span className="au-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CORE VALUES
═══════════════════════════════════════ */
function CoreValues() {
  const [ref, visible] = useReveal(0.08);
  return (
    <section className="au-values" ref={ref}>
      <div className="au-values-header">
        <span className={`au-eyebrow ${visible ? "au-revealed" : ""}`}>Our Foundation</span>
        <h2 className={`au-section-title ${visible ? "au-revealed" : ""}`}>
          The Values We Live By
        </h2>
        <p className={`au-values-sub ${visible ? "au-revealed" : ""}`}>
          Everything we do is guided by three core principles that shape every interaction, every care plan, and every visit.
        </p>
      </div>
      <div className="au-values-grid">
        {VALUES.map((v, i) => (
          <div
            key={v.title}
            className={`au-val-card au-val-card--${v.color} ${visible ? "au-revealed" : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="au-val-icon"><v.Icon className={v.iconClass} /></div>
            <h3 className="au-val-title">{v.title}</h3>
            <p className="au-val-desc">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SERVICE AREAS
═══════════════════════════════════════ */
function ServiceAreas() {
  const [ref, visible] = useReveal(0.08);
  return (
    <section className="au-areas" ref={ref}>
      <div className={`au-areas-inner ${visible ? "au-revealed" : ""}`}>
        <div className="au-areas-copy">
          <span className={`au-eyebrow ${visible ? "au-revealed" : ""}`}>Where We Serve</span>
          <h2 className={`au-section-title ${visible ? "au-revealed" : ""}`}>
            Covering <em>Gwinnett County and its surroundings</em>
          </h2>
          <p className="au-areas-text">
            Based in Lawrenceville, Georgia, we provide care across Gwinnett County
            and 9 surrounding counties. From companion care to 24/7 nursing support,
            our care teams are never far from those who need us.
          </p>
          <p className="au-areas-cta-label">
            Click on a location below to schedule a free assessment today.
          </p>
          <div className="au-areas-badges">
            {LOCATIONS.map((loc, i) => (
              <a
                key={loc}
                href="/assessment"
                className="au-area-badge"
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <PinIcon size={15} /> {loc}
              </a>
            ))}
          </div>
          <a href="/assessment" className="au-btn-primary au-areas-btn">
            Contact Us
          </a>
        </div>

        <div className="au-areas-map">
          <iframe
            title="Helen's Home Care service area — Lawrenceville, Georgia"
            src="https://maps.google.com/maps?q=Lawrenceville,+Georgia,+USA&z=10&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   CTA BANNER
═══════════════════════════════════════ */
function AboutCta() {
  const [ref, visible] = useReveal(0.1);
  return (
    <section className="au-cta" ref={ref}>
      <div className={`au-cta-inner ${visible ? "au-revealed" : ""}`}>
        <div className="au-cta-copy">
          <h2 className="au-cta-title">Ready to Get Started?</h2>
          <p className="au-cta-sub">
            Let one of our care coordinators visit you at no cost — and design
            a personalised care plan built entirely around your needs.
          </p>
        </div>
        <div className="au-cta-actions">
          <a href="/assessment" className="au-btn-primary">Request a Free Assessment</a>
          <a href="tel:+17708614402" className="au-btn-secondary au-btn-secondary--dark">
            Call 770-861-4402
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════ */
export default function AboutUs() {
  return (
    <main className="about-page">
      <AboutHero />
      <OurStory />
      <Mission />
      <CoreValues />
      <AboutCta />
      <ServiceAreas />
      <AssessmentSection />
    </main>
  );
}