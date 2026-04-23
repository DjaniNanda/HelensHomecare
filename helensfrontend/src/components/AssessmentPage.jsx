import { useState, useEffect, useRef } from "react";
import "../componentscss/AssessmentPage.css";
import { CheckIcon, HomeIcon, BriefcaseIcon, MessageIcon, LockIcon, PhoneIcon, WarningIcon } from "./icons";
import { API } from "../api/config";

/* ═══════════════════════════════════════
   CONSTANTS — match backend enums exactly
═══════════════════════════════════════ */

const STEPS = [
  { id: 1, label: "Your Info",   short: "Info" },
  { id: 2, label: "Care Needs",  short: "Care" },
];

const COUNTIES = [
  { value: "GWINNETT",  label: "Gwinnett" },
  { value: "DEKALB",    label: "DeKalb" },
  { value: "COBB",      label: "Cobb" },
  { value: "FULTON",    label: "Fulton" },
  { value: "CLAYTON",   label: "Clayton" },
  { value: "HENRY",     label: "Henry" },
  { value: "MORROW",    label: "Morrow" },
  { value: "WALTON",    label: "Walton" },
  { value: "ROCKDALE",  label: "Rockdale" },
  { value: "FORSYTH",   label: "Forsyth" },
];

const CARE_OPTIONS = [
  {
    value: "HOME_CARE",
    label: "Home Care",
    desc: "I am looking for professional care services at home.",
    Icon: HomeIcon,
  },
  {
    value: "LOOKING_FOR_WORK",
    label: "Looking for Work",
    desc: "I am a caregiver looking for employment opportunities.",
    Icon: BriefcaseIcon,
  },
  {
    value: "UNSURE",
    label: "Not Sure Yet",
    desc: "I'd like to speak with someone to explore my options.",
    Icon: MessageIcon,
  },
];

const INITIAL = {
  firstName: "", lastName: "",
  email: "", phoneNumber: "",
  county: "", city: "",
  typeOfCare: "",
};

