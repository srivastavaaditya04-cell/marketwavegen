import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { FlipSignals } from "@/components/sections/flip-signals";
import { Outcomes } from "@/components/sections/outcomes";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { AiOrchestration } from "@/components/sections/ai-orchestration";
import { AbmSystem } from "@/components/sections/abm-system";
import { DemandCreation } from "@/components/sections/demand-creation";
import { CoreStrengths } from "@/components/sections/core-strengths";
import { TrustedBrands } from "@/components/sections/trusted-brands";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <Hero />
       <Features />
      <Outcomes />
      <AiOrchestration />
      <AbmSystem />
      <FlipSignals /> 
      <DemandCreation />
      <CoreStrengths />
      <TrustedBrands />
      <Testimonials />
      <FAQ />
    </main>
  );
}
