import { useState, useEffect, useRef } from "react";
import "../componentscss/CaregiverInterviewPage.css";
import { CheckIcon, BriefcaseIcon, LockIcon, PhoneIcon, WarningIcon, StarIcon } from "./icons";
import { API } from "../api/config";
import SEO from "./SEO.jsx";

/* ═══════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════ */

const STEPS = [
  { id: 1, label: "Your Info",       short: "Info" },
  { id: 2, label: "Your Experience", short: "Exp"  },
];

const COUNTIES = [
  { value: "GWINNETT",  label: "Gwinnett"  },
  { value: "DEKALB",    label: "DeKalb"    },
  { value: "COBB",      label: "Cobb"      },
  { value: "FULTON",    label: "Fulton"    },
  { value: "CLAYTON",   label: "Clayton"   },
  { value: "HENRY",     label: "Henry"     },
  { value: "MORROW",    label: "Morrow"    },
  { value: "WALTON",    label: "Walton"    },
  { value: "ROCKDALE",  label: "Rockdale"  },
  { value: "FORSYTH",   label: "Forsyth"   },
];

const EXPERIENCE_OPTIONS = [
  { value: "LESS_THAN_1", label: "Less than 1 year" },
  { value: "ONE_TO_THREE", label: "1 – 3 years"     },
  { value: "THREE_TO_FIVE", label: "3 – 5 years"    },
  { value: "FIVE_PLUS", label: "5+ years"            },
];

const SCHEDULE_OPTIONS = [
  { value: "FULL_TIME",  label: "Full-Time"    },
  { value: "PART_TIME",  label: "Part-Time"    },
  { value: "BOTH",       label: "Either / Both" },
  { value: "LIVE_IN",    label: "Live-In"       },
];

const INITIAL = {
  firstName:    "",
  lastName:     "",
  email:        "",
  phoneNumber:  "",
  county:       "",
  city:         "",
  experience:   "",
  schedule:     "",
  message:      "",
};