/* ═══════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════ */
function ProgressBar({ current }) {
  return (
    <div className="ap-progress" aria-label="Form progress">
      {STEPS.map((step, i) => {
        const done   = step.id < current;
        const active = step.id === current;
        return (
          <div key={step.id} className="ap-progress-step">
            <div className={`ap-step-bubble ${done ? "done" : ""} ${active ? "active" : ""}`}>
              {done ? <CheckIcon size={14} /> : step.id}
            </div>
            <span className={`ap-step-label ${active ? "active" : ""} ${done ? "done" : ""}`}>
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`ap-step-line ${done ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════
   REASSURANCE BOX
═══════════════════════════════════════ */
function ReassuranceBox() {
  return (
    <aside className="ap-reassurance">
      <div className="ap-reassurance-item">
        <span className="ap-reassurance-icon"><LockIcon size={20} /></span>
        <div>
          <strong>100% Confidential</strong>
          <p>Your information is private and never shared without consent.</p>
        </div>
      </div>
      <div className="ap-reassurance-item">
        <span className="ap-reassurance-icon"><PhoneIcon size={20} /></span>
        <div>
          <strong>No Obligation</strong>
          <p>A free assessment — zero commitment, zero pressure.</p>
        </div>
      </div>
      <div className="ap-reassurance-item">
        <span className="ap-reassurance-icon">⚡</span>
        <div>
          <strong>Quick Response</strong>
          <p>A care coordinator will reach out within one business day.</p>
        </div>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════
   STEP 1 — Contact Info
═══════════════════════════════════════ */
function Step1({ data, set, errors }) {
  return (
    <div className="ap-step-body">
      <p className="ap-step-intro">
        Tell us a little about yourself so we can reach you to set up the assessment.
      </p>

      <div className="ap-field-row">
        <div className="ap-field">
          <label htmlFor="firstName">First Name <span className="ap-req">*</span></label>
          <input
            id="firstName" type="text" placeholder="Jane"
            value={data.firstName}
            onChange={e => set("firstName", e.target.value)}
            className={`ap-input${errors.firstName ? " ap-input--err" : ""}`}
          />
          {errors.firstName && <span className="ap-err-msg">{errors.firstName}</span>}
        </div>
        <div className="ap-field">
          <label htmlFor="lastName">Last Name <span className="ap-req">*</span></label>
          <input
            id="lastName" type="text" placeholder="Smith"
            value={data.lastName}
            onChange={e => set("lastName", e.target.value)}
            className={`ap-input${errors.lastName ? " ap-input--err" : ""}`}
          />
          {errors.lastName && <span className="ap-err-msg">{errors.lastName}</span>}
        </div>
      </div>

      <div className="ap-field-row">
        <div className="ap-field">
          <label htmlFor="email">Email Address <span className="ap-req">*</span></label>
          <input
            id="email" type="email" placeholder="jane@email.com"
            value={data.email}
            onChange={e => set("email", e.target.value)}
            className={`ap-input${errors.email ? " ap-input--err" : ""}`}
          />
          {errors.email && <span className="ap-err-msg">{errors.email}</span>}
        </div>
        <div className="ap-field">
          <label htmlFor="phoneNumber">Phone Number <span className="ap-req">*</span></label>
          <input
            id="phoneNumber" type="tel" placeholder="(770) 000-0000"
            value={data.phoneNumber}
            onChange={e => set("phoneNumber", e.target.value)}
            className={`ap-input${errors.phoneNumber ? " ap-input--err" : ""}`}
          />
          {errors.phoneNumber && <span className="ap-err-msg">{errors.phoneNumber}</span>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   STEP 2 — Location + Type of Care
═══════════════════════════════════════ */
function Step2({ data, set, errors }) {
  return (
    <div className="ap-step-body">
      <p className="ap-step-intro">
        Let us know your location and what brings you here today.
      </p>

      <div className="ap-field-row">
        <div className="ap-field">
          <label htmlFor="county">County <span className="ap-req">*</span></label>
          <select
            id="county"
            value={data.county}
            onChange={e => set("county", e.target.value)}
            className={`ap-input ap-select${errors.county ? " ap-input--err" : ""}`}
          >
            <option value="">Select your county…</option>
            {COUNTIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.county && <span className="ap-err-msg">{errors.county}</span>}
        </div>
        <div className="ap-field">
          <label htmlFor="city">City <span className="ap-req">*</span></label>
          <input
            id="city" type="text" placeholder="e.g. Lawrenceville"
            value={data.city}
            onChange={e => set("city", e.target.value)}
            className={`ap-input${errors.city ? " ap-input--err" : ""}`}
          />
          {errors.city && <span className="ap-err-msg">{errors.city}</span>}
        </div>
      </div>

      <div className="ap-field">
        <label>What brings you here? <span className="ap-req">*</span></label>
        <div className="ap-care-options">
          {CARE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`ap-care-card${data.typeOfCare === opt.value ? " ap-care-card--active" : ""}`}
              onClick={() => set("typeOfCare", opt.value)}
              aria-pressed={data.typeOfCare === opt.value}
            >
              <span className="ap-care-icon"><opt.Icon size={28} /></span>
              <strong className="ap-care-label">{opt.label}</strong>
              <span className="ap-care-desc">{opt.desc}</span>
              {data.typeOfCare === opt.value && (
                <span className="ap-care-check"><CheckIcon size={14} /></span>
              )}
            </button>
          ))}
        </div>
        {errors.typeOfCare && <span className="ap-err-msg">{errors.typeOfCare}</span>}
      </div>

      {/* Summary */}
      <div className="ap-summary">
        <h4 className="ap-summary-title">Your Summary</h4>
        <div className="ap-summary-grid">
          <div className="ap-summary-item">
            <span className="ap-summary-label">Name</span>
            <span className="ap-summary-val">{data.firstName} {data.lastName}</span>
          </div>
          <div className="ap-summary-item">
            <span className="ap-summary-label">Phone</span>
            <span className="ap-summary-val">{data.phoneNumber || "—"}</span>
          </div>
          <div className="ap-summary-item">
            <span className="ap-summary-label">Email</span>
            <span className="ap-summary-val">{data.email || "—"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   SUCCESS STATE
═══════════════════════════════════════ */
function SuccessState({ name }) {
  return (
    <div className="ap-success">
      <div className="ap-success-icon" aria-hidden="true">
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="28" fill="#22c55e" fillOpacity="0.15"/>
          <circle cx="28" cy="28" r="20" fill="#22c55e"/>
          <path d="M18 28.5l7 7 13-13" stroke="#fff" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="ap-success-title">Thank You, {name}!</h2>
      <p className="ap-success-sub">
        Your assessment request has been received. A Helen's Home Care coordinator
        will contact you within <strong>one business day</strong>.
      </p>

      <div className="ap-success-next">
        <h3>What Happens Next</h3>
        <ol className="ap-success-steps">
          <li>
            <span className="ap-success-step-num">1</span>
            <div>
              <strong>We review your request</strong>
              <p>Our team reviews your information and assigns the right coordinator.</p>
            </div>
          </li>
          <li>
            <span className="ap-success-step-num">2</span>
            <div>
              <strong>We call you</strong>
              <p>A coordinator will reach out to you shortly to follow up.</p>
            </div>
          </li>
          <li>
            <span className="ap-success-step-num">3</span>
            <div>
              <strong>Free in-home assessment</strong>
              <p>Zero cost, zero obligation — we come to you.</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="ap-success-actions">
        <a href="tel:+17708614402" className="ap-success-call">
          <PhoneIcon size={16} style={{marginRight:6,verticalAlign:"middle"}} />Call us directly — 770-861-4402
        </a>
        <a href="/" className="ap-success-home">← Back to Home</a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   VALIDATION
═══════════════════════════════════════ */
function validate(step, data) {
  const errs = {};
  if (step === 1) {
    if (!data.firstName.trim())  errs.firstName  = "First name is required.";
    if (!data.lastName.trim())   errs.lastName   = "Last name is required.";
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
                                 errs.email      = "Enter a valid email address.";
    if (!data.phoneNumber.trim()) errs.phoneNumber = "Phone number is required.";
  }
  if (step === 2) {
    if (!data.county)     errs.county     = "Please select your county.";
    if (!data.city.trim()) errs.city      = "City is required.";
    if (!data.typeOfCare) errs.typeOfCare = "Please select what brings you here.";
  }
  return errs;
}

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function AssessmentPage() {
  const [step,      setStep]      = useState(1);
  const [data,      setData]      = useState(INITIAL);
  const [errors,    setErrors]    = useState({});
  const [done,      setDone]      = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [apiError,  setApiError]  = useState("");
  const [heroIn,    setHeroIn]    = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  const set = (key, val) => {
    setData(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const scrollToCard = () =>
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const next = async () => {
    const errs = validate(step, data);
    if (Object.keys(errs).length) { setErrors(errs); scrollToCard(); return; }
    setErrors({});

    if (step < STEPS.length) {
      setStep(s => s + 1);
      scrollToCard();
      return;
    }

    // Submit
    setLoading(true);
    setApiError("");
    try {
      const payload = {
        fullName:    `${data.firstName.trim()} ${data.lastName.trim()}`,
        phoneNumber: data.phoneNumber.trim(),
        email:       data.email.trim(),
        county:      data.county,
        city:        data.city.trim(),
        typeOfCare:  data.typeOfCare,
      };
      const res = await fetch(API.assessments, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Something went wrong. Please try again.");
      }
      setDone(true);
      scrollToCard();
    } catch (err) {
      setApiError(err.message);
      scrollToCard();
    } finally {
      setLoading(false);
    }
  };

  const back = () => { setStep(s => s - 1); setErrors({}); setApiError(""); scrollToCard(); };

  const stepTitles = [
    "Your Contact Information",
    "Your Location & Care Needs",
  ];

  return (
    <div className="ap-page">

      {/* ══════════ HERO ══════════ */}
      <section className={`ap-hero ${heroIn ? "ap-hero--in" : ""}`}>
        <div className="ap-hero-blob ap-hero-blob--1" aria-hidden="true" />
        <div className="ap-hero-blob ap-hero-blob--2" aria-hidden="true" />
        <div className="ap-hero-inner">
          <span className="ap-hero-eyebrow">It Starts Here</span>
          <h1 className="ap-hero-title">
            Request Your<br /><em>Free Assessment</em>
          </h1>
          <p className="ap-hero-sub">
            Complete this short form and a Helen's Home Care coordinator will
            reach out within one business day.
          </p>
          <div className="ap-hero-trust">
            <span><CheckIcon size={14} /> 100% Free</span>
            <span><CheckIcon size={14} /> No Obligation</span>
            <span><CheckIcon size={14} /> Confidential</span>
          </div>
        </div>
      </section>

      {/* ══════════ BODY ══════════ */}
      <div className="ap-body">
        {done ? (
          <SuccessState name={data.firstName} />
        ) : (
          <div className="ap-layout">

            {/* ── Form column ── */}
            <div className="ap-form-col" ref={cardRef}>
              <div className="ap-card">
                <ProgressBar current={step} />

                <div className="ap-card-header">
                  <span className="ap-card-step-label">Step {step} of {STEPS.length}</span>
                  <h2 className="ap-card-title">{stepTitles[step - 1]}</h2>
                </div>

                {step === 1 && <Step1 data={data} set={set} errors={errors} />}
                {step === 2 && <Step2 data={data} set={set} errors={errors} />}

                {apiError && (
                  <div className="ap-api-error" role="alert">
                    <WarningIcon size={16} style={{marginRight:6,verticalAlign:"middle"}} />{apiError}
                  </div>
                )}

                <div className="ap-card-footer">
                  {step > 1 && (
                    <button type="button" className="ap-btn-back" onClick={back}>
                      ← Back
                    </button>
                  )}
                  <button
                    type="button"
                    className={`ap-btn-next${step === STEPS.length ? " ap-btn-submit" : ""}`}
                    onClick={next}
                    disabled={loading}
                  >
                    {loading ? "Submitting…" : step < STEPS.length
                      ? <>Continue <span aria-hidden="true">→</span></>
                      : <>Submit My Request ✓</>
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="ap-sidebar">
              <ReassuranceBox />
              <a href="tel:+17708614402" className="ap-contact-card-link">
              <div className="ap-contact-card">
                <p className="ap-contact-card-label">Prefer to call?</p>
                
                  <PhoneIcon size={14} style={{marginRight:4,verticalAlign:"middle"}} />770-861-4402
                
                <p className="ap-contact-card-hours">Mon – Fri · 9 AM – 5 PM</p>
              </div>
              </a>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
