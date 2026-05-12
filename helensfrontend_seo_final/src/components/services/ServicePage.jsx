import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, PinIcon, ArrowIcon } from "../icons";
import AssessmentSection from "../Assessmentsection";
import "../../componentscss/ServicePage.css";
import SEO from "../SEO.jsx";

const LOCATIONS = [
  "Gwinnett", "Dekalb", "Cobb", "Fulton",
  "Clayton", "Henry", "Morrow", "Walton",
  "Rockdale", "Forsyth",
];

const ALL_SERVICES = [
  {
    label: "Senior Home Care Services",
    href:  "/services/senior-home-care",
    img:   "/15.jpg",
    desc:  "Compassionate, personalised care for seniors living at home — from daily assistance to skilled support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Personal Care Services",
    href:  "/services/personal-care",
    img:   "/20.jpg",
    desc:  "Hands-on assistance with bathing, grooming, dressing, and mobility — preserving dignity at every step.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2" /><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
  {
    label: "24/7 In-Home Care",
    href:  "/services/24-7-in-home-care",
    img:   "/25.jpg",
    desc:  "Around-the-clock coverage for clients who need continuous support — day, night, weekends, and holidays.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Companion Care Services",
    href:  "/services/companion-care",
    img:   "/19.jpg",
    desc:  "Meaningful companionship, social engagement, and light everyday support that keeps loneliness at bay.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    label: "Hospital to Home Transition Care",
    href:  "/services/hospital-to-home",
    img:   "/23.jpg",
    desc:  "Safe, structured support for clients returning home after a hospital stay — reducing readmission risk.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <rect x="9" y="2" width="6" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="12" y1="9" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    label: "Assistance Before and After Surgery",
    href:  "/services/surgery-assistance",
    img:   "/24.jpg",
    desc:  "Expert pre- and post-surgical support to prepare your home and assist through a safe recovery.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: "Dementia Care Services",
    href:  "/services/dementia-care",
    img:   "/22.jpg",
    desc:  "Specialist dementia care providing safety, structure, and dignity — with compassionate family guidance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.14" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.14" />
      </svg>
    ),
  },
  {
    label: "Alzheimer's Care Services",
    href:  "/services/alzheimers-care",
    img:   "/18.jpg",
    desc:  "Dedicated, stage-by-stage Alzheimer's care at home — preserving identity and supporting the whole family.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function ServicePage({ config }) {
  const {
    title,
    subtitle,
    heroTag,
    intro,
    introHighlights,
    items,
    whyTitle = "Why Choose Helen's Home Care?",
    whyPoints,
    accent = "blue",
    heroImage,
  } = config;

  const otherServices = ALL_SERVICES.filter((s) => s.label !== title);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="sp-root">
      <SEO
        title={`${config.title} in Gwinnett County | Helen's Home Care`}
        description={`${config.subtitle} Helen's Home Care provides ${config.title.toLowerCase()} across Gwinnett County and surrounding Atlanta-area counties. ${config.intro && config.intro[0] ? config.intro[0].slice(0, 120) + '...' : ''}`}
        canonical={`/services/${config.slug || ''}`}
        schema={[{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": config.title,
          "description": config.subtitle,
          "provider": {
            "@type": "HomeHealthCareService",
            "name": "Helen's Home Care",
            "url": "https://www.helenshomecarellc.com",
            "telephone": "+17708614402",
            "areaServed": "Gwinnett County and surrounding Atlanta counties, GA"
          },
          "areaServed": "Gwinnett County, GA",
          "url": `https://www.helenshomecarellc.com/services/${config.slug || ''}`
        }]}
      />

      {/* ── Hero ── */}
      <section className="sp-hero" style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}>
        <div className="sp-hero-inner">
          <nav className="sp-breadcrumb" aria-label="breadcrumb">
            <span>Care Services</span>
            <span aria-hidden="true">/</span>
            <span className="sp-bc-current">{title}</span>
          </nav>
          <span className="sp-eyebrow">{heroTag}</span>
          <h1 className="sp-hero-title">{title}</h1>
          <p className="sp-hero-sub">{subtitle}</p>
          <Link to="/assessment" className="sp-hero-cta">
            Schedule a Free Assessment
            <ArrowIcon size={16} />
          </Link>
        </div>
        {/* Hero shape — remplace /images/hero-shape-bg.jpg par ton image */}
        <div className="sp-hero-shape" aria-hidden="true" />
      </section>

      {/* ── Intro ── */}
      <section className="sp-intro">
        <div className="sp-container sp-intro-grid">
          <div className="sp-intro-text">
            <h2 className="sp-section-title">About This Service</h2>
            <div className="sp-gold-rule" />
            {intro.map((p, i) => (
              <p key={i} className="sp-body">{p}</p>
            ))}
          </div>
          <div className="sp-intro-card">
            <div className="sp-intro-card-inner">
              <p className="sp-card-label">At a Glance</p>
              <ul className="sp-check-list">
                {introHighlights.map((h, i) => (
                  <li key={i}>
                    <CheckIcon size={16} className="sp-check-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Helen's ── */}
      <section className="sp-why">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-eyebrow-sm sp-eyebrow-gold">Our Promise</span>
            <h2 className="sp-section-title sp-title-light">{whyTitle}</h2>
            <div className="sp-gold-rule sp-rule-center" />
          </div>
          <div className="sp-why-grid">
            {whyPoints.map((pt, i) => (
              <div key={i} className="sp-why-card">
                <div className="sp-why-num" aria-hidden="true">0{i + 1}</div>
                <h3 className="sp-why-title">{pt.title}</h3>
                <p className="sp-why-desc">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="sp-services">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-eyebrow-sm">What We Provide</span>
            <h2 className="sp-section-title">Our {title} Includes</h2>
            <div className="sp-gold-rule sp-rule-center" />
          </div>
          <div className="sp-grid">
            {items.map((item, i) => (
              <div key={i} className={`sp-card sp-card--${accent}`}>
                <div className="sp-card-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="sp-card-title">{item.title}</h3>
                <p className="sp-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Assessment Section ── */}
      <AssessmentSection />
      
      {/* ── Other Services — Image Cover Cards ── */}
      <section className="sp-other">
        <div className="sp-container">
          <div className="sp-section-header">
            <span className="sp-eyebrow-sm">Explore More</span>
            <h2 className="sp-section-title">Our Other Services</h2>
            <div className="sp-gold-rule sp-rule-center" />
          </div>
          <div className="sp-other-grid">
            {otherServices.map((svc) => (
              <Link key={svc.href} to={svc.href} className="sp-other-card">
                {/* Image de fond */}
                <div
                  className="sp-other-card-bg"
                  style={{ backgroundImage: `url(${svc.img})` }}
                  aria-hidden="true"
                />
                {/* Texte */}
                <div className="sp-other-body">
                  <h3 className="sp-other-title">{svc.label}</h3>
                  <p className="sp-other-desc">{svc.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location CTA ── */}
      <section className="sp-locations">
        <div className="sp-container">
          <PinIcon size={36} className="sp-pin-icon" />
          <h2 className="sp-loc-title">
            Click on a location below to schedule a free assessment today
          </h2>
          <div className="sp-loc-pills">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc}
                to="/assessment"
                className="sp-loc-pill"
              >
                {loc}
              </Link>
            ))}
          </div>
          <Link to="/assessment" className="sp-loc-cta">
            Contact Us
            <ArrowIcon size={16} />
          </Link>
        </div>
      </section>

    </main>
  );
}