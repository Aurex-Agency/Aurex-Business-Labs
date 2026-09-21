# Hero VSL recording brief

Recommendation: a concise founder-led explanation, about 90 seconds to two minutes, beside the main headline. This is a conversion hypothesis to validate with real campaign traffic, not a promised lift. Keep the review CTA and starting price visible without playing the video.

## Script direction

Your website should do more than tell people you exist. It should help the right customer understand your offer, take the next step, and hear back while they are still interested.

At Aurex Business Labs, we build the Revenue Website System for established businesses in North Mississippi. That means a custom website with clear messaging, focused conversion paths, lead tracking, CRM setup, and automated follow-up.

Here is what that looks like: someone finds your business on Google. They understand what you do and request a quote. Their inquiry enters your CRM, a response is triggered, and the original traffic source stays connected to the opportunity.

[Show brief real screen recordings from the approved portfolio. Do not add results, testimonials, or claims not supplied by the business.]

Projects start at $3,500, with two payments of $1,750. We agree on the scope and the next steps before the build begins.

And we put $1,000 behind our launch commitment. Once we have your completed intake, required assets, access, approvals, and initial payment, we will have the agreed scope ready for launch within 21 business days. If we miss that for reasons within our control, you get $1,000 back.

Start with a free Website Revenue Review. We will look at your current site, the path to an inquiry, your tracking, and your follow-up. You will leave with a clearer idea of what needs to happen next and whether this system is right for your business.

## Production

Film a direct-to-camera introduction and close. Use actual site and workflow recordings for the middle. Use clean speech and captions. Avoid stock footage, fake dashboards, and background music that competes with the narration. Review the recording for claims and guarantee wording before publication.

## Website integration

The supplied recording is now integrated through src/components/landing/hero-media.tsx. The source was downloaded from the user-provided Drive file and matched the reviewed local MOV byte for byte. The bundled public/videos assets include a 720p H.264/AAC MP4, WebP poster, and timed English WebVTT captions. The original MOV stays in ignored artifacts.

The player uses native controls, plays inline, and does not autoplay or preload the video. Its dimensions are reserved to prevent layout shift. Captions are already burned into the supplied recording, so the additional selectable caption track is not forced on by default. Public VSL environment variables can override the bundled assets; rebuild after changing them.

The recording itself has not been editorially rewritten: its purple caption highlights and spoken "21 days" remain. Written text beside the player links to the complete 21-business-day launch commitment. Use the guarantee wording above for a future recording replacement. The final spoken CTA says to schedule a review; the current page collects the review request before scheduling.
