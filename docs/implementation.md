# Implementation plan and design system

1. Verify the empty remote and current stable dependencies. Use the requested Next.js App Router stack.
2. Build an editorial midnight-blue and cool-white layout with Aurex-blue rules, generous typography, official brand assets, and varied section compositions.
3. Build the interactive example lead journey and desktop sticky four-stage system, with stacked mobile storytelling.
4. Connect the validated single-screen contact form, safe webhook delivery, 90-day first-touch and latest-touch attribution, and confirmed conversion analytics.
5. Complete secondary routes, metadata, documentation, browser coverage, visual review, and production verification.

The palette is centralized in src/app/globals.css. Geist handles interface and body copy; Instrument Serif adds editorial emphasis. Sections alternate dense technical demonstrations with open typography and a pale-blue portfolio surface. The visual concept is a precision-built business system, not a dashboard of fabricated metrics.

## Interaction architecture

Static marketing sections are server-rendered. Client boundaries are limited to navigation, the lead engine, sticky system narrative, accordion event tracking, attribution, the single-screen contact form, and analytics links. Motion animation features load through LazyMotion. The hero now uses the supplied native VSL player with a static poster, optional captions, no autoplay, and no initial video download. The original interactive example component remains available in source. The four-stage story uses Motion scroll values on desktop and individual illustrations in normal flow on mobile.

## Accessibility and conversion detail

Forms have persistent labels, inline errors, a linked error summary, focus management, a live status region, and input preservation on server failure. The review section suppresses the mobile fixed CTA so it cannot obscure fields. Disclosure elements provide native keyboard-operable FAQ accordions. Navigation closes with Escape and restores focus to its trigger. The light portfolio area uses deliberately darkened secondary labels for contrast.

The page uses no invented results or testimonials. The revised starting price is $3,500 with two payments of $1,750. The $1,000 payback guarantee retains the original 21-business-day deadline and prerequisites and applies to completing the agreed scope for reasons within Aurex control. The example journey and system illustrations are clearly labeled as conceptual.

The client imports lightweight form choices from src/lib/lead-options.ts. Zod and the shared schema load on demand when validation is needed; server validation remains mandatory for every submission. This preserves full server-rendered form markup while reducing the initial JavaScript download.
