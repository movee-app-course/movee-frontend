import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Movee",
    default: "Movie — Movee",
  },
  description: "Discover ratings and reviews from people you follow on Movee.",
};

export default function MovieLayout({ children }: { children: React.ReactNode }) {
  return children;
}
