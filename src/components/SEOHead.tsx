import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/site-config";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  /** Keep the page out of search results (hidden or placeholder content). */
  noindex?: boolean;
  /** Extra JSON-LD to emit into the document head. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/** Resolve a possibly-relative asset path to an absolute URL. */
function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${siteConfig.siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export default function SEOHead({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
  noindex = false,
  jsonLd,
}: SEOHeadProps) {
  // The home page reads better without a redundant "Home | " prefix.
  const fullTitle =
    path === "/" ? siteConfig.appName : `${title} | ${siteConfig.shortName}`;
  const url = `${siteConfig.siteUrl}${path}`;
  // og:image must be absolute — relative paths are ignored by crawlers.
  const imageUrl = absoluteUrl(image);
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteConfig.appName} />
      <meta property="og:locale" content="en_CA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {blocks.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
