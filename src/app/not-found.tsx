import { Shell, PageHero } from "@/components/authority/shared";
import { Action } from "@/components/authority/interactions";
export default function NotFound() {
  return (
    <Shell>
      <PageHero
        eyebrow="Page not found"
        path="/404"
        title="This Page Is Not Here"
        description="The address may have changed. Explore the Revenue Capture System or return to the homepage."
      >
        <div className="a-actions">
          <Action href="/" event="secondary_cta_click">
            Back to home
          </Action>
          <Action
            href="/revenue-capture-system"
            event="secondary_cta_click"
            secondary
          >
            Explore the system
          </Action>
        </div>
      </PageHero>
    </Shell>
  );
}
