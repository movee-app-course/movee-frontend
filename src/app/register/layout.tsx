import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account — Movee",
  description: "Join Movee to start tracking movies, writing reviews, and discovering what your friends are watching.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
