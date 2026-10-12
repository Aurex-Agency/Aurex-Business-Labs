"use client";
import { Plus } from "lucide-react";
import { faqs } from "@/content/revenue-website";
import { track } from "@/lib/analytics";
export function FaqSection() {
  return (
    <section className="section" id="faq">
      <div className="container faq-layout">
        <div>
          <span className="eyebrow">08 / A FEW GOOD QUESTIONS</span>
          <h2>
            Clear answers.
            <br />
            <em>No fine print.</em>
          </h2>
          <p className="muted">
            A better decision starts with knowing what you&apos;re getting.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], i) => (
            <details
              key={question}
              onToggle={(e) => {
                if (e.currentTarget.open) track("faq_open", { question });
              }}
            >
              <summary>
                <span className="faq-index">0{i + 1}</span>
                {question}
                <Plus size={18} />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
