import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import '../componentscss/ReviewsPage.css'
import SEO from './SEO.jsx';

/* ─── Placeholder data (replace with live API data once keys are ready) ─── */
const MOCK_REVIEWS = [
  {
    author_name: 'Margaret T.',
    rating: 5,
    text: "Helen's Home Care has been an absolute blessing for our family. The caregiver assigned to my mother is compassionate, professional, and truly dedicated. We couldn't have asked for better care.",
    relative_time_description: '2 weeks ago',
    profile_photo_url: null,
  },
  {
    author_name: 'James R.',
    rating: 5,
    text: 'From the very first call, the team was warm and responsive. They matched us with a caregiver who felt like family within days. Highly recommend to anyone looking for in-home senior care.',
    relative_time_description: '1 month ago',
    profile_photo_url: null,
  },
  {
    author_name: 'Patricia L.',
    rating: 5,
    text: "Our family was nervous about bringing in outside help for Dad, but Helen's team made the transition seamless. The level of care and attentiveness is outstanding.",
    relative_time_description: '1 month ago',
    profile_photo_url: null,
  },
  {
    author_name: 'David K.',
    rating: 4,
    text: 'Professional, caring, and reliable. The caregiver is always on time and my mother genuinely looks forward to the visits. Wonderful service overall.',
    relative_time_description: '2 months ago',
    profile_photo_url: null,
  },
  {
    author_name: 'Susan M.',
    rating: 5,
    text: "We've worked with several home care agencies over the years, but Helen's stands out for their personal touch and genuine commitment to each client's wellbeing.",
    relative_time_description: '3 months ago',
    profile_photo_url: null,
  },
]

/* ─── Config placeholders ─── */
const GOOGLE_API_KEY   = 'YOUR_API_KEY_HERE'
const GOOGLE_PLACE_ID  = 'YOUR_PLACE_ID_HERE'
const USE_LIVE_API     = false   // flip to true once keys are set

/* ─── Star renderer ─── */
function Stars({ rating }) {
  return (
    <span className="rv-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(n => (
        <svg
          key={n}
          className={`rv-star ${n <= rating ? 'rv-star--filled' : 'rv-star--empty'}`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" />
        </svg>
      ))}
    </span>
  )
}

