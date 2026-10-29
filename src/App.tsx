import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PortfolioDescriptionSection } from './components/PortfolioDescriptionSection';
import { CarShowroom } from './components/CarShowroom';
import { PhysicsSection } from './components/PhysicsSection';
import { EnvironmentsSection } from './components/EnvironmentsSection';
import { InvestorSection } from './components/InvestorSection';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

export default function App() {
  const [showToast, setShowToast] = useState(false);

  const handleCopySuccess = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio-text');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFleet = () => {
    const el = document.getElementById('fleet');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Fixed Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-black px-4 py-2.5 rounded-lg shadow-xl shadow-emerald-500/20 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Portfolio Description Copied to Clipboard!</span>
        </div>
      )}

      {/* Header conforming to 3-zone Top Bar Contract */}
      <Header onCopySuccess={handleCopySuccess} />

      {/* Main Content Flow */}
      <main className="flex-1">
        <HeroSection
          onScrollToPortfolio={scrollToPortfolio}
          onScrollToFleet={scrollToFleet}
        />

        <PortfolioDescriptionSection onCopySuccess={handleCopySuccess} />

        <CarShowroom />

        <PhysicsSection />

        <EnvironmentsSection />

        <InvestorSection />
      </main>

      {/* Quiet, refined Footer */}
      <Footer />
    </div>
  );
}
