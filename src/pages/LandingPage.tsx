import Hero from "../components/landing/Hero";
import TrustBar from "../components/landing/TrustBar";
import WhyStudents from "../components/landing/WhyStudents";
import HowItWorks from "../components/landing/HowItWorks";
import PresetsShowcase from "../components/landing/PresetsShowcase";
import ToolsGrid from "../components/landing/ToolsGrid";
import Features from "../components/landing/Features";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyStudents />
      <HowItWorks />
      <PresetsShowcase />
      <ToolsGrid />
      <Features />
    </>
  );
}
