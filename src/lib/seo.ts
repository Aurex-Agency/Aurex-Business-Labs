import type { Metadata } from "next";
import { site } from "./site-config";
export function pageMeta(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = title.includes(site.brandName)
    ? title
    : `${title} | ${site.brandName}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: `${site.url}${path}` },
    openGraph: {
      title: fullTitle,
      description,
      url: `${site.url}${path}`,
      siteName: site.brandName,
      type: "website",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export const organization = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.brandName,
  url: site.url,
  description: site.companyDescription,
  logo: `${site.url}/brand/aurex-mark.png`,
  areaServed: site.serviceArea,
  ...(site.legalName && { legalName: site.legalName }),
  ...(site.email && { email: site.email }),
  ...(site.phone && { telephone: site.phone }),
  ...(site.address && { address: site.address }),
  ...(site.foundedYear && { foundingDate: site.foundedYear }),
  ...(site.socialProfiles.length && { sameAs: site.socialProfiles }),
  ...(site.founderName && {
    founder: { "@type": "Person", name: site.founderName },
  }),
};
export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((i, n) => ({
      "@type": "ListItem",
      position: n + 1,
      name: i.name,
      item: `${site.url}${i.path}`,
    })),
  };
}
