import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s — Movee",
    default: "User Profile — Movee",
  },
  description: "View user profile, reviews, watchlist and social connections on Movee.",
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return children;
}
