import { useEffect, useRef, useState } from "react";
import "../componentscss/Assessmentsection.css";
import {
  PhoneIcon, MailIcon, CheckIcon, CheckCircleIcon,
  HomeIcon, MessageIcon, WarningIcon,
} from "./icons";
import { API } from "../api/config";

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const STEPS = [
  { id: 1, label: "Your Info" },
  { id: 2, label: "Care Needs" },
];

const COUNTIES = [
  { value: "GWINNETT", label: "Gwinnett County" },
  { value: "DEKALB",   label: "DeKalb County"   },
  { value: "COBB",     label: "Cobb County"      },
  { value: "FULTON",   label: "Fulton County"    },
  { value: "CLAYTON",  label: "Clayton County"   },
  { value: "HENRY",    label: "Henry County"     },
  { value: "WALTON",   label: "Walton County"    },
  { value: "ROCKDALE", label: "Rockdale County"  },
  { value: "MORROW",   label: "Morrow County"    },
  { value: "FORSYTH",  label: "Forsyth County"   },
];

const CARE_OPTIONS = [
  { value: "HOME_CARE", label: "Home Care",    desc: "Professional care services at home.", Icon: HomeIcon    },
  { value: "UNSURE",    label: "Not Sure Yet", desc: "Speak with someone to explore options.", Icon: MessageIcon },
];

const SERVICE_OPTIONS = [
  { value: "SENIOR_PERSONAL_CARE", label: "Senior / Personal / In-Home Care"    },
  { value: "CARE_247",             label: "24/7 In-Home Care"                   },
  { value: "COMPANION_CARE",       label: "Companion Care Service"              },
  { value: "HOSPITAL_TO_HOME",     label: "Hospital to Home Transition Care"    },
  { value: "PRE_POST_SURGERY",     label: "Assistance Before & After Surgery"   },
  { value: "DEMENTIA_CARE",        label: "Dementia Care Services"              },
  { value: "ALZHEIMERS_CARE",      label: "Alzheimer's Care Services"           },
];

const INITIAL = {
  firstName: "", lastName: "", email: "", phoneNumber: "",
  county: "", city: "", typeOfCare: "", serviceType: "",
};

/* ── Validation ── */
function validate(step, data) {
  const errs = {};
  if (step === 1) {
    if (!data.firstName.trim())   errs.firstName   = "First name is required.";
    if (!data.lastName.trim())    errs.lastName    = "Last name is required.";
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
                                  errs.email       = "Enter a valid email.";
    if (!data.phoneNumber.trim()) errs.phoneNumber = "Phone number is required.";
  }
  if (step === 2) {
    if (!data.county)      errs.county      = "Please select your county.";
    if (!data.city.trim()) errs.city        = "City is required.";
    if (!data.typeOfCare)  errs.typeOfCare  = "Please select a type of care.";
    if (data.typeOfCare === "HOME_CARE" && !data.serviceType)
                           errs.serviceType = "Please select a specific service.";
  }
  return errs;
}

/* ── Progress Bar ── */
function ProgressBar({ current }) {
  return (
    <div className="as-progress">
      {STEPS.map((step, i) => {
        const done = step.id < current, active = step.id === current;
        return (
          <div key={step.id} className="as-progress-step">
            <div className={`as-step-bubble${done ? " done" : ""}${active ? " active" : ""}`}>
              {done ? <CheckIcon size={13} /> : step.id}
            </div>
            <span className={`as-step-label${active ? " active" : ""}${done ? " done" : ""}`}>
              {step.label}
            </span>
            {i < STEPS.length - 1 && <div className={`as-step-line${done ? " done" : ""}`} />}
          </div>
        );
      })}
    </div>
  );
}

