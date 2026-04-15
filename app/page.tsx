import Nav from "@/components/Nav";
import HeroSequence from "@/components/HeroSequence";
import PainSection from "@/components/PainSection";
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
 * Page order (post-research synthesis):
 *  01 HeroSequence       — scroll-pinned frame-by-frame canvas sequence
 *                          (replaces old Hero + RaftScrollSequence)
 *  02 PainSection        — agitate
 *  03 DreamState         — emotional pivot
 *  04 Mechanism          — StoryBrand plan
 *  05 ProofStack         — Hormozi value anchor
 *  06 OriginStory        — Schwartz editorial authority (late, not guru)
 *  07 Disqualifier       — Hormozi reactance BEFORE offer
 *  08 Offer              — presented to a pre-qualified reader
 *  09 ScarcityBar        — DACH: framed as craft, not countdown
 *  10 LeadMagnet         — secondary path for not-yet-ready
 *  11 FAQ                — objection handling before close
 *  12 FinalCTA           — direct close
 */
export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <HeroSequence />
      <PainSection />
      <DreamState />
      <Mechanism />
      <ProofStack />
      <OriginStory />
      <Disqualifier />
      <Offer />
      <ScarcityBar />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
