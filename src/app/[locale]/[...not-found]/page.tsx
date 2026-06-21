import { notFound } from "next/navigation";

// Any unmatched path under a locale (e.g. dead URLs from the old site
// structure) lands here. Calling notFound() renders the locale-level
// not-found.tsx UI WITH a real HTTP 404 status — instead of a "200 OK"
// soft-404, which Google never drops and keeps re-crawling.
export default function CatchAllNotFound() {
  notFound();
}
