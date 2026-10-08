export type ProofRecord = {
  id: string;
  clientDisplayName: string;
  anonymized: boolean;
  trade: string;
  location: string;
  problem?: string;
  baseline?: string;
  workPerformed: string[];
  dateRange?: { start: string; end: string; label: string };
  results: { amount: number; currency: string; label: string }[];
  resultType: "tracked revenue" | "collected revenue";
  attributionStatus: "tracked" | "influenced" | "estimated";
  screenshots: { src: string; alt: string; caption: string }[];
  testimonialUrl?: string;
  video?: {
    title: string;
    summary: string;
    thumbnail: string;
    uploadDate: string;
    duration?: string;
    transcript?: string;
  };
  permissionToPublish: boolean;
  verificationStatus: "pending" | "verified";
  methodologyNotes: string;
  disclaimer: string;
  publishedAt?: string;
  updatedAt?: string;
};
export function publishableProof(record: ProofRecord) {
  return record.verificationStatus === "verified" && record.permissionToPublish;
}
export const roofingProof: ProofRecord = {
  id: "roofing-revenue-system",
  clientDisplayName: "North Mississippi roofing company",
  anonymized: true,
  trade: "Roofing",
  location: "North Mississippi",
  workPerformed: [],
  results: [{ amount: 320000, currency: "USD", label: "over four months" }],
  resultType: "tracked revenue",
  attributionStatus: "tracked",
  screenshots: [],
  permissionToPublish: false,
  verificationStatus: "pending",
  methodologyNotes:
    "Exact dates, source records, scope and client publication permission must be reconciled before publishing results.",
  disclaimer:
    "Tracked revenue does not prove sole causation. Results vary. Past performance does not guarantee future results.",
};
