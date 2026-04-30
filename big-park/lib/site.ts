export const siteConfig = {
  name: "BigPark",
  description: "BigPark online store for curated products and accessories.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const getAbsoluteUrl = (path = "/") => {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
};
