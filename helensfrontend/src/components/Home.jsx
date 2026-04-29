import { useEffect, useState } from "react";
import AssessmentSection from "./Assessmentsection.jsx";
import "../componentscss/Home.css";
import { useReveal } from "../hooks/useReveal";
import {
  ArrowIcon, CheckIcon, PinIcon,
  StarIcon, ShieldIcon, HandsIcon,
} from "./icons";

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const SERVICES = [
  {
    accent: "blue",
    title: "Senior Home Care",
    desc: "Comprehensive, compassionate care tailored to each senior's unique needs — delivered in the comfort of their own home.",
    features: ["Personalized care plans", "Skilled caregivers", "Family communication"],
    img: "/10.jpg",
  },
  {
    accent: "gold",
    title: "Personal Care Services",
    desc: "Hands-on assistance with daily activities — bathing, grooming, dressing, mobility — preserving dignity at every step.",
    features: ["Bathing & grooming", "Mobility & transfers", "Medication reminders"],
    img: "/1.jpg",
  },
  {
    accent: "sky",
    title: "Companion Care",
    desc: "Meaningful social engagement, errands, light housekeeping, and daily living support that keeps loneliness at bay.",
    features: ["Emotional support", "Transportation & errands", "Light housekeeping"],
    img: "/7.jfif",
  },
  {
    accent: "blue",
    title: "24 / 7 In-Home Care",
    desc: "Around-the-clock coverage for clients who need continuous support — day, night, weekends, and holidays.",
    features: ["Overnight care", "Weekend & holiday cover", "Flexible scheduling"],
    img: "/8.jpg",
  },
  {
    accent: "gold",
    title: "Hospital-to-Home Transition",
    desc: "Safe, smooth recovery support after hospitalisation — reducing readmission risk and easing the transition home.",
    features: ["Post-discharge planning", "Follow-up coordination", "Safety home checks"],
    img: "/2.jpg",
  },
  {
    accent: "sky",
    title: "Dementia & Alzheimer's Care",
    desc: "Specialised memory care in a familiar setting, supporting both clients and their families through every stage.",
    features: ["Memory care routines", "Behaviour management", "Family guidance"],
    img: "/9.jfif",
  },
];

const VALUES = [
  {
    Icon: StarIcon,
    iconClass: "val-icon-svg",
    title: "Serve Passionately",
    desc: "We recruit highly skilled caregivers who are genuinely passionate about delivering the best possible care — every single visit.",
  },
  {
    Icon: ShieldIcon,
    iconClass: "val-icon-svg",
    title: "Dignity & Respect",
    desc: "Every client deserves to be treated with unwavering dignity and respect, regardless of their care needs or level of dependency.",
  },
  {
    Icon: HandsIcon,
    iconClass: "val-icon-svg",
    title: "Present & Engaged",
    desc: "We build personalized care plans designed around each individual — staying flexible, attentive, and truly engaged at all times.",
  },
];

const MAP_LOCATIONS = [
  { name: "Gwinnett",  query: "Gwinnett+County,+Georgia,+USA",  zoom: 10 },
  { name: "DeKalb",    query: "DeKalb+County,+Georgia,+USA",    zoom: 11 },
  { name: "Cobb",      query: "Cobb+County,+Georgia,+USA",      zoom: 11 },
  { name: "Fulton",    query: "Fulton+County,+Georgia,+USA",    zoom: 10 },
  { name: "Clayton",   query: "Clayton+County,+Georgia,+USA",   zoom: 11 },
  { name: "Henry",     query: "Henry+County,+Georgia,+USA",     zoom: 11 },
  { name: "Walton",    query: "Walton+County,+Georgia,+USA",    zoom: 11 },
  { name: "Rockdale",  query: "Rockdale+County,+Georgia,+USA",  zoom: 11 },
  { name: "Morrow",    query: "Morrow,+Georgia,+USA",           zoom: 12 },
  { name: "Forsyth",   query: "Forsyth+County,+Georgia,+USA",   zoom: 11 },
];

const HQ_MAP = { query: "Lawrenceville,+Georgia,+USA", zoom: 12 };

function DualCtaBanner() {
  const [ref, visible] = useReveal(0.1);
  return (
    <div className={`dual-cta`} ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)'
    }}>
      {/* Card 1 — Free Assessment */}
      <a href="/assessment" className="dual-cta-card">
        <img src="/4.jfif" alt="Caregiver speaking with elderly woman" className="dual-cta-card-bg" />
        <div className="dual-cta-card-body">
          <h3 className="dual-cta-card-title">Interested in a<br />Free Assessment?</h3>
          <span className="dual-cta-card-btn">Schedule Now</span>
        </div>
      </a>

      {/* Card 2 — Become a Caregiver */}
      <a href="/hiring-process" className="dual-cta-card">
        <img src="/3.jfif" alt="Caregiver assisting elderly patient at home" className="dual-cta-card-bg" />
        <div className="dual-cta-card-body">
          <h3 className="dual-cta-card-title">Interested in Becoming<br />a Caregiver?</h3>
          <span className="dual-cta-card-btn">Learn More</span>
        </div>
      </a>
    </div>
  );
}

