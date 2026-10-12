import { site } from "@/lib/site-config";
import { pageMeta } from "@/lib/seo";
import { Shell, PageHero } from "@/components/authority/shared";
import { ContactLink } from "@/components/authority/interactions";
import { ContactForm } from "@/components/studio/contact-form";
export const metadata = pageMeta(
  "Start a Conversation",
  "Tell Aurex Business Labs what you are thinking about. Customer acquisition, lead handling, recovery or repeat business.",
  "/contact",
);
export default function Contact() {
  return (
    <Shell>
      <PageHero
        eyebrow="Start a conversation"
        path="/contact"
        title={
          <>
            Let’s talk about your <em>next stage of growth.</em>
          </>
        }
        description="Tell us a little about your business and what you have in mind. You don’t need a perfect brief to start a good conversation."
      />
      <section
        className="l-form-section"
        aria-label="Contact Aurex Business Labs"
      >
        <div className="l-wrap l-form-layout">
          <aside className="l-form-aside">
            <h2>
              Better decisions start <em>with a conversation.</em>
            </h2>
            <p>
              Share what’s working, what isn’t, or what you want to do
              differently. We’ll take it from there.
            </p>
            {(site.email || site.phone) && (
              <div className="l-direct">
                <p className="l-eyebrow is-muted">Prefer a direct line?</p>
                {site.email && (
                  <ContactLink
                    href={`mailto:${site.email}`}
                    event="email_click"
                  >
                    {site.email}
                  </ContactLink>
                )}
                {site.phone && (
                  <ContactLink href={`tel:${site.phone}`} event="phone_click">
                    {site.phone}
                  </ContactLink>
                )}
              </div>
            )}
          </aside>
          <ContactForm />
        </div>
      </section>
    </Shell>
  );
}
