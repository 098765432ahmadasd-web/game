import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#06080B] border-t border-neutral-800/80 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-display text-sm font-bold tracking-wider text-white uppercase">
            ASD Racing Hub
          </span>
          <p className="text-[11px] text-neutral-400 mt-1">
            Motorsport game design portfolio showcase · Engineered for purists and investors.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-neutral-400">
          <a href="#portfolio-text" className="hover:text-white transition-colors">Portfolio Copy</a>
          <a href="#fleet" className="hover:text-white transition-colors">Car Roster</a>
          <a href="#physics" className="hover:text-white transition-colors">Physics Engine</a>
          <a href="#investor" className="hover:text-white transition-colors">Investor Thesis</a>
        </div>

        <div className="text-[11px] text-neutral-400 font-mono">
          © {new Date().getFullYear()} ASD Racing Hub. All trademarks belong to their respective automotive manufacturers.
        </div>
      </div>
    </footer>
  );
};
