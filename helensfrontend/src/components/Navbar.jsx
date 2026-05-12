import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import "../componentscss/Navbar.css"
import { PhoneIcon, CareIcon, ChevronIcon } from "./icons"

/* ── Dropdown data ── */
const NAV_ITEMS = [
  {
    label: 'Care Services',
    links: [
      { label: 'Senior Home Care Services',         href: '/services/senior-home-care' },
      { label: 'Personal Care Services',            href: '/services/personal-care' },
      { label: '24/7 In-Home Care',                 href: '/services/24-7-in-home-care' },
      { label: 'Companion Care Services',           href: '/services/companion-care' },
      { label: 'Hospital to Home Transition Care',  href: '/services/hospital-to-home' },
      { label: 'Assistance Before & After Surgery', href: '/services/surgery-assistance' },
      { label: 'Dementia Care Services',            href: '/services/dementia-care' },
      { label: "Alzheimer's Care Services",         href: '/services/alzheimers-care' },
    ],
  },
  {
    label: 'About Us',
    links: [
      { label: 'About Us',                 href: '/about'   },
      { label: 'Our Reviews',              href: '/reviews' },
    ],
  },
  {
    label: 'Job Seeker',
    links: [
      { label: 'Job Info',       href: '/job-info'       },
      { label: 'Hiring Process', href: '/hiring-process' },
    ],
  },
]

/* ── Single dropdown item ── */
function NavItem({ item, onClose }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <li className={`nav-item ${open ? 'open' : ''}`} ref={ref}>
      <button className="nav-link" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-haspopup="true">
        {item.label}
        <ChevronIcon className="nav-chevron" />
      </button>
      <div className="nav-dropdown" role="menu">
        {item.links.map(link => (
          <Link key={link.label} to={link.href} role="menuitem"
            onClick={() => { setOpen(false); onClose?.() }}>
            {link.label}
          </Link>
        ))}
      </div>
    </li>
  )
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ════════════ NAVBAR ════════════ */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">

        {/* Brand */}
        <Link to="/" className="nav-brand" aria-label="Helen's Home Care – Home">
          <img src="/logo.png" alt="Helen's Home Care logo" className="nav-logo" />
          <div className="nav-brand-text">
            <span className="nav-brand-name">Helen's Home Care</span>
            <span className="nav-brand-sub">Quality care in the comfort of your home</span>
          </div>
        </Link>

        {/* Center links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} role="menubar">
          {NAV_ITEMS.map(item => (
            <NavItem key={item.label} item={item} onClose={closeMenu} />
          ))}
          {/* Mobile drawer CTA */}
          <li className="nav-cta-mobile-wrap">
            <Link to="/assessment" className="nav-cta" onClick={closeMenu}><span className="floating-label">Request Care Now</span></Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <Link to="/assessment" className="nav-cta nav-cta-desktop" aria-label="Request care now">
          Request Care Now
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ════════════ FLOATING CTA ════════════ */}
      <div className="floating-cta" aria-label="Quick contact actions">

        {/* Call Us — always visible */}
        <a href="tel:+17708614402" className="floating-btn floating-btn-call"
          aria-label="Call Helen's Home Care at 770-861-4402">
          <PhoneIcon className="floating-icon" />
          <span className="floating-label">Call Us — 770-861-4402</span>
        </a>

        {/* Request Care — mobile only */}
        <Link to="/assessment" className="floating-btn floating-btn-care"
          aria-label="Request care now">
          <CareIcon className="floating-icon" />
          Request Care Now
        </Link>

      </div>
    </>
  )
}