/* ── Home Care explainer service items ── */
const HC_ITEMS = [
  {
    label: "Personal Care & Assistance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
    highlight: true,
  },
  {
    label: "Meal Prep & Groceries",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    ),
    highlight: false,
  },
  {
    label: "Transportation & Errands",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    highlight: false,
  },
  {
    label: "Medication Reminders",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 12h6" /><path d="M12 9v6" />
      </svg>
    ),
    highlight: false,
  },
  {
    label: "Light Housekeeping",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    highlight: false,
  },
  {
    label: "24/7 In-Home Care & Nursing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    highlight: true,
  },
  {
    label: "Respite Care for Family Members",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    highlight: false,
  },
  {
    label: "Companionship",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </svg>
    ),
    highlight: true,
  },
];

function HomeCareExplainer() {
  const [ref, visible] = useReveal(0.07);
  return (
    <section className="hce-section" id="about" ref={ref}>
      <div className={`hce-inner ${visible ? "hce-visible" : ""}`}>

        {/* ── Left copy ── */}
        <div className="hce-copy">
          <span className="hce-eyebrow">What We Do</span>
          <h2 className="hce-title">Home Care</h2>
          <p className="hce-tagline">Flexible Care as Unique as You</p>
          <p className="hce-desc">
            <strong>At Helen's Homecare, everything we do happens in the place that is convenient for you.</strong> Whether at home, the hospital, the senior living or elsewhere, our passionate and dedicated care team provide our clients with individualized services and flexible support.
          </p>
          <p className="hce-desc">
            From assistance with personal hygiene and mobility to medication reminders,
            transportation, meal preparation — our
            comprehensive range of services ensures you or your loved one receives exactly
            the level of care needed, right where you feel safest and most comfortable.
          </p>
          <p className="hce-desc">
            We serve people across Gwinnett County and its surroundings areas. Whether you need
            a few hours or continuous 24/7 support, our care coordinators will
            design a personalized plan built entirely around your needs.
          </p>
          {/* ── ocuppe toi  du href ── */}
          <a href="#assessment" className="hce-cta">Learn More</a>
        </div>

        {/* ── Right grid ── */}
        <div className="hce-grid">
          {HC_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`hce-item ${item.highlight ? "hce-item--highlight" : ""}`}
              style={{ transitionDelay: `${i * 55}ms` }}
            >
              <div className="hce-item-icon">{item.icon}</div>
              <span className="hce-item-label">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════ */
function ServiceCard({ svc, index }) {
  const [ref, visible] = useReveal(0.08);
  return (
    <div
      ref={ref}
      className={`svc-card svc-card--${svc.accent} ${visible ? "revealed" : ""}`}
      style={{ transitionDelay: `${index * 75}ms` }}
    >
      <div className="svc-card-img-wrap">
        <img src={svc.img} alt={svc.title} className="svc-card-img" loading="lazy" />
      </div>
      <div className="svc-card-body">
        <h3 className="svc-card-title">{svc.title}</h3>
        <p className="svc-card-desc">{svc.desc}</p>
        <ul className="svc-card-features">
          {svc.features.map(f => (
            <li key={f}>
              <span className="feat-check"><CheckIcon /></span>
              {f}
            </li>
          ))}
        </ul>
        <a href="/assessment" className={`svc-card-link svc-card-link--${svc.accent}`}>
          Request This Service <ArrowIcon />
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════ */
export default function Home() {
  const [heroLoaded, setHeroLoaded]     = useState(false);
  const [activeCounty, setActiveCounty] = useState(null);

  const [svcsRef, svcsVisible] = useReveal(0.05);
  const [valRef,  valVisible]  = useReveal(0.08);
  const [locRef,  locVisible]  = useReveal(0.08);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const activeMap = activeCounty ?? HQ_MAP;
  const mapSrc = `https://maps.google.com/maps?q=${activeMap.query}&z=${activeMap.zoom}&output=embed`;

  return (
    <main className="home">

      {/* ══════════════ HERO ══════════════ */}
      <section className={`hero ${heroLoaded ? "hero--loaded" : ""}`} id="home">
        <div className="hero-blob hero-blob--1" aria-hidden="true" />
        <div className="hero-blob hero-blob--2" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Serving Gwinnett County &amp; Surrounding Areas Since 2026
            </div>

            <h1 className="hero-headline">
              Quality Care<br />
              <em>in the Comfort of<br />Your Own Home</em>
            </h1>

            <p className="hero-sub">
              Helen's Home Care provides professional, non-medical personal care
              for seniors across Gwinnett County and its surroundings —
              delivered with dignity, warmth, and unwavering respect.
            </p>

            <div className="hero-actions">
              <a href="/assessment" className="btn-primary">
                Request a Free Assessment
              </a>
              <a href="tel:+17708614402" className="btn-secondary">
                Call Us — 770-861-4402
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-item"><CheckIcon /> Personalised Care Plans</div>
              <div className="trust-item"><CheckIcon /> Licensed &amp; Insured</div>
              <div className="trust-item"><CheckIcon /> Available 24 / 7</div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-img-frame">
              <img
                src="/12.jfif"
                alt="Caregiver holding elderly woman's hands warmly"
                className="hero-img"
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true"><span /></div>
      </section>

      {/* ══════════════ HOME CARE EXPLAINER ══════════════ */}
      <HomeCareExplainer />

      {/* ══════════════ SERVICES ══════════════ */}
      <section className="services-section" id="services">
        <div className="section-header" ref={svcsRef}>
          <span className={`section-eyebrow ${svcsVisible ? "revealed" : ""}`}>What We Offer</span>
          <h2 className={`section-title ${svcsVisible ? "revealed" : ""}`}>
            Care Services Built Around <em>You</em>
          </h2>
          <p className={`section-sub ${svcsVisible ? "revealed" : ""}`}>
            From companion care to specialised memory support, every service is shaped
            around the individual — shaped to fit their unique needs.
          </p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
        {/* ══════════════ DUAL CTA BANNER ══════════════ */}
        <DualCtaBanner />

      </section>


      {/* ══════════════ CORE VALUES ══════════════ */}
      <section className="values-section" ref={valRef}>
        <div className="section-header">
          <span className={`section-eyebrow section-eyebrow--light ${valVisible ? "revealed" : ""}`}>
            Our Foundation
          </span>
          <h2 className={`section-title section-title--light ${valVisible ? "revealed" : ""}`}>
            The Values We Live By
          </h2>
        </div>
        <div className="values-grid">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`val-card ${valVisible ? "revealed" : ""}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="val-icon"><v.Icon className={v.iconClass} /></div>
              <h3 className="val-title">{v.title}</h3>
              <p className="val-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════ LOCATIONS ══════════════ */}
      <section className="locations-section" id="locations" ref={locRef}>
        <div className="section-header">
          <span className={`section-eyebrow ${locVisible ? "revealed" : ""}`}>Where We Serve</span>
          <h2 className={`section-title ${locVisible ? "revealed" : ""}`}>
            Covering <em>Gwinnett County and its surroundings</em>
          </h2>
          <p className={`section-sub ${locVisible ? "revealed" : ""}`}>
            Based in Lawrenceville, Georgia — delivering care across 10 counties.
            Click a county to explore the area.
          </p>
        </div>

        <div className="loc-wrap">
          {/* Interactive map */}
          <div className="loc-map-col">
            <div className="loc-map-frame">
              <iframe
                key={mapSrc}
                title={activeCounty ? `${activeCounty.name} County map` : "Lawrenceville Georgia map"}
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="loc-hq">
              <PinIcon />
              <span>
                {activeCounty
                  ? <><strong>{activeCounty.name} County</strong>, Georgia</>
                  : <>Headquartered in <strong>Lawrenceville, GA</strong></>
                }
              </span>
              {activeCounty && (
                <button className="loc-reset" onClick={() => setActiveCounty(null)}>
                  ← Back to HQ
                </button>
              )}
            </div>
          </div>

          {/* County badges */}
          <div className="loc-counties-col">
            <p className="loc-counties-label">Select a county to view on map:</p>
            <div className="loc-counties">
              {MAP_LOCATIONS.map((loc, i) => (
                <button
                  key={loc.name}
                  className={`loc-badge ${locVisible ? "revealed" : ""} ${activeCounty?.name === loc.name ? "loc-badge--active" : ""}`}
                  style={{ transitionDelay: `${i * 55}ms` }}
                  onClick={() => setActiveCounty(activeCounty?.name === loc.name ? null : loc)}
                  aria-pressed={activeCounty?.name === loc.name}
                >
                  <PinIcon size={15} />
                  {loc.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════ ASSESSMENT ══════════════ */}
      <AssessmentSection id="assessment" />

    </main>
  );
}