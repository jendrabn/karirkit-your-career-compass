import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSelector } from "@/components/FeatureSelector";
import { TrustedBySection } from "@/components/TrustedBySection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { StatsSection } from "@/components/StatsSection";
import { TemplateSliderSection } from "@/components/TemplateSliderSection";
import { CTASection } from "@/components/CTASection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { TipsSection } from "@/components/TipsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Header / Navbar */}
      <Navbar isLoggedIn={isLoggedIn} onLoginToggle={() => setIsLoggedIn(!isLoggedIn)} />

      <main>
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3 & 4. Feature Selector & Detail (Tabs) */}
        <FeatureSelector />

        {/* 5. Trusted By Section */}
        <TrustedBySection />

        {/* 6. Benefits Section */}
        <BenefitsSection />

        {/* 7. Stats Section */}
        <StatsSection />

        {/* 8. Template Slider Section */}
        <TemplateSliderSection />

        {/* 9. CTA Section */}
        <CTASection />

        {/* 8. Testimonials Section */}
        <TestimonialsSection />

        {/* 9. Tips Section */}
        <TipsSection />

        {/* 10. FAQ Section */}
        <FAQSection />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
};

export default Index;
