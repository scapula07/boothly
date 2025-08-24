import Hero from "@/components/LandingPage/hero";
import Partnership from "@/components/LandingPage/partnership";
import Features from "@/components/LandingPage/features";
import { FeatureCardSection } from "@/components/LandingPage/featureCardsections";
import { AudienceSection } from "@/components/LandingPage/audienceSection";
import { PricingSection } from "@/components/LandingPage/PricingSection";
import VideoDemo from "@/components/LandingPage/videoDemo";
import { GallerySection } from "@/components/LandingPage/GallerySection";
import { StatsSection } from "@/components/LandingPage/StatsSection";
import Footer from "@/components/LandingPage/Footer";


 export default function Home() {
   return (
      <div className="w-full h-full">
          <Hero id="hero" />
          <Partnership id="partnership" />
          <Features id="features" />
          <FeatureCardSection id="feature-card-section" />
          <AudienceSection id="audience-section" />
          <PricingSection id="pricing-section" />
          <VideoDemo id="video-demo" />
          <GallerySection id="gallery-section" />
          <StatsSection id="stats-section" />
          <Footer id="footer" />
      </div>
   );
 }