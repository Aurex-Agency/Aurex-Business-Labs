import Image from "next/image";
import { site } from "@/lib/site-config";
import { publishableProof, roofingProof } from "@/lib/proof";

// The ads funnel has no navigation and no footer links: every page exists to
// carry a visitor from the headline to the video to the application.
export function FunnelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="l-call">
      <header className="l-call-header">
        <span className="l-brand">
          <Image
            src="/brand/aurex-mark.png"
            alt=""
            width={34}
            height={34}
            priority
          />
          <span className="l-brand-word">
            AUREX <small>BUSINESS LABS</small>
          </span>
        </span>
      </header>
      <main id="main">{children}</main>
      <footer className="l-call-footer">
        <p>
          © {new Date().getFullYear()} {site.legalName || site.brandName}
          {site.email && (
            <>
              {" · "}
              <a className="l-inline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </>
          )}
        </p>
      </footer>
    </div>
  );
}

// One proof line and, when available, one proof visual. Financial results
// appear only after the record is verified and cleared for publication in
// src/lib/proof.ts; until then the strip states who the system is built for.
export function TrustStrip() {
  const approved = publishableProof(roofingProof);
  const result = roofingProof.results[0];
  const shot = roofingProof.screenshots[0];
  return (
    <section className="l-call-trust" aria-label="Why contractors trust Aurex">
      {approved ? (
        <>
          <p className="l-call-proof">
            Built the digital infrastructure that generated{" "}
            <strong>
              ${result.amount.toLocaleString("en-US")} in{" "}
              {roofingProof.resultType}
            </strong>{" "}
            for a {roofingProof.clientDisplayName} {result.label}.
          </p>
          {shot && (
            <figure className="l-call-shot">
              <Image src={shot.src} alt={shot.alt} width={1200} height={750} />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          )}
          <p className="l-small">{roofingProof.disclaimer}</p>
        </>
      ) : (
        <>
          <p className="l-call-proof">
            Built only for <strong>established residential contractors</strong>{" "}
            who already have leads coming in and a team to work them.
          </p>
          <ul className="l-call-phases" aria-label="The four phases">
            {["Capture", "Convert", "Recover", "Compound"].map((p, i) => (
              <li key={p}>
                <span>0{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
