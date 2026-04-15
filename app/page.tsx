import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PainSection from "@/components/PainSection";
import RaftScrollSequence from "@/components/RaftScrollSequence";
import DreamState from "@/components/DreamState";
import Mechanism from "@/components/Mechanism";
import ProofStack from "@/components/ProofStack";
import OriginStory from "@/components/OriginStory";
import Offer from "@/components/Offer";
import Disqualifier from "@/components/Disqualifier";
import LeadMagnet from "@/components/LeadMagnet";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <PainSection />
      <RaftScrollSequence />
      <DreamState />
      <Mechanism />
      <ProofStack />
      <OriginStory />
      <Offer />
      <Disqualifier />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
