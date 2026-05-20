import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile — Movee",
  description: "Your Movee profile — ratings, reviews, watchlist and the people you follow.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
