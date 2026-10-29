import React, { useState } from 'react';
import { CloudRain, Sun, Moon, Wind, MapPin } from 'lucide-react';

interface EnvironmentData {
  id: string;
  name: string;
  location: string;
  type: string;
  length: string;
  turns: number;
  highlight: string;
  surfaceFriction: number;
  weatherEffects: string;
  image: string;
}

const ENVIRONMENTS: EnvironmentData[] = [
  {
    id: 'tokyo',
    name: 'Tokyo C1 Shuto Loop',
    location: 'Tokyo, Japan',
    type: 'Urban Highway & Tunnel Circuit',
    length: '14.2 km',
    turns: 18,
    highlight: 'Blind concrete expansion joints and rain-slicked camber transitions under elevated highway viaducts.',
    surfaceFriction: 0.88,
    weatherEffects: 'Standing water ruts induce hydroplaning at >160 km/h; neon wet reflections test driver vision.',
    image: '/src/assets/images/hero_racing_grid_1793266886223.jpg',
  },
  {
    id: 'stelvio',
    name: 'Stelvio Alpine Pass',
    location: 'Italian Alps',
    type: 'High-Altitude Mountain Switchback',
    length: '21.5 km',
    turns: 48,
    highlight: 'Brutal hairpin switchbacks with 1,800m elevation descent punishing brake thermal capacity.',
    surfaceFriction: 0.82,
    weatherEffects: 'Cold mountain asphalt reduces initial compound bite; turbo engines lose 4% atmospheric barometric pressure.',
    image: '/src/assets/images/car_lamborghini_track_1793266885722.jpg',
  },
  {
    id: 'mojave',
    name: 'Mojave Thermal Ribbon',
    location: 'California, USA',
    type: 'High-Speed Desert Endurance',
    length: '9.8 km',
    turns: 12,
    highlight: 'Endless high-speed straights demanding low-drag aero configurations and slipstream drafting.',
    surfaceFriction: 0.94,
    weatherEffects: '54°C surface temperatures accelerate soft compound blistering; intense heat shimmer distorts braking cues.',
    image: '/src/assets/images/car_supra_garage_1793266884780.jpg',
  },
];

export const EnvironmentsSection: React.FC = () => {
  const [selectedEnv, setSelectedEnv] = useState<EnvironmentData>(ENVIRONMENTS[0]);
  const [weatherCondition, setWeatherCondition] = useState<'rain' | 'clear' | 'night'>('rain');

  // Dynamic grip calculation based on environment + weather
  const effectiveGrip = (
    selectedEnv.surfaceFriction *
    (weatherCondition === 'rain' ? 0.78 : weatherCondition === 'night' ? 0.92 : 1.0)
  ).toFixed(2);

  const tireTemp =
    weatherCondition === 'rain' ? '68°C (Cool)' : weatherCondition === 'night' ? '78°C (Optimal)' : '104°C (Thermal Risk)';

  return (
    <section id="environments" className="py-16 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wider uppercase mb-2">
              <span>Dynamic Tracks</span>
              <span aria-hidden="true">·</span>
              <span>Diverse Racing Environments</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Living Circuits & Micro-Climates
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              From neon-drenched Tokyo expressways to alpine switchbacks, track temperatures and rubber accumulation shift grip dynamically.
            </p>
          </div>

          {/* Weather condition buttons */}
          <div className="flex items-center gap-2 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
            <button
              onClick={() => setWeatherCondition('rain')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                weatherCondition === 'rain'
                  ? 'bg-neutral-800 text-blue-400 font-semibold shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Rain Slick</span>
            </button>
            <button
              onClick={() => setWeatherCondition('night')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                weatherCondition === 'night'
                  ? 'bg-neutral-800 text-purple-400 font-semibold shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Midnight</span>
            </button>
            <button
              onClick={() => setWeatherCondition('clear')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                weatherCondition === 'clear'
                  ? 'bg-neutral-800 text-amber-400 font-semibold shadow-sm border border-neutral-700'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>High Sun</span>
            </button>
          </div>
        </div>

        {/* 3 Environment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {ENVIRONMENTS.map((env) => {
            const isSelected = env.id === selectedEnv.id;
            return (
              <div
                key={env.id}
                onClick={() => setSelectedEnv(env)}
                className={`rounded-xl border p-6 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-neutral-900/90 border-amber-400/80 shadow-lg shadow-amber-400/5'
                    : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{env.location}</span>
                    </span>
                    <span className="font-mono text-white tabular-nums">{env.length}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-1.5">{env.name}</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">{env.type}</p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Hairpins & Chicanes</span>
                    <span className="text-white font-mono tabular-nums">{env.turns} Corners</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Baseline Friction (μ)</span>
                    <span className="text-amber-400 font-mono tabular-nums">{env.surfaceFriction} μ</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Selected Environment Inspection Box */}
        <div className="p-6 sm:p-8 bg-[#0D1117] rounded-xl border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>ACTIVE TELEMETRY SENSORS</span>
              <span aria-hidden="true">·</span>
              <span className="text-white">{selectedEnv.name}</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              {selectedEnv.highlight}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {selectedEnv.weatherEffects}
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Dynamic Grip Index</span>
                <span className="text-base font-bold text-amber-400 tabular-nums">{effectiveGrip} μ</span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Tire Operating Temp</span>
                <span className="text-base font-bold text-white tabular-nums">{tireTemp}</span>
              </div>
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Asphalt Condition</span>
                <span className="text-base font-bold text-blue-400 uppercase">
                  {weatherCondition === 'rain' ? 'Standing Water' : weatherCondition === 'night' ? 'Cold Asphalt' : 'High Heat'}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-neutral-800 h-56 group">
            <img
              src={selectedEnv.image}
              alt={selectedEnv.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-xs font-mono text-white">
              {selectedEnv.name} · Live Circuit Feed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
