import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Movies — Movee",
  description: "Search for any movie and discover what people in your network think about it.",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
