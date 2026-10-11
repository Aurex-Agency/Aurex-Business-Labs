export const stages = [
  {
    name: "Capture",
    question: "Attract the right inquiries.",
    description:
      "Make it clear who you help, what you do, and how a homeowner can take the next step.",
    detail:
      "Start with one priority service. Connect each inquiry to its original source so your team knows where opportunities begin.",
    icon: "capture",
    resource: "lead-response-checklist",
  },
  {
    name: "Convert",
    question: "Give every lead a next step.",
    description:
      "Connect the first response to a real conversation, an appointment, and a clear estimate.",
    detail:
      "Choose an owner for every new inquiry. Make the next action and appointment details easy for both your team and the homeowner to find.",
    icon: "convert",
    resource: "contractor-revenue-scorecard",
  },
  {
    name: "Recover",
    question: "Keep good conversations going.",
    description:
      "Follow up on open estimates with context, useful answers, and respect for the homeowner’s timing.",
    detail:
      "An unanswered estimate needs a useful check-in. Agree on when to reconnect, document the answer, and stop when asked.",
    icon: "recover",
    resource: "estimate-follow-up-playbook",
  },
  {
    name: "Compound",
    question: "Build on a job well done.",
    description:
      "Make reviews, referrals, and the next service a thoughtful part of the customer experience.",
    detail:
      "Confirm the work is complete, ask for honest feedback, and record the customer’s preferences for future contact. Make the handoff part of your checklist.",
    icon: "compound",
    resource: "lead-response-checklist",
  },
] as const;

export const resources = [
  {
    slug: "contractor-revenue-scorecard",
    title: "Contractor Revenue Scorecard",
    shortTitle: "See the whole journey.",
    description:
      "Put inquiries, appointments, estimates, and sold jobs on the same page. Find the handoff that needs a closer look.",
    format: "Interactive tool + worksheet",
    category: "Measurement",
    visual: "scorecard",
    download: "/resources/contractor-revenue-scorecard.csv",
    downloadLabel: "Download blank worksheet",
    article: "how-contractors-track-marketing-from-lead-to-sold-job",
    steps: [
      {
        title: "Choose a group of inquiries",
        text: "Use one source, service, and intake period. Follow those same inquiries through the process. Do not mix this week’s new leads with jobs sold from last month’s leads.",
      },
      {
        title: "Agree on the definitions",
        text: "Count unique, valid inquiries. Contacted means a two-way conversation. Booked means a scheduled appointment. An estimate is a delivered scope. A sold job is an accepted agreement, not collected cash.",
      },
      {
        title: "Look at the handoffs",
        text: "Use the tool below to calculate the share reaching each next stage. A low rate is a question to investigate, not proof of a cause. Allow time for open opportunities to mature.",
      },
      {
        title: "Choose one action",
        text: "Review a few actual records with the person who owns the next step. Agree on one change, an owner, and a review date. Keep repeat and referral opportunities in a separate group.",
      },
    ],
  },
  {
    slug: "estimate-follow-up-playbook",
    title: "Open Estimate Follow-up Playbook",
    shortTitle: "Reopen the conversation.",
    description:
      "A practical sequence and adaptable messages for estimates that have gone quiet. Clear next steps without pressure.",
    format: "Playbook + message templates",
    category: "Recover",
    visual: "recover",
    download: "/resources/estimate-follow-up-playbook.txt",
    downloadLabel: "Download the playbook",
    article: "how-to-follow-up-on-unclosed-contractor-estimates",
    steps: [
      {
        title: "Agree on the next conversation",
        text: "When you deliver the estimate, walk through the scope and ask when it would be helpful to reconnect. Record the agreed date, channel, and team member responsible.",
        script:
          "Thanks for talking through the project. When would be a useful time to check back after you’ve reviewed the estimate?",
      },
      {
        title: "Check understanding",
        text: "At the agreed time, ask whether the estimate answered their questions. Reference the actual project and make it easy to reply.",
        script:
          "Hi [name], it’s [your name] from [business]. Did the estimate for [project] cover what you needed? Happy to talk through any questions about the scope.",
      },
      {
        title: "Offer a useful next step",
        text: "If the homeowner wants to continue, find out what still needs clarification. Route technical or scheduling questions to the right person. Never invent availability.",
        script:
          "Would a short scope review help? We can go through [specific question] together and confirm what happens next.",
      },
      {
        title: "Respect a pause",
        text: "If the timing has changed, ask whether they want to set a later date or close the conversation. Honor opt-outs and avoid having multiple team members contact the same person.",
        script:
          "Has the timing changed for your project? Let us know if you’d like to reconnect later or close this out for now.",
      },
      {
        title: "Record the outcome",
        text: "Mark the estimate accepted, still open, paused, or closed. Record the next agreed action. Keep an unknown reason separate from a confirmed one and retain the original acquisition source.",
      },
    ],
  },
  {
    slug: "lead-response-checklist",
    title: "Lead Response Checklist",
    shortTitle: "Make the next step clear.",
    description:
      "A working checklist for the handoffs between the first call, the estimate, and a happy customer’s next opportunity.",
    format: "Interactive + printable checklist",
    category: "Convert / Compound",
    visual: "checklist",
    download: "/resources/lead-response-checklist.txt",
    downloadLabel: "Download the checklist",
    article: "how-contractors-track-marketing-from-lead-to-sold-job",
    steps: [
      {
        title: "Give every inquiry an owner",
        text: "Decide who handles calls, forms, and messages, including after-hours inquiries. Have a backup when that person is unavailable.",
      },
      {
        title: "Keep the context",
        text: "Record the original source, requested service, service area, and any preferences the homeowner has shared. Avoid making them repeat the same information.",
      },
      {
        title: "Close the missed-call loop",
        text: "Keep a visible queue of unanswered inquiries. Record each attempt and the agreed next step so two people do not duplicate the same follow-up.",
      },
      {
        title: "Make booking easy to understand",
        text: "Confirm the appointment time, who is attending, what will happen, and how to reschedule. Use the homeowner’s agreed contact channel.",
      },
      {
        title: "Prepare the estimator",
        text: "Pass the homeowner’s questions and project context to the person attending. Make sure someone owns the estimate after the visit.",
      },
      {
        title: "Agree on estimate follow-up",
        text: "Explain the scope, ask when to reconnect, and record the date. Respect a decision to pause or stop contact.",
      },
      {
        title: "Finish the job well",
        text: "Confirm that the homeowner’s questions and outstanding items have been addressed before moving the job to complete.",
      },
      {
        title: "Ask for honest feedback",
        text: "Give completed customers the same opportunity to leave an honest review. Do not condition the request on a positive response.",
      },
      {
        title: "Make referrals straightforward",
        text: "Give happy customers a clear way to introduce someone who needs your service. Ask the new person how they heard about you so the source stays visible.",
      },
      {
        title: "Document future preferences",
        text: "Where relevant, ask whether the customer wants reminders about future service. Record their answer and respect a change of mind.",
      },
    ],
  },
] as const;
export type Resource = (typeof resources)[number];
