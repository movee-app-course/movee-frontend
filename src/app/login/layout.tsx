import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in — Movee",
  description: "Log in to your Movee account to track movies and see what your friends are watching.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
