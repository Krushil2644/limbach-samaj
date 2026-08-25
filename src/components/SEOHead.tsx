import { useEffect } from "react";
import { siteConfig } from "@/site-config";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

/** Resolve a possibly-relative asset path to an absolute URL. */
function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${siteConfig.siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function upsertMeta(
  key: "name" | "property",
  value: string,
  content: string,
) {
  let element = document.head.querySelector(`meta[${key}="${value}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(key, value);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function SEOHead({
  title,
  description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
  noindex = false,
}: SEOHeadProps) {
  // The home page title reads better without the redundant "Home | " prefix.
  const fullTitle =
    path === "/" ? siteConfig.appName : `${title} | ${siteConfig.shortName}`;
  const url = `${siteConfig.siteUrl}${path}`;
  // og:image must be an absolute URL — relative paths are ignored by most
  // crawlers, which is why previews were rendering without an image.
  const imageUrl = absoluteUrl(image);

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow",
    );

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:site_name", siteConfig.appName);
    upsertMeta("property", "og:locale", "en_CA");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [fullTitle, description, url, imageUrl, type, noindex]);

  return null;
}
