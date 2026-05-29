import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Build a full TMDB poster/backdrop URL.
 * @param path  e.g. "/abc123.jpg" from TMDB API
 * @param size  TMDB image size code (default "w500")
 */
export function tmdbImage(
  path: string | null | undefined,
  size: "w92" | "w154" | "w185" | "w200" | "w342" | "w500" | "w780" | "w1280" | "original" = "w500"
): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

/**
 * Format a score (1-10) as a string, e.g. 8 → "8.0"
 */
export function formatScore(score: number): string {
  return score.toFixed(1);
}

/**
 * Format an ISO date string to a localised short date.
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format date as relative time (e.g., "3 дня назад")
 */
export function timeAgo(date: string | Date | number): string {
  const timeMs = typeof date === "number" ? date : new Date(date).getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
  const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  const rtf = new Intl.RelativeTimeFormat("ru", { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}
