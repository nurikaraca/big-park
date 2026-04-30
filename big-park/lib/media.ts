export const getMediaUrl = (url?: string | null) => {
  if (!url) {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "";
  const path = url.startsWith("/") ? url : `/${url}`;

  return `${baseUrl}${path}`;
};
