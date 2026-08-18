import type { Metadata } from "next";
import {
  HiringBand,
  IntroSplit,
  PrinciplesRow,
  TeamGrid,
} from "@/components/about/AboutSections";
import { ABOUT_HEADLINE } from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT_HEADLINE,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <IntroSplit />
      <PrinciplesRow />
      <TeamGrid />
      <HiringBand />
    </main>
  );
}
