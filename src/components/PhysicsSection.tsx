import React, { useState } from 'react';
import { CORE_PILLARS } from '../data/portfolioData';
import { Activity, ShieldCheck, Gauge, Compass } from 'lucide-react';

type DrivingManeuver = 'neutral' | 'braking' | 'acceleration' | 'apex_right' | 'drift';

export const PhysicsSection: React.FC = () => {
  const [maneuver, setManeuver] = useState<DrivingManeuver>('apex_right');

  // Kinematic calculations for 4-wheel contact patches
  const getWheelLoads = () => {
    switch (maneuver) {
      case 'braking':
        return { fl: 36, fr: 36, rl: 14, rr: 14, pitch: 'Dive (-2.8°)', gLat: '0.00 G', gLong: '-1.45 G', slip: '4%' };
      case 'acceleration':
        return { fl: 16, fr: 16, rl: 34, rr: 34, pitch: 'Squat (+2.1°)', gLat: '0.00 G', gLong: '+1.18 G', slip: '9%' };
      case 'apex_right':
        return { fl: 42, fr: 12, rl: 36, rr: 10, pitch: 'Roll (+3.4° Left)', gLat: '1.62 G Lat', gLong: '-0.20 G', slip: '7%' };
      case 'drift':
        return { fl: 28, fr: 20, rl: 28, rr: 24, pitch: 'Yaw (+24.5° Counter)', gLat: '1.25 G Lat', gLong: '+0.45 G', slip: '31% (Oversteer)' };
      default:
        return { fl: 25, fr: 25, rl: 25, rr: 25, pitch: 'Level (0.0°)', gLat: '0.00 G', gLong: '0.00 G', slip: '0%' };
    }
  };

  const currentLoads = getWheelLoads();

  return (
    <section id="physics" className="py-16 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wider uppercase mb-2">
              <span>Simulation Integrity</span>
              <span aria-hidden="true">·</span>
              <span>Proprietary Physics Core</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              True-to-Life Chassis Kinematics
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Calculates dynamic contact patch deformation, suspension geometry anti-dive, and slip angle friction polar curves at 360Hz.
            </p>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span>Sub-cycle Rate:</span>
            <span className="font-mono text-emerald-400 font-semibold">360 updates / second</span>
          </div>
        </div>

        {/* 2-Column Split: Interactive Chassis Load Sandbox + Core Engineering Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Left: Weight Transfer & 4-Wheel Contact Patch Simulator (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#0C0F14] rounded-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800/80">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dynamic Weight Transfer Rig</span>
                </h3>
                <span className="text-[11px] font-mono text-neutral-400">Live Telemetry Mode</span>
              </div>

              {/* Maneuver Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {[
                  { id: 'braking', label: 'Hard Braking' },
                  { id: 'acceleration', label: 'Full Throttle' },
                  { id: 'apex_right', label: 'Apex Turn-in' },
                  { id: 'drift', label: 'Angle Drift' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setManeuver(m.id as DrivingManeuver)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all text-center whitespace-nowrap ${
                      maneuver === m.id
                        ? 'bg-amber-400 text-black border-amber-400 font-semibold shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Chassis Diagram Container */}
              <div className="relative py-6 px-4 bg-neutral-950/70 rounded-xl border border-neutral-800/80 mb-6 flex flex-col items-center">
                {/* Visual Chassis Outline */}
                <div className="w-48 h-64 border-2 border-dashed border-neutral-700/60 rounded-3xl relative flex flex-col justify-between p-3">
                  <div className="text-[10px] font-mono text-neutral-400 text-center tracking-widest uppercase">
                    FRONT AXLE
                  </div>

                  {/* 4 Wheels with Dynamic Load Heights & Colors */}
                  {/* Front-Left */}
                  <div className="absolute -left-5 top-4 w-9 h-14 bg-neutral-900 rounded border border-neutral-600 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-mono text-neutral-400">FL</span>
                    <span className="text-[11px] font-mono font-bold text-amber-400 tabular-nums">
                      {currentLoads.fl}%
                    </span>
                  </div>

                  {/* Front-Right */}
                  <div className="absolute -right-5 top-4 w-9 h-14 bg-neutral-900 rounded border border-neutral-600 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-mono text-neutral-400">FR</span>
                    <span className="text-[11px] font-mono font-bold text-amber-400 tabular-nums">
                      {currentLoads.fr}%
                    </span>
                  </div>

                  {/* Center CG point */}
                  <div className="self-center p-2 rounded-full bg-neutral-900 border border-amber-400/50 flex flex-col items-center text-center">
                    <span className="text-[8px] font-mono text-amber-400 uppercase">CG Center</span>
                    <span className="text-[10px] font-mono text-white tabular-nums">{currentLoads.gLat}</span>
                  </div>

                  {/* Rear-Left */}
                  <div className="absolute -left-5 bottom-4 w-9 h-14 bg-neutral-900 rounded border border-neutral-600 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-mono text-neutral-400">RL</span>
                    <span className="text-[11px] font-mono font-bold text-amber-400 tabular-nums">
                      {currentLoads.rl}%
                    </span>
                  </div>

                  {/* Rear-Right */}
                  <div className="absolute -right-5 bottom-4 w-9 h-14 bg-neutral-900 rounded border border-neutral-600 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-mono text-neutral-400">RR</span>
                    <span className="text-[11px] font-mono font-bold text-amber-400 tabular-nums">
                      {currentLoads.rr}%
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-400 text-center tracking-widest uppercase">
                    REAR AXLE
                  </div>
                </div>
              </div>

              {/* Real-time Telemetry Readout */}
              <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Chassis Pitch</span>
                  <span className="text-white font-semibold">{currentLoads.pitch}</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Longitudinal G</span>
                  <span className="text-white font-semibold">{currentLoads.gLong}</span>
                </div>
                <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Tire Slip Ratio</span>
                  <span className="text-amber-400 font-semibold">{currentLoads.slip}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 mt-4">
              Unlike arcade games with canned drift scripts, every slide in ASD Racing Hub is resolved from real slip-angle force vectors and differential ramp lock.
            </p>
          </div>

          {/* Right: Core Engineering Pillars Bento Grid (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {pillar.subtitle}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-300 tabular-nums bg-neutral-800 px-2 py-0.5 rounded">
                    {pillar.metric}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1.5">{pillar.title}</h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                  {pillar.description}
                </p>
                <span className="text-[11px] text-neutral-400 font-mono">
                  {pillar.metricLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
