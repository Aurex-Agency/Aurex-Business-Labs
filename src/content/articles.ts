export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
};
export const articles: Article[] = [
  {
    slug: "how-contractors-track-marketing-from-lead-to-sold-job",
    title: "How Contractors Should Track Marketing From Lead to Sold Job",
    summary:
      "Connect each inquiry to an opportunity, then reconcile appointments, estimates, sold jobs and collected revenue. A shared set of stage definitions makes the numbers useful.",
    category: "Measurement",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    sections: [
      {
        heading: "Start with a shared definition of each stage",
        paragraphs: [
          "A contractor can track marketing from lead to sold job by keeping a source, owner, stage and next action on each opportunity. Give each job a stable identifier. Connect the CRM record to the estimate and payment record so one homeowner is not counted as three separate sales.",
          "The goal is to see where opportunities stop moving. An ad platform can report an inquiry, but your office must confirm whether it was valid, whether an appointment happened, and whether the business collected payment.",
        ],
        list: [
          "Source: the known campaign, referral partner, repeat-customer relationship or other origin. Keep unknown as unknown.",
          "Total leads: all incoming inquiries before quality checks.",
          "Valid leads: inquiries that meet your written service-area and service-type rules, with duplicates and spam removed.",
          "Contacted: a two-way conversation happened. An unanswered call or sent text is an attempt, not contact.",
          "Qualified: the homeowner and project meet the agreed service, location and timing criteria.",
          "Booked: an appointment is scheduled. Showed: the appointment actually occurred.",
          "Estimated: a priced proposal was delivered. Sold: the client’s documented acceptance condition was met.",
          "Collected: payment was received and reconciled. A signed contract is not collected revenue.",
        ],
      },
      {
        heading: "Build one practical pipeline",
        paragraphs: [
          "A roofing company could use New inquiry → Contact attempted → Contacted → Qualified → Inspection booked → Inspection completed → Estimate sent → Sold → Collected. Keep a lost or deferred status with a reason and a next review date.",
          "This is a hypothetical pipeline, not an Aurex client result. Your service may need fewer stages. Emergency plumbing and a planned kitchen remodel have different buying cycles. Keep definitions stable long enough to compare periods, and document any changes.",
          "Store first source and latest source separately. The first tells you where the relationship began; the latest may explain what brought the homeowner back. Neither alone proves a campaign caused the sale.",
        ],
      },
      {
        heading: "Calculate rates with named denominators",
        paragraphs: [
          "Contact rate = contacted valid leads ÷ valid leads. Booking rate = booked appointments ÷ qualified leads. Show rate = completed appointments ÷ booked appointments. Estimate-to-sale rate = sold jobs ÷ delivered estimates.",
          "A hypothetical week with 40 valid inquiries and 24 two-way conversations has a 60% contact rate. If 12 qualified homeowners book and 9 attend, the show rate is 75%. These calculations describe different steps. Do not label all of them conversion rate.",
          "Cost per sold job = agreed acquisition costs ÷ sold jobs attributed under your stated method. Estimated gross profit = collected revenue × documented gross-margin estimate. Gross profit excludes some business expenses and is not net profit. Use actual job costs when available.",
        ],
      },
      {
        heading: "Use a weekly scorecard and a monthly reconciliation",
        paragraphs: [
          "Review new leads, valid leads, contacted, qualified, booked, showed, estimated and sold every week. Add spend, collected revenue, estimated gross profit when known, and open opportunities without a next step. Break out new, recovered, repeat and referral activity without counting the same job twice.",
          "The office owns contact and booking status. Estimators own proposals and lost reasons. The owner or finance lead reconciles sold and collected values. Give every missing field an owner before adding another dashboard.",
          "Compare cohorts as well as calendar totals. A job sold this week may come from an inquiry six weeks ago. A monthly cash report and a lead-cohort report answer different questions.",
        ],
      },
      {
        heading: "Catch errors before you change the campaign",
        paragraphs: [
          "Check duplicate submissions, test leads, cancellations, refunds, inconsistent time zones and imported records with no source. Keep original timestamps when moving data. Do not replace an unknown source with the campaign you hope produced the job.",
          "Audit a small sample from ad click to payment record each month. If the CRM shows a sale but the accounting record does not, resolve the difference before publishing revenue. Use the results methodology to distinguish tracked, collected and influenced results.",
          "A Revenue Leakage Audit helps map this process and identify which three improvements deserve attention first.",
        ],
      },
    ],
  },
  {
    slug: "cost-per-lead-vs-cost-per-sold-job",
    title: "Cost Per Lead vs. Cost Per Sold Job",
    summary:
      "Cost per lead measures inquiries. Cost per sold job measures the cost of winning work. Use both, with job margins and collection timing, to judge acquisition economics.",
    category: "Economics",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    sections: [
      {
        heading: "The cheapest inquiry is not always the best opportunity",
        paragraphs: [
          "Cost per lead is acquisition spend divided by incoming leads. Cost per sold job is acquisition spend divided by sold jobs attributed to that activity. A lower cost per lead can still produce a higher cost per sold job when few inquiries qualify, book or buy.",
          "Contractors should follow the full chain before moving budget. Lead cost helps diagnose acquisition. Sold-job cost and collected gross profit help evaluate whether the work can support the investment.",
        ],
      },
      {
        heading: "Define the cost and the outcome",
        paragraphs: [
          "Advertising-only costs and fully loaded acquisition costs should be reported separately. The second may include management, creative, tracking and agreed software costs. Name what is included before comparing providers.",
        ],
        list: [
          "CPL = acquisition cost ÷ total leads.",
          "Cost per qualified lead = acquisition cost ÷ qualified leads.",
          "Cost per booked appointment = acquisition cost ÷ booked appointments.",
          "Cost per sold job = acquisition cost ÷ sold jobs.",
          "If the denominator is zero, report no outcomes yet. Do not report a zero-dollar acquisition cost.",
        ],
      },
      {
        heading: "A hypothetical contractor comparison",
        paragraphs: [
          "Suppose two campaigns each spend $3,000 on advertising. Campaign A brings 100 leads and 3 sold jobs. Campaign B brings 50 leads and 5 sold jobs. A has a $30 CPL and a $1,000 advertising cost per sold job. B has a $60 CPL and a $600 advertising cost per sold job.",
          "These are hypothetical numbers, not client results or expected outcomes. They assume consistent definitions and comparable sales windows. Differences in job value, margins, cancellations and collection timing could still change the business decision.",
          "Before judging either campaign, check service mix and fulfillment. A high-value roof replacement and a minor repair are not interchangeable outcomes. Check that the sales team followed the same lead-handling process.",
        ],
      },
      {
        heading: "Work back from gross-profit payback",
        paragraphs: [
          "Estimated gross profit per additional job = collected job revenue × documented gross margin. Break-even additional jobs = total incremental investment ÷ estimated gross profit per additional job, rounded up. Include advertising and specified third-party costs alongside the Aurex investment.",
          "For a hypothetical collected job value of $10,000 and 30% gross margin, estimated gross profit is $3,000 per job. A hypothetical total investment of $24,000 would need eight additional jobs at that margin to cover that investment before other overhead and taxes. This is an arithmetic illustration, not a forecast.",
          "Use incremental jobs where possible. Counting jobs the business would have won anyway overstates payback. Also consider deposits, payment delays, warranty work and capacity. Profitability on paper does not guarantee available cash.",
        ],
      },
      {
        heading: "Questions your agency should be able to answer",
        paragraphs: [
          "Ask which inquiries qualify, which campaign records reconcile to opportunities, how duplicate leads are removed, and how long the typical sale takes. Ask whether reported revenue is tracked, collected or influenced, and whether refunds are removed.",
          "Request the cost per qualified lead, appointment and sold job alongside CPL. Ask what changed when leads failed to book and what evidence supports the next test. A useful answer separates campaign issues from office-response and sales-process issues.",
        ],
      },
      {
        heading: "What your team needs to track",
        paragraphs: [
          "Record source, priority service, lead owner, first response, appointment outcome, estimate amount, sold date and collected amount. Record a lost reason. Review the same cohort after enough time has passed for jobs to close.",
          "Use the numbers to locate a constraint. If many valid leads never reach a conversation, investigate response and coverage. If estimates stall, inspect project fit, scope clarity and follow-up. If sold work does not produce margin, revisit pricing and delivery costs.",
          "The Revenue Integrity Standard starts with these economics. If margins, staffing, capacity or data do not support a credible path to payback, the responsible next step is to fix that constraint before expanding acquisition.",
        ],
      },
    ],
  },
  {
    slug: "how-to-follow-up-on-unclosed-contractor-estimates",
    title: "How to Follow Up on Unclosed Contractor Estimates",
    summary:
      "Give every open estimate an owner, a next step and a reason for follow-up. Use helpful conversations to resolve decisions, then stop when the homeowner declines or opts out.",
    category: "Recover",
    publishedAt: "2026-10-08",
    updatedAt: "2026-10-08",
    sections: [
      {
        heading: "Follow up to resolve a decision",
        paragraphs: [
          "Contractors should follow up on open estimates with a clear next step, useful project information and respect for the homeowner’s preferred contact channel. Assign an owner and a follow-up date when the estimate is delivered. Automation can remind; a person should handle questions, objections and scope changes.",
          "An unanswered estimate does not automatically mean the price was too high. The homeowner may be comparing scope, waiting for another decision-maker, arranging payment, delaying the project or unsure what happens next. Ask before assuming.",
        ],
      },
      {
        heading: "Agree on timing before the conversation ends",
        paragraphs: [
          "Ask when the homeowner expects to decide and when it would be helpful to reconnect. Record that answer. A storm-related roof repair may need a different pace from a planned bathroom renovation.",
          "Use the requested channel and the permissions documented for that contact. Do not move a person into marketing texts simply because they asked for a quote. Keep consent records, honor opt-outs and obtain appropriate review of messaging practices before launching automation.",
        ],
      },
      {
        heading: "A hypothetical follow-up sequence",
        paragraphs: [
          "The following is an example to adapt to the homeowner’s request, your project cycle and applicable requirements. It is not a required contact frequency or a legal compliance checklist.",
        ],
        list: [
          "At delivery: walk through the scope, exclusions and next step. Ask who else needs to review the decision.",
          "At the agreed check-in: confirm the estimate arrived and ask which part needs clarification.",
          "A few days later, if appropriate: offer a short scope conversation. Ask whether timing, project details or payment arrangements are holding up the decision.",
          "At the next agreed date: summarize any approved changes and confirm a decision or a later follow-up date.",
          "Final check-in: ask whether to close the estimate or reconnect at a specific time. If there is no response, stop the active sequence under your agreed policy.",
        ],
      },
      {
        heading: "Use human conversations for real questions",
        paragraphs: [
          "An automated reminder should identify the business, reference the estimate and make replying easy. A person should answer questions about warranties, materials, scheduling and change orders. Never let automation invent availability or revised prices.",
          "Ask, ‘Is there anyone else who needs to review the scope before you decide?’ For payment concerns, ask whether the homeowner wants information about available payment or financing options. Only describe options that actually exist, and route detailed financing questions to the approved provider. Do not promise approval or terms.",
          "A useful message could say: ‘Hi, this is your project contact. Did the estimate answer your questions about the scope? If you would like, we can review it together. Let us know if the project is on hold.’ Adapt the message to your documented permissions and relationship.",
        ],
      },
      {
        heading: "Know when to stop",
        paragraphs: [
          "Stop when the homeowner declines further contact, opts out, says the job is awarded elsewhere or asks to be contacted later. Suppress opted-out contacts across connected tools. Avoid repeated calls from different team members and never use threats, shame or false urgency.",
          "Use a lost-reason field with choices such as timing, scope, price, competitor, no response or outside service area. Keep uncertain reasons separate from confirmed ones. A homeowner who does not reply has not confirmed a price objection.",
        ],
      },
      {
        heading: "Measure recovery without double counting",
        paragraphs: [
          "Track eligible open estimates, contacted homeowners, resumed conversations, appointments, accepted estimates and collected revenue. Recovery rate = recovered sold opportunities ÷ eligible opportunities in the defined cohort. State the date window and what qualifies as recovered.",
          "Keep the original acquisition source and add the recovery touch. If a follow-up workflow touched the job, describe the result as influenced unless the evidence supports a stronger interpretation. Do not count the same job as both new and recovered revenue in a combined total.",
          "Review opt-outs, complaints and unanswered messages alongside sales outcomes. The goal is a useful process homeowners can control. The Revenue Capture System includes one primary opportunity-recovery workflow matched to the business’s highest-value gap.",
        ],
      },
    ],
  },
];
