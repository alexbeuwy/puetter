import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PainSection from "@/components/PainSection";
import RaftScrollSequence from "@/components/RaftScrollSequence";
import DreamState from "@/components/DreamState";
import Mechanism from "@/components/Mechanism";
import ProofStack from "@/components/ProofStack";
import OriginStory from "@/components/OriginStory";
import Offer from "@/components/Offer";
import ScarcityBar from "@/components/ScarcityBar";
import Disqualifier from "@/components/Disqualifier";
import LeadMagnet from "@/components/LeadMagnet";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      {/* 1 — Hook */}
      <Hero />
      {/* 2 — Pain Agitate */}
      <PainSection />
      {/* 3 — Pain visualized (scrolltelling) */}
      <RaftScrollSequence />
      {/* 4 — Dream state */}
      <DreamState />
      {/* 5 — Mechanism */}
      <Mechanism />
      {/* 6 — Proof */}
      <ProofStack />
      {/* 7 — Authority / origin */}
      <OriginStory />
      {/* 8 — Offer */}
      <Offer />
      {/* 9 — Scarcity (Hormozi) */}
      <ScarcityBar />
      {/* 10 — Disqualifier */}
      <Disqualifier />
      {/* 11 — Lead magnet (for the not-yet-ready) */}
      <LeadMagnet />
      {/* 12 — Objection handling */}
      <FAQ />
      {/* 13 — Final CTA */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
