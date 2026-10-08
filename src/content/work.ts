export type Project = {
  slug: string;
  name: string;
  category: string;
  image: string;
  url?: string;
  accent: string;
  summary: string;
  focus: string[];
  detail: string;
};
export const work: Project[] = [
  {
    slug: "norton-equipment",
    name: "Norton Equipment Co",
    category: "Equipment & industrial",
    image: "/projects/norton.webp",
    url: "https://nortonequipmentco.com",
    accent: "#cbb473",
    summary: "Built for the work behind the work.",
    focus: [
      "Digital experience",
      "Information architecture",
      "Inquiry pathways",
    ],
    detail:
      "A clearer digital experience organized around products, regional trust, and the next step for prospective buyers. Equipment categories, service information, and contact paths give customers a practical way to find what they need.",
  },
  {
    slug: "triple-r-trailers",
    name: "Triple R Trailers",
    category: "Manufacturing & trailer sales",
    image: "/projects/triple-r.webp",
    url: "https://triplertrailers.com",
    accent: "#b8343c",
    summary: "An unmistakable presence for a hands-on business.",
    focus: ["Website design", "Product discovery", "Dealer navigation"],
    detail:
      "A search-ready website structure designed to help buyers understand the inventory, services, and path toward a quote. The experience brings product browsing and dealer navigation into a clear, recognizable presentation.",
  },
  {
    slug: "wood-eye-clinic",
    name: "Wood Eye Clinic",
    category: "Healthcare",
    image: "/projects/wood-eye.webp",
    accent: "#739b9a",
    summary: "A digital front door with a human touch.",
    focus: ["Website experience"],
    detail:
      "A welcoming first impression for a local eye clinic. A calm blue palette, prominent team photography, and clear appointment navigation bring a human presence to the experience.",
  },
  {
    slug: "nettech",
    name: "NetTech",
    category: "Technology",
    image: "/projects/nettech.webp",
    accent: "#637cdc",
    summary: "Technical expertise, clearly presented.",
    focus: ["Website experience"],
    detail:
      "An approachable presentation for a technology business. A confident navy palette, direct messaging, and a prominent conversation starter make technical services easier to explore.",
  },
];
