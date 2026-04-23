import { useEffect, useRef, useState } from "react";
import "../componentscss/AssessmentSection.css";
import { PhoneIcon, MailIcon, CheckCircleIcon, ChevronIcon } from "./icons";

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const CARE_TYPES = [
  "Senior Home Care Services",
  "Personal Care Services",
  "24/7 In-Home Care",
  "Companion Care Service",
  "Hospital to Home Transition Care",
  "Assistance Before & After Surgery",
  "Dementia Care Services",
  "Alzheimer's Care Services",
  "Unsure",
  "Looking for Work",
];

const SERVICE_LOCATIONS = [
  "Gwinnett County",
  "DeKalb County",
  "Cobb County",
  "Fulton County",
  "Clayton County",
  "Henry County",
  "Walton County",
  "Rockdale County",
  "Morrow County",
  "Forsyth County",
];

/* ═══════════════════════════════════════
   FORM (internal)
═══════════════════════════════════════ */
function AssessmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", phone: "",
    city: "", location: "", care: "",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div className="as-form-success">
        <div className="as-form-success-icon"><CheckCircleIcon className="as-success-svg" /></div>
        <h3>Thank You, {form.firstName}!</h3>
        <p>We'll reach out within 1 business day to schedule your free in-home assessment.</p>
        <div className="as-form-success-contacts">
          <a href="tel:+17708614402" className="as-form-success-link">
            <PhoneIcon className="as-contact-svg" /> 770-861-4402
          </a>
          <a href="mailto:helenshomecarellc@gmail.com" className="as-form-success-link">
            <MailIcon className="as-contact-svg" /> helenshomecarellc@gmail.com
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="as-form" onSubmit={submit} noValidate>

      {/* Row 1 — Names */}
      <div className="as-form-row">
        <div className="as-form-group">
          <label htmlFor="af-firstName">First Name</label>
          <input id="af-firstName" name="firstName" type="text"
            placeholder="Jane" value={form.firstName} onChange={handle} required />
        </div>
        <div className="as-form-group">
          <label htmlFor="af-lastName">Last Name</label>
          <input id="af-lastName" name="lastName" type="text"
            placeholder="Doe" value={form.lastName} onChange={handle} required />
        </div>
      </div>

      {/* Row 2 — Email + Phone */}
      <div className="as-form-row">
        <div className="as-form-group">
          <label htmlFor="af-email">Email Address</label>
          <input id="af-email" name="email" type="email"
            placeholder="jane@email.com" value={form.email} onChange={handle} required />
        </div>
        <div className="as-form-group">
          <label htmlFor="af-phone">Phone Number</label>
          <input id="af-phone" name="phone" type="tel"
            placeholder="(770) 000-0000" value={form.phone} onChange={handle} required />
        </div>
      </div>

      {/* Row 3 — City + Location */}
      <div className="as-form-row">
        <div className="as-form-group">
          <label htmlFor="af-city">City</label>
          <input id="af-city" name="city" type="text"
            placeholder="Lawrenceville" value={form.city} onChange={handle} required />
        </div>
        <div className="as-form-group">
          <label htmlFor="af-location">Service Location</label>
          <div className="as-select-wrap">
            <select id="af-location" name="location"
              value={form.location} onChange={handle} required>
              <option value="" disabled>Select a county…</option>
              {SERVICE_LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <span className="as-select-arrow" aria-hidden="true"><ChevronIcon size={14} /></span>
          </div>
        </div>
      </div>

      {/* Care type — full width */}
      <div className="as-form-group as-form-group--full">
        <label htmlFor="af-care">Type of Care Needed</label>
        <div className="as-select-wrap">
          <select id="af-care" name="care"
            value={form.care} onChange={handle} required>
            <option value="" disabled>Select a care type…</option>
            {CARE_TYPES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="as-select-arrow" aria-hidden="true"><ChevronIcon size={14} /></span>
        </div>
      </div>

      <button type="submit" className="as-form-submit">
        Request My Free Assessment
      </button>

      <p className="as-form-note">
        No obligation · A care coordinator will contact you within 24 hours
      </p>
    </form>
  );
}

/* ═══════════════════════════════════════
   ASSESSMENT SECTION  (exported)
   Usage:  <AssessmentSection id="assessment" />
═══════════════════════════════════════ */
export default function AssessmentSection({ id = "assessment" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="as-section" id={id}>
      <div className={`as-inner ${visible ? "as-visible" : ""}`} ref={ref}>

        {/* ── Left: copy + contact ── */}
        <div className="as-copy">
          <span className="as-eyebrow">No Obligation</span>
          <h2 className="as-title">
            Request a Free<br />
            <em>In-Home Assessment</em>
          </h2>
          <p className="as-desc">
            Not sure where to start? Let one of our care coordinators visit you —
            at no cost — to understand your needs and design a personalised care plan.
          </p>

          <ul className="as-perks">
            <li><span className="as-perk-dot" />Personalised care plan included</li>
            <li><span className="as-perk-dot" />No commitment required</li>
            <li><span className="as-perk-dot" />Response within 24 hours</li>
          </ul>

          <div className="as-contact-row">
            <a href="tel:+17708614402" className="as-contact-item">
              <span className="as-contact-icon-wrap"><PhoneIcon className="as-contact-svg" /></span>
              <span>770-861-4402</span>
            </a>
            <a href="mailto:helenshomecarellc@gmail.com" className="as-contact-item">
              <span className="as-contact-icon-wrap"><MailIcon className="as-contact-svg" /></span>
              <span>helenshomecarellc@gmail.com</span>
            </a>
          </div>
        </div>

        {/* ── Right: form card ── */}
        <div className="as-form-card" id="contact">
          <div className="as-form-card-header">
            <h3>Book Your Free Assessment</h3>
            <p>Takes less than 2 minutes</p>
          </div>
          <AssessmentForm />
        </div>

      </div>
    </section>
  );
}