/* ─── Single review card ─── */
function ReviewCard({ review, delay = 0 }) {
  const [ref, visible] = useReveal(0.1)
  const initials = review.author_name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article
      ref={ref}
      className={`rv-card ${visible ? 'rv-revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="rv-card-top">
        <div className="rv-avatar">
          {review.profile_photo_url
            ? <img src={review.profile_photo_url} alt={review.author_name} className="rv-avatar-img" />
            : <span className="rv-avatar-initials">{initials}</span>
          }
        </div>
        <div className="rv-card-meta">
          <p className="rv-author">{review.author_name}</p>
          <p className="rv-time">{review.relative_time_description}</p>
        </div>
        {/* Google G logo */}
        <svg className="rv-google-logo" viewBox="0 0 24 24" aria-label="Google review">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>

      <Stars rating={review.rating} />

      <blockquote className="rv-text">
        "{review.text}"
      </blockquote>
    </article>
  )
}

/* ─── Main page ─── */
export default function ReviewsPage() {
  const [reviews, setReviews]   = useState([])
  const [avgRating, setAvg]     = useState(0)
  const [totalCount, setTotal]  = useState(0)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const [heroRef, heroVisible]   = useReveal(0.05)
  const [statsRef, statsVisible] = useReveal(0.1)
  const [ctaRef, ctaVisible]     = useReveal(0.1)

  useEffect(() => {
    if (!USE_LIVE_API) {
      /* Use mock data until API keys are added */
      const avg = (MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / MOCK_REVIEWS.length).toFixed(1)
      setReviews(MOCK_REVIEWS)
      setAvg(avg)
      setTotal(MOCK_REVIEWS.length)
      setLoading(false)
      return
    }

    /* ── Live Google Places API call ── */
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${GOOGLE_PLACE_ID}` +
      `&fields=reviews,rating,user_ratings_total` +
      `&key=${GOOGLE_API_KEY}`

    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.status !== 'OK') throw new Error(data.status)
        const result = data.result
        setReviews(result.reviews || [])
        setAvg(result.rating?.toFixed(1) || 0)
        setTotal(result.user_ratings_total || 0)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  /* ── Derived stats ── */
  const fiveStars = reviews.filter(r => r.rating === 5).length
  const pctFive   = reviews.length ? Math.round((fiveStars / reviews.length) * 100) : 0

  return (
    <>
      <SEO
        title="Client Reviews | Helen's Home Care – Gwinnett County Senior Care"
        description="Read what families say about Helen's Home Care. Compassionate caregivers serving seniors across Gwinnett County and Atlanta with 5-star reviews."
        canonical="/reviews"
      />
    <main className="rv-page">

      {/* ═══ HERO ═══ */}
      <section className="rv-hero">
        <div className="rv-hero-blob rv-hero-blob--1" />
        <div className="rv-hero-blob rv-hero-blob--2" />

        <div
          ref={heroRef}
          className={`rv-hero-inner ${heroVisible ? 'rv-hero--loaded' : ''}`}
        >
          <span className="rv-eyebrow rv-eyebrow--light">Trusted by Families</span>
          <h1 className="rv-hero-headline">
            What Our <em>Families</em> Are Saying
          </h1>
          <p className="rv-hero-sub">
            Real stories from real families who trusted Helen's Home Care with their
            most precious loved ones. See why we're the top-rated home care provider in our community.
          </p>

          <div className="rv-hero-badge-row">
            <div className="rv-hero-badge">
              <svg viewBox="0 0 20 20" className="rv-badge-star"><path d="M10 1l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.27l-4.78 2.51.91-5.32L2.27 6.62l5.34-.78z" /></svg>
              <strong>{avgRating}</strong> Average Rating
            </div>
            <div className="rv-hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rv-badge-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <strong>{totalCount}+</strong> Happy Families
            </div>
            <div className="rv-hero-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rv-badge-icon"><polyline points="20 6 9 17 4 12"/></svg>
              <strong>{pctFive}%</strong> 5-Star Reviews
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="rv-stats-bar">
        <div
          ref={statsRef}
          className={`rv-stats-inner ${statsVisible ? 'rv-revealed' : ''}`}
        >
          {[
            { value: avgRating, label: 'Average Google Rating', suffix: '/ 5' },
            { value: `${totalCount}+`, label: 'Families Served', suffix: '' },
            { value: `${pctFive}%`, label: '5-Star Reviews', suffix: '' },
            { value: '10+', label: 'Years of Care', suffix: '' },
          ].map((stat, i) => (
            <div key={i} className="rv-stat">
              <span className="rv-stat-value">{stat.value}<span className="rv-stat-suffix">{stat.suffix}</span></span>
              <span className="rv-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ REVIEWS GRID ═══ */}
      <section className="rv-grid-section">
        <div className="rv-grid-header">
          <span className="rv-eyebrow">Google Reviews</span>
          <h2 className="rv-section-title">Stories From Our <em>Community</em></h2>
          <p className="rv-section-sub">
            Every review represents a family who trusted us during a vulnerable time.
            We're honoured by their words.
          </p>
        </div>

        {loading && (
          <div className="rv-loader">
            <div className="rv-spinner" />
            <p>Loading reviews…</p>
          </div>
        )}

        {error && (
          <div className="rv-error">
            <p>Could not load reviews at this time. Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <div className="rv-grid">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} delay={i * 80} />
            ))}
          </div>
        )}

        {/* Leave a review CTA */}
        <div className="rv-leave-review">
          <p className="rv-leave-text">Had a great experience with us?</p>
          <a
            href={`https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rv-btn-primary"
          >
            <svg viewBox="0 0 24 24" className="rv-btn-icon"><path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Leave a Google Review
          </a>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="rv-cta">
        <div
          ref={ctaRef}
          className={`rv-cta-inner ${ctaVisible ? 'rv-revealed' : ''}`}
        >
          <div className="rv-cta-copy">
            <h2 className="rv-cta-title">Ready to Experience the <em>Helen's Difference?</em></h2>
            <p className="rv-cta-sub">
              Join hundreds of families who trust us with the care of their loved ones.
              Let's start the conversation today.
            </p>
          </div>
          <div className="rv-cta-actions">
            <a href="/assessment" className="rv-btn-primary">Request Care Now</a>
            <a href="tel:+17708614402" className="rv-btn-secondary rv-btn-secondary--dark">
              Call 770-861-4402
            </a>
          </div>
        </div>
      </section>

    </main>
    </>
  )
}