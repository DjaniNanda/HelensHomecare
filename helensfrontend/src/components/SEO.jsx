import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.helenshomecarellc.com';
const DEFAULT_IMAGE = `${BASE_URL}/logo512.png`;
const SITE_NAME = "Helen's Home Care";

/**
 * SEO component — drop into any page to set unique meta tags, Open Graph,
 * Twitter Card, canonical URL, and JSON-LD structured data.
 *
 * Usage:
 *   <SEO
 *     title="About Us | Helen's Home Care"
 *     description="Learn about our mission..."
 *     canonical="/about"
 *     schema={[{ "@type": "AboutPage", ... }]}
 *   />
 */
export default function SEO({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  schema = [],
  noIndex = false,
}) {
  const fullUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={fullUrl} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* ── Open Graph ── */}
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:url"         content={fullUrl} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* ── JSON-LD structured data ── */}
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
