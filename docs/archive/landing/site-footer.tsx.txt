import { Brand } from "./site-header";
import { site } from "@/lib/site-config";
import { TrackedLink } from "./tracked-link";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Brand />
          <p>
            Built with purpose.
            <br />
            Based in North Mississippi.
          </p>
          <div>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
            {site.phone && (
              <TrackedLink
                event="phone_click"
                href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
              >
                {site.phone}
              </TrackedLink>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Aurex Business Labs</span>
          <span>Strategy. Design. Systems.</span>
          <a href="/privacy">
            Privacy policy <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
