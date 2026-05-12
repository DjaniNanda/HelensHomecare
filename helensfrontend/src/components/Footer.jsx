import { Link } from "react-router-dom";
import "../componentscss/Footer.css";

const careServices = [
  { label: "Senior Home Care Services",         href: "/services/senior-home-care" },
  { label: "Personal Care Services",            href: "/services/personal-care" },
  { label: "24/7 In-Home Care",                 href: "/services/24-7-in-home-care" },
  { label: "Companion Care Service",            href: "/services/companion-care" },
  { label: "Hospital to Home Transition Care",  href: "/services/hospital-to-home" },
  { label: "Assistance Before & After Surgery", href: "/services/surgery-assistance" },
  { label: "Dementia Care Services",            href: "/services/dementia-care" },
  { label: "Alzheimer's Care Services",         href: "/services/alzheimers-care" },
];

const locations = [
  "Gwinnett", "DeKalb", "Cobb", "Fulton",
  "Clayton", "Henry", "Walton", "Rockdale", "Forsyth",
];

const payments = [
  { label: "VISA",               cls: "visa" },
  { label: "Master\nCard",       cls: "mastercard" },
  { label: "Maestro",            cls: "maestro" },
  { label: "AMERICAN\nEXPRESS", cls: "amex" },
  { label: "DISCOVER",           cls: "discover" },
  { label: "$ CASH",             cls: "cash" },
  { label: "CHECK",              cls: "check" },
];

/* ── SVG Icons ── */
const IconPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 1 1 16 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12
      19.79 19.79 0 0 1 1.08 3.38 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72
      c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91
      a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45
      c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default function HelensFooter() {
  return (
    <footer className="footer-wrapper">

      {/* ── Brand ── */}
      <div className="footer-brand">
        <h1>Helen's Home Care</h1>
        <p>Quality care in the comfort of your home</p>
      </div>

      {/* ── Columns ── */}
      <div className="footer-columns">

        {/* Care Services */}
        <div className="footer-col">
          <h3>Care Services</h3>
          <ul className="footer-list">
            {careServices.map((s) => (
              <li key={s.label}>
                <Link to={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Services */}
        <div className="footer-col">
          <h3>Location Services</h3>
          <ul className="footer-list">
            {locations.map((loc) => (
              <li key={loc}>{loc}</li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-col">
          <h3>Contact Information</h3>
          <ul className="contact-list">

            <li className="contact-item">
              <span className="contact-icon"><IconPin /></span>
              <span>Lawrenceville, Georgia, USA</span>
            </li>

            <li className="contact-item">
              <span className="contact-icon"><IconPhone /></span>
              <a href="tel:+17708614402" className="contact-link">770-861-4402</a>
            </li>

            <li className="contact-item">
              <span className="contact-icon"><IconMail /></span>
              <a href="mailto:helenshomecare14@gmail.com" className="contact-link">helenshomecare14@gmail.com</a>
            </li>

            <li className="contact-item">
              <span className="contact-icon"><IconClock /></span>
              <span>Monday – Friday 9AM – 5PM</span>
            </li>

          </ul>
        </div>

        {/* Payment Accepted */}
        <div className="footer-col">
          <h3>Payment Accepted</h3>
          <div className="payment-grid">
            {payments.map(({ label, cls }) => (
              <div key={label} className={`payment-card ${cls}`}>
                {label.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} <span>Helen's Home Care</span>. All rights reserved. · Lawrenceville, Georgia
      </div>

    </footer>
  );
}