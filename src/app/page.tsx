import { Hero } from "@/components/Hero";
import { MantleCore } from "@/components/MantleCore";
import { WhySection } from "@/components/WhySection";
import { RequestFlow } from "@/components/RequestFlow";
import { GatewayFloor } from "@/components/GatewayFloor";
import { RouterFloor } from "@/components/RouterFloor";
import { SchedulerFloor } from "@/components/SchedulerFloor";
import { GpuAgentFloor } from "@/components/GpuAgentFloor";
import { MantleFloor } from "@/components/MantleFloor";
import { DeployGrid } from "@/components/DeployGrid";
import { ParityMatrix } from "@/components/ParityMatrix";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <MantleCore />
      <WhySection />
      <RequestFlow />
      <GatewayFloor />
      <RouterFloor />
      <SchedulerFloor />
      <GpuAgentFloor />
      <MantleFloor />
      <DeployGrid />
      <ParityMatrix />
      <FaqSection />
      <Footer />
    </>
  );
}
