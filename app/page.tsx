import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Workflow from "@/components/Workflow";
import ScrollSection from "@/components/ScrollSection";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen flex flex-col min-w-0 w-full max-w-full">
      <Header />

      <div className="flex-1 min-w-0">
        {/* Hero Section - Z-Index 1 */}
        <ScrollSection index={1}>
          <Hero />
        </ScrollSection>

        {/* Services Section - Z-Index 2 */}
        <ScrollSection index={2} id="services">
          <Services />
        </ScrollSection>

        {/* Workflow Section - rendered outside ScrollSection since it manages its own scroll animations and needs full height */}
        <div className="relative z-3">
          <Workflow />
        </div>
      </div>

      {/* Static Footer */}
      <footer className="relative py-6 border-t border-white/5 bg-background mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold flex items-center gap-3">
            <Image
              src="/2.png"
              alt="Spark Collective Icon"
              width={32}
              height={32}
            />
            <Image
              src="/4.png"
              alt="Spark Collective Logo"
              width={180}
              height={40}
              className="h-8 md:h-12 w-auto"
            />
          </div>
          <div className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Spark Collective. All rights reserved.
          </div>
          <div className="flex gap-4 md:gap-8 text-sm text-zinc-400">
            {/* <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a> */}
          </div>
        </div>
      </footer>

      {/* Fixed Overlay */}
      <WhatsAppCTA />
    </main>
  );
}
