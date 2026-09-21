import { Brand } from "@/components/landing/site-header";
export default function NotFound() {
  return (
    <>
      <header className="secondary-header">
        <div className="container">
          <Brand />
        </div>
      </header>
      <main id="main" className="container">
        <div className="thank-you-layout">
          <span className="eyebrow">404 / A DIFFERENT DIRECTION</span>
          <h1>
            This page
            <br />
            is <em>off the map.</em>
          </h1>
          <p>Let&apos;s get you back to a clear next step.</p>
          <a className="button" href="/revenue-website">
            Explore the Revenue Website System ↗
          </a>
        </div>
      </main>
    </>
  );
}
