import { Shell, PageHero } from "@/components/authority/shared";
import { Action } from "@/components/authority/interactions";
export default function NotFound() {
  return (
    <Shell>
      <PageHero
        eyebrow="Page not found"
        path="/404"
        title="This Page Is Not Here"
        description="The address may have changed. Explore our work or return to the homepage."
      >
        <div className="a-actions">
          <Action href="/" event="secondary_cta_click">
            Back to home
          </Action>
          <Action href="/work" event="secondary_cta_click" secondary>
            Explore the work
          </Action>
        </div>
      </PageHero>
    </Shell>
  );
}