/* ═══════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════ */
function ProgressBar({ current }) {
  return (
    <div className="ci-progress" aria-label="Form progress">
      {STEPS.map((step, i) => {
        const done   = step.id < current;
        const active = step.id === current;
        return (
          <div key={step.id} className="ci-progress-step">
            <div className={`ci-step-bubble ${done ? "done" : ""} ${active ? "active" : ""}`}>
              {done ? <CheckIcon size={14} /> : step.id}
            </div>
            <span className={`ci-step-label ${active ? "active" : ""} ${done ? "done" : ""}`}>
              {step.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`ci-step-line ${done ? "done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════ */
function SidebarInfo() {
  return (
    <aside className="ci-sidebar-box">
      <div className="ci-sidebar-item">
        <span className="ci-sidebar-icon"><LockIcon size={20} /></span>
        <div>
          <strong>100% Confidential</strong>
          <p>Your information is never shared without your consent.</p>
        </div>
      </div>
      <div className="ci-sidebar-item">
        <span className="ci-sidebar-icon"><PhoneIcon size={20} /></span>
        <div>
          <strong>We'll Call You</strong>
          <p>Our team will reach out within one business day to schedule your interview.</p>
        </div>
      </div>
      <div className="ci-sidebar-item">
        <span className="ci-sidebar-icon"><StarIcon size={20} /></span>
        <div>
          <strong>Great Benefits</strong>
          <p>Competitive pay, flexible schedules, and a team that truly supports you.</p>
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
    <div className="ci-step-body">
      <p className="ci-step-intro">
        Tell us how to reach you. We'll use this to schedule your interview.
      </p>

      <div className="ci-field-row">
        <div className="ci-field">
          <label htmlFor="firstName">First Name <span className="ci-req">*</span></label>
          <input
            id="firstName" type="text" placeholder="Jane"
            value={data.firstName}
            onChange={e => set("firstName", e.target.value)}
            className={`ci-input${errors.firstName ? " ci-input--err" : ""}`}
          />
          {errors.firstName && <span className="ci-err-msg">{errors.firstName}</span>}
        </div>
        <div className="ci-field">
          <label htmlFor="lastName">Last Name <span className="ci-req">*</span></label>
          <input
            id="lastName" type="text" placeholder="Smith"
            value={data.lastName}
            onChange={e => set("lastName", e.target.value)}
            className={`ci-input${errors.lastName ? " ci-input--err" : ""}`}
          />
          {errors.lastName && <span className="ci-err-msg">{errors.lastName}</span>}
        </div>
      </div>

      <div className="ci-field-row">
        <div className="ci-field">
          <label htmlFor="email">Email Address <span className="ci-req">*</span></label>
          <input
            id="email" type="email" placeholder="jane@email.com"
            value={data.email}
            onChange={e => set("email", e.target.value)}
            className={`ci-input${errors.email ? " ci-input--err" : ""}`}
          />
          {errors.email && <span className="ci-err-msg">{errors.email}</span>}
        </div>
        <div className="ci-field">
          <label htmlFor="phoneNumber">Phone Number <span className="ci-req">*</span></label>
          <input
            id="phoneNumber" type="tel" placeholder="(770) 000-0000"
            value={data.phoneNumber}
            onChange={e => set("phoneNumber", e.target.value)}
            className={`ci-input${errors.phoneNumber ? " ci-input--err" : ""}`}
          />
          {errors.phoneNumber && <span className="ci-err-msg">{errors.phoneNumber}</span>}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   STEP 2 — Experience & Availability
═══════════════════════════════════════ */
function Step2({ data, set, errors }) {
  return (
    <div className="ci-step-body">
      <p className="ci-step-intro">
        Help us understand your background and what you're looking for.
      </p>

      <div className="ci-field-row">
        <div className="ci-field">
          <label htmlFor="county">County <span className="ci-req">*</span></label>
          <select
            id="county"
            value={data.county}
            onChange={e => set("county", e.target.value)}
            className={`ci-input ci-select${errors.county ? " ci-input--err" : ""}`}
          >
            <option value="">Select your county…</option>
            {COUNTIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.county && <span className="ci-err-msg">{errors.county}</span>}
        </div>
        <div className="ci-field">
          <label htmlFor="city">City <span className="ci-req">*</span></label>
          <input
            id="city" type="text" placeholder="e.g. Lawrenceville"
            value={data.city}
            onChange={e => set("city", e.target.value)}
            className={`ci-input${errors.city ? " ci-input--err" : ""}`}
          />
          {errors.city && <span className="ci-err-msg">{errors.city}</span>}
        </div>
      </div>

      <div className="ci-field">
        <label htmlFor="experience">Years of Caregiving Experience <span className="ci-req">*</span></label>
        <select
          id="experience"
          value={data.experience}
          onChange={e => set("experience", e.target.value)}
          className={`ci-input ci-select${errors.experience ? " ci-input--err" : ""}`}
        >
          <option value="">Select your experience level…</option>
          {EXPERIENCE_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.experience && <span className="ci-err-msg">{errors.experience}</span>}
      </div>

      <div className="ci-field">
        <label>Preferred Schedule <span className="ci-req">*</span></label>
        <div className="ci-schedule-options">
          {SCHEDULE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              className={`ci-schedule-card${data.schedule === opt.value ? " ci-schedule-card--active" : ""}`}
              onClick={() => set("schedule", opt.value)}
              aria-pressed={data.schedule === opt.value}
            >
              {opt.label}
              {data.schedule === opt.value && (
                <span className="ci-schedule-check"><CheckIcon size={12} /></span>
              )}
            </button>
          ))}
        </div>
        {errors.schedule && <span className="ci-err-msg">{errors.schedule}</span>}
      </div>

      <div className="ci-field">
        <label htmlFor="message">Anything else you'd like us to know? <span className="ci-opt">(optional)</span></label>
        <textarea
          id="message"
          rows={4}
          placeholder="e.g. certifications you hold, languages you speak, specific care experience…"
          value={data.message}
          onChange={e => set("message", e.target.value)}
          className="ci-input ci-textarea"
        />
      </div>

      {/* Summary */}
      <div className="ci-summary">
        <h4 className="ci-summary-title">Your Summary</h4>
        <div className="ci-summary-grid">
          <div className="ci-summary-item">
            <span className="ci-summary-label">Name</span>
            <span className="ci-summary-val">{data.firstName} {data.lastName}</span>
          </div>
          <div className="ci-summary-item">
            <span className="ci-summary-label">Phone</span>
            <span className="ci-summary-val">{data.phoneNumber || "—"}</span>
          </div>
          <div className="ci-summary-item">
            <span className="ci-summary-label">Email</span>
            <span className="ci-summary-val">{data.email || "—"}</span>
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
    <div className="ci-success">
      <div className="ci-success-icon" aria-hidden="true">
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="28" fill="#D4A843" fillOpacity="0.15"/>
          <circle cx="28" cy="28" r="20" fill="#D4A843"/>
          <path d="M18 28.5l7 7 13-13" stroke="#1a3d4f" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="ci-success-title">Thank You, {name}!</h2>
      <p className="ci-success-sub">
        Your interview request has been received. A Helen's Home Care recruiter
        will be in touch within <strong>one business day</strong>.
      </p>

      <div className="ci-success-next">
        <h3>What Happens Next</h3>
        <ol className="ci-success-steps">
          <li>
            <span className="ci-success-step-num">1</span>
            <div>
              <strong>We review your application</strong>
              <p>Our recruitment team looks over your information and matches you to open positions.</p>
            </div>
          </li>
          <li>
            <span className="ci-success-step-num">2</span>
            <div>
              <strong>We call you</strong>
              <p>A recruiter will reach out to confirm your availability and schedule the interview.</p>
            </div>
          </li>
          <li>
            <span className="ci-success-step-num">3</span>
            <div>
              <strong>Your interview</strong>
              <p>A short, friendly conversation — no stress, just a chance to get to know each other.</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="ci-success-actions">
        <a href="tel:+17708614402" className="ci-success-call">
          <PhoneIcon size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
          Call us directly — 770-861-4402
        </a>
        <a href="/job-info" className="ci-success-home">← View open positions</a>
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
    if (!data.firstName.trim())   errs.firstName   = "First name is required.";
    if (!data.lastName.trim())    errs.lastName    = "Last name is required.";
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
                                  errs.email       = "Enter a valid email address.";
    if (!data.phoneNumber.trim()) errs.phoneNumber = "Phone number is required.";
  }
  if (step === 2) {
    if (!data.county)     errs.county     = "Please select your county.";
    if (!data.city.trim()) errs.city      = "City is required.";
    if (!data.experience) errs.experience = "Please select your experience level.";
    if (!data.schedule)   errs.schedule   = "Please select a preferred schedule.";
  }
  return errs;
}

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function CaregiverInterviewPage() {
  const [step,     setStep]     = useState(1);
  const [data,     setData]     = useState(INITIAL);
  const [errors,   setErrors]   = useState({});
  const [done,     setDone]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");
  const [heroIn,   setHeroIn]   = useState(false);
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
        experience:  data.experience,
        schedule:    data.schedule,
        message:     data.message.trim(),
      };
      const res = await fetch(API.caregiverApplications, {
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
    "Your Experience & Availability",
  ];

  return (
    <>
      <SEO
        title="Apply to Join Our Team | Helen's Home Care – Caregiver Interview"
        description="Are you a passionate caregiver looking for work? Apply to join Helen's Home Care team in Gwinnett County and surrounding Atlanta-area communities. Submit your interview request today."
        canonical="/caregiver-interview"
      />
      <div className="ci-page">

        {/* ══════════ HERO ══════════ */}
        <section className={`ci-hero ${heroIn ? "ci-hero--in" : ""}`}>
          <div className="ci-hero-blob ci-hero-blob--1" aria-hidden="true" />
          <div className="ci-hero-blob ci-hero-blob--2" aria-hidden="true" />
          <div className="ci-hero-inner">
            <span className="ci-hero-eyebrow">Join Our Team</span>
            <h1 className="ci-hero-title">
              Complete Your<br /><em>Your Application</em>
            </h1>
            <p className="ci-hero-sub">
              We're always looking for compassionate caregivers to join the Helen's Home Care family.
              Fill out this short form and we'll be in touch within one business day.
            </p>
            <div className="ci-hero-trust">
              <span><CheckIcon size={14} /> Flexible Schedules</span>
              <span><CheckIcon size={14} /> Competitive Pay</span>
              <span><CheckIcon size={14} /> Supportive Team</span>
            </div>
          </div>
        </section>

        {/* ══════════ BODY ══════════ */}
        <div className="ci-body">
          {done ? (
            <SuccessState name={data.firstName} />
          ) : (
            <div className="ci-layout">

              {/* ── Form column ── */}
              <div className="ci-form-col" ref={cardRef}>
                <div className="ci-card">
                  <ProgressBar current={step} />

                  <div className="ci-card-header">
                    <span className="ci-card-step-label">Step {step} of {STEPS.length}</span>
                    <h2 className="ci-card-title">{stepTitles[step - 1]}</h2>
                  </div>

                  {step === 1 && <Step1 data={data} set={set} errors={errors} />}
                  {step === 2 && <Step2 data={data} set={set} errors={errors} />}

                  {apiError && (
                    <div className="ci-api-error" role="alert">
                      <WarningIcon size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />{apiError}
                    </div>
                  )}

                  <div className="ci-card-footer">
                    {step > 1 && (
                      <button type="button" className="ci-btn-back" onClick={back}>
                        ← Back
                      </button>
                    )}
                    <button
                      type="button"
                      className={`ci-btn-next${step === STEPS.length ? " ci-btn-submit" : ""}`}
                      onClick={next}
                      disabled={loading}
                    >
                      {loading ? "Submitting…" : step < STEPS.length
                        ? <>Continue <span aria-hidden="true">→</span></>
                        : <>Submit My Application ✓</>
                      }
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Sidebar ── */}
              <aside className="ci-sidebar">
                <SidebarInfo />
                <a href="tel:+17708614402" className="ci-contact-card-link">
                  <div className="ci-contact-card">
                    <p className="ci-contact-card-label">Prefer to call?</p>
                    <PhoneIcon size={14} style={{ marginRight: 4, verticalAlign: "middle" }} />770-861-4402
                    <p className="ci-contact-card-hours">Mon – Fri · 9 AM – 5 PM</p>
                  </div>
                </a>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
