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

/**
 * Page order synthesized from:
 *  - Schwartz (Breakthrough Advertising) — lead with dominant emotion,
 *    defer authority until after proof so it reads editorial, not guru.
 *  - Brunson (Epiphany Bridge) — scrolltelling as the visualized "wall".
 *  - StoryBrand — mechanism as explicit Plan after the Dream pivot.
 *  - Hormozi ($100M Offers) — disqualifier BEFORE offer (reactance +
 *    commitment), scarcity immediately after offer.
 *  - DACH market reality — the brand must register as a quiet operator,
 *    not a stage-brand. Hence Authority as editorial late, not early.
 */
export default function Home() {
  return (
    <main className="relative">
      <Nav />
      {/* 01 — Hook (Schwartz: dominant emotion first) */}
      <Hero />
      {/* 02 — Pain agitate */}
      <PainSection />
      {/* 03 — Pain visualized (Brunson: the wall) */}
      <RaftScrollSequence />
      {/* 04 — Dream state (emotional pivot) */}
      <DreamState />
      {/* 05 — Mechanism (StoryBrand: the Plan) */}
      <Mechanism />
      {/* 06 — Proof (Hormozi: anchor the value equation) */}
      <ProofStack />
      {/* 07 — Authority / origin (Schwartz: editorial, not guru intro) */}
      <OriginStory />
      {/* 08 — Disqualifier (Hormozi: reactance/commitment BEFORE offer) */}
      <Disqualifier />
      {/* 09 — Offer (to a pre-qualified, pre-proven reader) */}
      <Offer />
      {/* 10 — Selectivity bar (DACH: framing as craft, not scarcity theater) */}
      <ScarcityBar />
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
