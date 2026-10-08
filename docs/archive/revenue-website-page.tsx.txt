import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Minus,
  MapPin,
  MoveUpRight,
} from "lucide-react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PaybackPromise } from "@/components/landing/payback-promise";
import { HeroMedia } from "@/components/landing/hero-media";
import { SystemStory } from "@/components/landing/system-story";
import { FaqSection } from "@/components/landing/faq-section";
import { LeadForm } from "@/components/landing/lead-form";
import { TrackedLink } from "@/components/landing/tracked-link";
import { MobileStickyCta } from "@/components/landing/mobile-sticky-cta";
import {
  comparison,
  included,
  process,
  goodFit,
  notFit,
  projects,
} from "@/content/revenue-website";
import { site } from "@/lib/site-config";
export const metadata: Metadata = {
  alternates: { canonical: site.canonical },
  openGraph: { url: site.canonical },
};
const allProjects = [
  ...projects,
  {
    name: "Wood Eye Clinic",
    category: "Eye Care",
    description:
      "Explore the website for Wood Eye Clinic, a local eye care business.",
    url: "https://woodeyeclinic.com",
    image: "/projects/wood-eye.webp",
  },
  {
    name: "NetTech",
    category: "Technology Services",
    description: "Explore the website for NetTech and its technology services.",
    url: "https://nettech.ms",
    image: "/projects/nettech.webp",
  },
];
const leaks = [
  [
    "Unclear offer",
    "Visitors cannot quickly understand why they should choose the business.",
  ],
  [
    "Weak conversion path",
    "Calls to action are inconsistent, hidden, or asking for too much too soon.",
  ],
  [
    "Slow follow-up",
    "Interested prospects leave while the business waits to respond.",
  ],
  [
    "No attribution",
    "The owner cannot tell which calls, forms, or campaigns are producing opportunities.",
  ],
];
export default function RevenueWebsite() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section id="hero" className="hero">
          <div className="container">
            <div className="hero-top">
              <span className="eyebrow">
                <i className="status-dot" /> WEB DESIGN + REVENUE SYSTEMS FOR
                NORTH MISSISSIPPI
              </span>
              <span className="hero-edition">
                STRATEGY / DESIGN / CONNECTION
              </span>
            </div>
            <div className="hero-grid">
              <div className="hero-copy">
                <h1>
                  Turn your
                  <br />
                  website into a<br />
                  <em>sales system.</em>
                </h1>
                <p>
                  Aurex Business Labs builds custom websites that clarify your
                  offer, capture more qualified inquiries, track every call and
                  form, and follow up before opportunities go cold.
                </p>
                <div className="hero-actions">
                  <TrackedLink
                    event="hero_cta_click"
                    href="#review"
                    className="button"
                  >
                    Get My Free Website Revenue Review
                    <ArrowUpRight size={19} />
                  </TrackedLink>
                  <TrackedLink
                    event="secondary_cta_click"
                    href="#system"
                    className="text-link"
                  >
                    See How the System Works
                    <ArrowDown size={16} />
                  </TrackedLink>
                </div>
                <p className="price-note">
                  Custom projects start at <strong>$3,500.</strong> Payment
                  plans are available.
                </p>
                <PaybackPromise compact />
              </div>
              <HeroMedia />
            </div>
            <div className="hero-bottom">
              <p>
                <MapPin size={15} />
                <span>
                  Based in North Mississippi. Built around your business.
                </span>
              </p>
              <span>
                TUPELO · OXFORD · STARKVILLE · COLUMBUS · NEW ALBANY · PONTOTOC
                + BEYOND
              </span>
            </div>
          </div>
        </section>
        <section className="proof-strip" aria-label="System capabilities">
          <div className="container">
            <p>
              Built for businesses that need
              <br />
              <strong>more than a digital brochure.</strong>
            </p>
            <ul>
              {[
                "Custom Strategy",
                "Conversion-Focused Design",
                "Lead Tracking",
                "CRM Integration",
                "Fast Follow-Up",
              ].map((t) => (
                <li key={t}>
                  <span>+</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="section problem-section">
          <div className="container">
            <div className="problem-heading">
              <div>
                <span className="eyebrow">
                  01 / WHY MOST BUSINESS WEBSITES FAIL
                </span>
                <h2>
                  A better-looking
                  <br />
                  website is <em>not enough.</em>
                </h2>
              </div>
              <p>
                A website can look professional and still lose opportunities
                every day. When the offer is unclear, the next step is buried,
                tracking is missing, and follow-up is slow, the website becomes
                an online brochure instead of a business asset.
              </p>
            </div>
            <div className="leaks">
              {leaks.map(([title, body], i) => (
                <article key={title}>
                  <div className="leak-marker">
                    <span>0{i + 1}</span>
                    <i />
                  </div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className="problem-closing">
              <span className="tiny-cross">+</span>
              <p>
                The missing piece isn&apos;t another page.{" "}
                <span>It&apos;s the connection between them.</span>
              </p>
            </div>
          </div>
        </section>
        <SystemStory />
        <section className="section comparison-section">
          <div className="container">
            <div className="comparison-heading">
              <span className="eyebrow">THE CONNECTION CHANGES EVERYTHING</span>
              <h2>
                The difference is what happens
                <br />
                after someone <em>lands on the page.</em>
              </h2>
            </div>
            <div className="comparison">
              <div className="comparison-column typical">
                <h3>Typical Business Website</h3>
                <p>A place to find information.</p>
                <ul>
                  {comparison.map(([a]) => (
                    <li key={a}>
                      <Minus size={15} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="comparison-column connected">
                <div className="micro-label">BUILT TO WORK TOGETHER</div>
                <h3>Aurex Revenue Website System</h3>
                <p>A path from attention to opportunity.</p>
                <ul>
                  {comparison.map(([, b]) => (
                    <li key={b}>
                      <Check size={15} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="what-you-get" className="section included-section">
          <div className="container included-layout">
            <div className="included-intro">
              <span className="eyebrow">03 / WHAT YOU GET</span>
              <h2>
                Everything needed
                <br />
                to turn website traffic
                <br />
                into a <em>sales conversation.</em>
              </h2>
              <p>
                One focused system.
                <br />
                Thought through from the first word
                <br />
                to the first follow-up.
              </p>
              <a className="text-link" href="#investment">
                Explore the investment
                <ArrowUpRight size={18} />
              </a>
              <div className="included-graphic" aria-hidden="true">
                <span>FRONT END</span>
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span>BEHIND THE SCENES</span>
              </div>
            </div>
            <div className="included-list">
              {included.map(([title, body], i) => (
                <article key={title}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                  <MoveUpRight size={15} />
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="selected-work" className="section selected-work">
          <div className="container">
            <div className="work-heading">
              <div>
                <span className="eyebrow">04 / SELECTED WORK</span>
                <h2>
                  Real businesses.
                  <br />
                  <em>Distinctly their own.</em>
                </h2>
              </div>
              <div>
                <h3>Built for real businesses in North Mississippi.</h3>
                <p>
                  Aurex combines clear business strategy with custom digital
                  experiences designed around how each company earns trust and
                  wins customers.
                </p>
              </div>
            </div>
            <div className="project-grid">
              {allProjects.map((project, i) => (
                <article className="project" key={project.name}>
                  <TrackedLink
                    event="selected_work_click"
                    detail={project.name}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-preview"
                  >
                    <div className="project-frame">
                      <div className="browser-bar">
                        <span>
                          <i />
                          <i />
                          <i />
                        </span>
                        <small>{project.url.replace("https://", "")}</small>
                        <ArrowUpRight size={13} />
                      </div>
                      <Image
                        src={project.image}
                        alt={`Desktop homepage of ${project.name}`}
                        width={1440}
                        height={1000}
                        sizes="(max-width: 767px) 90vw, 44vw"
                        className="project-image"
                      />
                    </div>
                    <span className="view-project">
                      Visit website{" "}
                      <span className="sr-only">(opens in a new tab)</span>
                      <ArrowUpRight size={19} />
                    </span>
                  </TrackedLink>
                  <div className="project-title">
                    <div>
                      <span className="project-category">
                        0{i + 1} / {project.category}
                      </span>
                      <h3>{project.name}</h3>
                    </div>
                    <ArrowUpRight size={25} strokeWidth={1} />
                  </div>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="process" className="section process-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">
                05 / A FOCUSED 21-BUSINESS-DAY BUILD
              </span>
              <h2>
                From strategy to launch.
                <br />
                <em>Without months of confusion.</em>
              </h2>
            </div>
            <ol className="process-timeline">
              {process.map(([days, title, body], i) => (
                <li key={title}>
                  <div className="timeline-marker">
                    <span>0{i + 1}</span>
                    <i />
                  </div>
                  <span className="process-days">{days}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
            <div className="launch-promise" id="launch-guarantee">
              <div>
                <span className="eyebrow">OUR $1,000 PAYBACK GUARANTEE</span>
                <h3>
                  Your agreed scope.
                  <br />
                  21 business days.
                  <br />
                  <em>Or $1,000 back.</em>
                </h3>
              </div>
              <div>
                <p>
                  Once Aurex has the completed intake, required assets, account
                  access, approvals, and initial payment, the agreed project
                  scope will be ready for launch within 21 business days.
                </p>
                <p>
                  If Aurex does not complete the agreed scope and have it ready
                  for launch within that deadline for reasons within its
                  control, you receive{" "}
                  <strong>
                    $1,000 back. A payback, not a credit toward future work.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="investment" className="section pricing-section">
          <div className="container pricing-layout">
            <div>
              <span className="eyebrow">06 / THE INVESTMENT</span>
              <h2>
                One focused build.
                <br />
                <em>No mystery scope.</em>
              </h2>
              <p>
                A website your business can grow into.
                <br />A system your team can actually use.
              </p>
            </div>
            <div className="price-panel">
              <span className="micro-label">REVENUE WEBSITE SYSTEM</span>
              <div className="price">
                <span>Starting at</span>
                <strong>
                  $3,500<span>USD</span>
                </strong>
                <p>Two payments of $1,750</p>
              </div>
              <ul>
                {[
                  "Strategy and conversion messaging",
                  "Custom five to seven-page website",
                  "Local SEO foundation",
                  "Analytics and lead tracking",
                  "CRM pipeline setup",
                  "Automated lead response",
                  "Launch support",
                  "Thirty days of post-launch support",
                ].map((t) => (
                  <li key={t}>
                    <Check size={16} />
                    {t}
                  </li>
                ))}
              </ul>
              <TrackedLink
                event="pricing_cta_click"
                href="#review"
                className="button"
              >
                Request My Free Website Review
                <ArrowUpRight size={18} />
              </TrackedLink>
              <PaybackPromise compact />
              <p className="scope-note">
                Additional pages, e-commerce, advanced integrations, and custom
                application functionality are quoted separately.
              </p>
            </div>
          </div>
        </section>
        <section className="section fit-section">
          <div className="container">
            <span className="eyebrow">07 / THE RIGHT FIT MATTERS</span>
            <h2>
              Built for established businesses
              <br />
              where one new customer <em>matters.</em>
            </h2>
            <p className="fit-industries">
              Home services. Construction. Professional services. Healthcare.
              Equipment. Trailers and vehicles. Legal and financial services.
            </p>
            <div className="fit-columns">
              <div>
                <h3>
                  <span className="status-dot" />A good fit
                </h3>
                <ul>
                  {goodFit.map((t) => (
                    <li key={t}>
                      <Check size={16} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Probably not a fit</h3>
                <ul>
                  {notFit.map((t) => (
                    <li key={t}>
                      <Minus size={16} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <FaqSection />
        <LeadForm />
      </main>
      <SiteFooter />
      <MobileStickyCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${site.url}/#organization`,
                name: site.name,
                url: site.url,
                logo: `${site.url}/brand/aurex-mark.png`,
                ...(site.phone ? { telephone: site.phone } : {}),
                ...(site.email ? { email: site.email } : {}),
              },
              {
                "@type": "Service",
                name: "Aurex Revenue Website System",
                serviceType:
                  "Custom website design and lead-generation systems",
                provider: { "@id": `${site.url}/#organization` },
                areaServed: [
                  "North Mississippi",
                  "Tupelo",
                  "Oxford",
                  "Starkville",
                  "Columbus",
                  "New Albany",
                  "Pontotoc",
                  "Booneville",
                  "Corinth",
                ].map((name) => ({ "@type": "Place", name })),
                offers: {
                  "@type": "Offer",
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: 3500,
                    priceCurrency: "USD",
                  },
                },
                url: site.canonical,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