/* ── Step 1 ── */
function Step1({ data, set, errors }) {
  return (
    <div className="as-step-body">
      <div className="as-field-row">
        <div className="as-field">
          <label htmlFor="as-firstName">First Name <span className="as-req">*</span></label>
          <input id="as-firstName" type="text" placeholder="Jane" value={data.firstName}
            onChange={e => set("firstName", e.target.value)}
            className={`as-input${errors.firstName ? " as-input--err" : ""}`} />
          {errors.firstName && <span className="as-err-msg">{errors.firstName}</span>}
        </div>
        <div className="as-field">
          <label htmlFor="as-lastName">Last Name <span className="as-req">*</span></label>
          <input id="as-lastName" type="text" placeholder="Smith" value={data.lastName}
            onChange={e => set("lastName", e.target.value)}
            className={`as-input${errors.lastName ? " as-input--err" : ""}`} />
          {errors.lastName && <span className="as-err-msg">{errors.lastName}</span>}
        </div>
      </div>
      <div className="as-field-row">
        <div className="as-field">
          <label htmlFor="as-email">Email Address <span className="as-req">*</span></label>
          <input id="as-email" type="email" placeholder="jane@email.com" value={data.email}
            onChange={e => set("email", e.target.value)}
            className={`as-input${errors.email ? " as-input--err" : ""}`} />
          {errors.email && <span className="as-err-msg">{errors.email}</span>}
        </div>
        <div className="as-field">
          <label htmlFor="as-phone">Phone Number <span className="as-req">*</span></label>
          <input id="as-phone" type="tel" placeholder="(770) 000-0000" value={data.phoneNumber}
            onChange={e => set("phoneNumber", e.target.value)}
            className={`as-input${errors.phoneNumber ? " as-input--err" : ""}`} />
          {errors.phoneNumber && <span className="as-err-msg">{errors.phoneNumber}</span>}
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 ── */
function Step2({ data, set, errors }) {
  return (
    <div className="as-step-body">
      <div className="as-field-row">
        <div className="as-field">
          <label htmlFor="as-county">County <span className="as-req">*</span></label>
          <div className="as-select-wrap">
            <select id="as-county" value={data.county}
              onChange={e => set("county", e.target.value)}
              className={`as-input as-select${errors.county ? " as-input--err" : ""}`}>
              <option value="">Select county…</option>
              {COUNTIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          {errors.county && <span className="as-err-msg">{errors.county}</span>}
        </div>
        <div className="as-field">
          <label htmlFor="as-city">City <span className="as-req">*</span></label>
          <input id="as-city" type="text" placeholder="e.g. Lawrenceville" value={data.city}
            onChange={e => set("city", e.target.value)}
            className={`as-input${errors.city ? " as-input--err" : ""}`} />
          {errors.city && <span className="as-err-msg">{errors.city}</span>}
        </div>
      </div>

      <div className="as-field">
        <label>Type of Care <span className="as-req">*</span></label>
        <div className="as-care-options">
          {CARE_OPTIONS.map(opt => (
            <button key={opt.value} type="button"
              className={`as-care-card${data.typeOfCare === opt.value ? " as-care-card--active" : ""}`}
              onClick={() => { set("typeOfCare", opt.value); if (opt.value !== "HOME_CARE") set("serviceType", ""); }}
              aria-pressed={data.typeOfCare === opt.value}
            >
              <span className="as-care-icon"><opt.Icon size={22} /></span>
              <strong className="as-care-label">{opt.label}</strong>
              <span className="as-care-desc">{opt.desc}</span>
              {data.typeOfCare === opt.value && (
                <span className="as-care-check"><CheckIcon size={12} /></span>
              )}
            </button>
          ))}
        </div>
        {errors.typeOfCare && <span className="as-err-msg">{errors.typeOfCare}</span>}
      </div>

      {data.typeOfCare === "HOME_CARE" && (
        <div className="as-field">
          <label>Which service? <span className="as-req">*</span></label>
          <div className="as-service-options">
            {SERVICE_OPTIONS.map(opt => (
              <button key={opt.value} type="button"
                className={`as-service-card${data.serviceType === opt.value ? " as-service-card--active" : ""}`}
                onClick={() => set("serviceType", opt.value)}
                aria-pressed={data.serviceType === opt.value}
              >
                {opt.label}
                {data.serviceType === opt.value && (
                  <span className="as-service-check"><CheckIcon size={11} /></span>
                )}
              </button>
            ))}
          </div>
          {errors.serviceType && <span className="as-err-msg">{errors.serviceType}</span>}
        </div>
      )}
    </div>
  );
}

/* ── Success ── */
function SuccessState({ name }) {
  return (
    <div className="as-form-success">
      <div className="as-form-success-icon">
        <CheckCircleIcon className="as-success-svg" />
      </div>
      <h3>Thank You, {name}!</h3>
      <p>We'll reach out within 1 business day to schedule your free in-home assessment.</p>
      <div className="as-form-success-contacts">
        <a href="tel:+17708614402" className="as-form-success-link">
          <PhoneIcon className="as-contact-svg" /> 770-861-4402
        </a>
        <a href="mailto:helenshomecare14@gmail.com" className="as-form-success-link">
          <MailIcon className="as-contact-svg" /> helenshomecare14@gmail.com
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   ASSESSMENT SECTION (exported)
═══════════════════════════════════════ */
export default function AssessmentSection({ id = "assessment" }) {
  const sectionRef = useRef(null);
  const cardRef    = useRef(null);
  const [visible,  setVisible]  = useState(false);
  const [step,     setStep]     = useState(1);
  const [data,     setData]     = useState(INITIAL);
  const [errors,   setErrors]   = useState({});
  const [done,     setDone]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const set = (key, val) => {
    setData(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const scrollToCard = () =>
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });

  const next = async () => {
    const errs = validate(step, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    if (step < STEPS.length) { setStep(s => s + 1); return; }

    setLoading(true); setApiError("");
    try {
      const payload = {
        fullName:    `${data.firstName.trim()} ${data.lastName.trim()}`,
        phoneNumber: data.phoneNumber.trim(),
        email:       data.email.trim(),
        county:      data.county,
        city:        data.city.trim(),
        typeOfCare:  data.typeOfCare,
        serviceType: data.serviceType || null,
      };
      const res = await fetch(API.assessments, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const back = () => { setStep(s => s - 1); setErrors({}); setApiError(""); };

  return (
    <section className="as-section" id={id} ref={sectionRef}>
      <div className={`as-inner${visible ? " as-visible" : ""}`}>

        {/* ── Left: copy ── */}
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
            <a href="mailto:helenshomecare14@gmail.com" className="as-contact-item">
              <span className="as-contact-icon-wrap"><MailIcon className="as-contact-svg" /></span>
              <span>helenshomecare14@gmail.com</span>
            </a>
          </div>
        </div>

        {/* ── Right: form card ── */}
        <div className="as-form-card" id="contact" ref={cardRef}>
          {done ? (
            <SuccessState name={data.firstName} />
          ) : (
            <>
              <div className="as-form-card-header">
                <h3>Book Your Free Assessment</h3>
                <p>Takes less than 2 minutes</p>
              </div>

              <div className="as-form-body">
                <ProgressBar current={step} />

                <p className="as-step-title">
                  {step === 1 ? "Your Contact Information" : "Your Location & Care Needs"}
                </p>

                {step === 1 && <Step1 data={data} set={set} errors={errors} />}
                {step === 2 && <Step2 data={data} set={set} errors={errors} />}

                {apiError && (
                  <div className="as-api-error" role="alert">
                    <WarningIcon size={15} style={{ marginRight: 6, verticalAlign: "middle" }} />
                    {apiError}
                  </div>
                )}

                <div className="as-card-footer">
                  {step > 1 && (
                    <button type="button" className="as-btn-back" onClick={back}>← Back</button>
                  )}
                  <button
                    type="button"
                    className="as-form-submit"
                    onClick={next}
                    disabled={loading}
                  >
                    {loading
                      ? "Submitting…"
                      : step < STEPS.length
                      ? "Continue →"
                      : "Submit My Request ✓"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}