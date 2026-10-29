import React from 'react';
import { ArrowDownRight, Gauge, Layers, Trophy, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToPortfolio: () => void;
  onScrollToFleet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToPortfolio,
  onScrollToFleet,
}) => {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wider uppercase mb-3">
              <span>Game Design Portfolio Showcase</span>
              <span aria-hidden="true">·</span>
              <span>ASD Racing Hub</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.08] mb-6 text-balance">
              True Mechanical Drama at 360Hz.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              A high-octane racing title crafted at the intersection of authentic automotive obsession and next-generation competitive play. Engineered to captivate both discerning sim-cade gamers and strategic venture investors.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToPortfolio}
                className="px-5 py-3 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-lg shadow-amber-400/10 flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Read Portfolio Description</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToFleet}
                className="px-5 py-3 text-sm font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-md transition-all whitespace-nowrap shrink-0"
              >
                Explore 6 Iconic Supercars
              </button>
            </div>

            {/* Micro proof line */}
            <div className="mt-8 flex items-center gap-3 text-xs text-neutral-400">
              <span className="text-neutral-300 font-medium">Core Highlights:</span>
              <span>Supra · GTR · Lamborghini · BMW · Mercedes-Benz · McLaren</span>
            </div>
          </div>

          {/* Right Column: Hero Photographic Asset */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-neutral-800 min-h-[380px] lg:min-h-[460px] group">
            <img
              src="/src/assets/images/hero_racing_grid_1793266886223.jpg"
              alt="ASD Racing Hub Start Grid at Twilight with McLaren and Nissan GT-R under stadium lights"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Measured Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-transparent to-black/30 pointer-events-none" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#090B0E]/80 backdrop-blur-md border border-neutral-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">Circuit Silverstone Grand Prix Start Grid</p>
                <p className="text-[11px] text-neutral-400">Rain-Slicked Asphalt · Dynamic Ambient Reflection Mesh</p>
              </div>
              <span className="text-xs font-mono font-medium text-amber-400 tabular-nums">
                360 FPS Physics Sub-tick
              </span>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip in Full-Width Row Below Hero Split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-neutral-900/50 rounded-xl border border-neutral-800">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Portfolio Length</span>
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              332 Words
            </span>
            <span className="text-xs text-neutral-400 mt-1">
              Optimal 200–400 word brief
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Iconic Marques</span>
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              6 Flagships
            </span>
            <span className="text-xs text-neutral-400 mt-1">
              Supra to McLaren P1
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 flex items-center gap-1.5 mb-1">
              <Gauge className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chassis Kinematics</span>
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              360 Hz
            </span>
            <span className="text-xs text-neutral-400 mt-1">
              Real-time tire slip solver
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-neutral-400 flex items-center gap-1.5 mb-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Market Opportunity</span>
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
              $22.4B TAM
            </span>
            <span className="text-xs text-neutral-400 mt-1">
              Global racing simulation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
