import React, { useState } from 'react';
import { CAR_MODELS, CarModel } from '../data/portfolioData';
import { engineAudio } from '../utils/audioSynthesizer';
import { Sliders, Zap, Volume2, RotateCcw } from 'lucide-react';

export const CarShowroom: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<CarModel>(CAR_MODELS[0]);
  const [currentRpm, setCurrentRpm] = useState<number>(1000);
  const [isRevving, setIsRevving] = useState<boolean>(false);

  // Tuning state
  const [camber, setCamber] = useState<number>(selectedCar.tuningDefaults.camber);
  const [downforce, setDownforce] = useState<number>(selectedCar.tuningDefaults.downforce);
  const [gearRatio, setGearRatio] = useState<number>(selectedCar.tuningDefaults.gearRatio);
  const [tireCompound, setTireCompound] = useState<'Soft Slick' | 'Medium Compound' | 'Rain Tread'>(
    selectedCar.tuningDefaults.tireCompound
  );

  const handleSelectCar = (car: CarModel) => {
    setSelectedCar(car);
    setCamber(car.tuningDefaults.camber);
    setDownforce(car.tuningDefaults.downforce);
    setGearRatio(car.tuningDefaults.gearRatio);
    setTireCompound(car.tuningDefaults.tireCompound);
    if (isRevving) {
      engineAudio.stopRev();
      setIsRevving(false);
      setCurrentRpm(1000);
    }
  };

  const handleStartRev = () => {
    setIsRevving(true);
    engineAudio.startRev(selectedCar.soundType, (rpm) => {
      setCurrentRpm(rpm);
    });
  };

  const handleStopRev = () => {
    setIsRevving(false);
    engineAudio.stopRev((rpm) => {
      setCurrentRpm(rpm);
    });
  };

  // Calculated dynamic telemetry based on tuning
  const calculatedLateralG = (
    1.15 +
    Math.abs(camber) * 0.08 +
    (downforce / 100) * 0.25 +
    (tireCompound === 'Soft Slick' ? 0.15 : tireCompound === 'Rain Tread' ? -0.1 : 0)
  ).toFixed(2);

  const calculatedZeroToSixty = Math.max(
    2.1,
    Number(
      (
        selectedCar.zeroToSixty -
        (gearRatio - 3.4) * 0.15 -
        (tireCompound === 'Soft Slick' ? 0.12 : 0)
      ).toFixed(2)
    )
  );

  const calculatedTopSpeed = Math.round(
    selectedCar.topSpeed - (downforce - 50) * 0.12 + (3.7 - gearRatio) * 6
  );

  const maxRpmScale = selectedCar.soundType === 'v12' ? 9500 : selectedCar.soundType === 'inline6' ? 7800 : 8500;
  const rpmPercent = Math.min(100, Math.round(((currentRpm - 1000) / (maxRpmScale - 1000)) * 100));

  return (
    <section id="fleet" className="py-16 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wider uppercase mb-2">
              <span>Motorsport Royalty</span>
              <span aria-hidden="true">·</span>
              <span>The 6 Iconic Roster Flagships</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Iconic Supercar Paddock
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Each chassis possesses distinct inertia, weight transfer kinetics, acoustic signatures, and mechanical tuning boundaries.
            </p>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-2 font-mono">
            <span>Selected Chassis:</span>
            <span className="text-white font-semibold">{selectedCar.name}</span>
          </div>
        </div>

        {/* Car Selection Tabs (Single-line interactive segmented control) */}
        <div className="flex items-center gap-2 p-1.5 bg-neutral-900 rounded-xl border border-neutral-800 mb-8 overflow-x-auto">
          {CAR_MODELS.map((car) => {
            const isSelected = car.id === selectedCar.id;
            return (
              <button
                key={car.id}
                onClick={() => handleSelectCar(car)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-neutral-800 text-white shadow-md border border-neutral-700/80'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: car.accentColor }}
                />
                <span>{car.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Main Car Showcase Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Asset & Interactive Sound Rev Unit (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Visual Container */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-[#0C0F14] h-[340px] sm:h-[400px] group">
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E] via-transparent to-black/30 pointer-events-none" />

              {/* Top overlay badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-neutral-300 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-md border border-neutral-800">
                <span>{selectedCar.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-amber-400">{selectedCar.drivetrain}</span>
              </div>

              {/* Bottom Quote Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#090B0E]/85 backdrop-blur-md border border-neutral-800/80">
                <p className="text-xs sm:text-sm font-medium text-neutral-200 italic">
                  "{selectedCar.quote}"
                </p>
              </div>
            </div>

            {/* Interactive Audio Rev Pedal & RPM Barometer */}
            <div className="p-6 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                      Interactive Throttle & Acoustic Engine
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Press & hold to rev {selectedCar.badge}'s engine. Release for wastegate flutter.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onMouseDown={handleStartRev}
                    onMouseUp={handleStopRev}
                    onMouseLeave={handleStopRev}
                    onTouchStart={handleStartRev}
                    onTouchEnd={handleStopRev}
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 select-none shadow-md ${
                      isRevving
                        ? 'bg-red-500 text-white shadow-red-500/30 scale-95'
                        : 'bg-amber-400 text-black hover:bg-amber-300 shadow-amber-400/20'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isRevving ? 'Throttle Wide Open!' : 'Hold To Rev Throttle'}</span>
                  </button>
                </div>
              </div>

              {/* RPM Gauge Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">TACHOMETER</span>
                  <span className={`font-bold tabular-nums ${currentRpm > 6800 ? 'text-red-400' : 'text-amber-400'}`}>
                    {currentRpm.toLocaleString()} RPM / {maxRpmScale.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800">
                  <div
                    className={`h-full rounded-full transition-all duration-75 ${
                      rpmPercent > 82
                        ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500'
                        : 'bg-gradient-to-r from-neutral-600 via-amber-500 to-amber-400'
                    }`}
                    style={{ width: `${Math.max(8, rpmPercent)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-400 pt-1">
                  <span>1,000 IDLE</span>
                  <span>4,000 BOOST</span>
                  <span>7,000 CAM</span>
                  <span className="text-red-400">REDLINE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Telemetry Specs & Interactive Tuning Bay (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Dynamic Telemetry Specs */}
            <div className="p-6 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800/80">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Real-Time Chassis Telemetry</span>
                </h3>
                <span className="text-[11px] font-mono text-neutral-400">360Hz solver</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] uppercase text-neutral-400 block">0-60 MPH</span>
                  <span className="text-lg font-bold font-mono text-white tabular-nums">
                    {calculatedZeroToSixty}s
                  </span>
                  <span className="text-[10px] text-neutral-400 block">Traction limited</span>
                </div>
                <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] uppercase text-neutral-400 block">Top Speed</span>
                  <span className="text-lg font-bold font-mono text-white tabular-nums">
                    {calculatedTopSpeed} MPH
                  </span>
                  <span className="text-[10px] text-neutral-400 block">Aero drag limited</span>
                </div>
                <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] uppercase text-neutral-400 block">Cornering G</span>
                  <span className="text-lg font-bold font-mono text-emerald-400 tabular-nums">
                    {calculatedLateralG} G
                  </span>
                  <span className="text-[10px] text-neutral-400 block">Skidpad grip</span>
                </div>
              </div>

              {/* Core Engine Specs */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-neutral-800/50">
                  <span className="text-neutral-400">Powerplant</span>
                  <span className="text-neutral-200 font-mono text-right">{selectedCar.engine}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800/50">
                  <span className="text-neutral-400">Peak Output</span>
                  <span className="text-neutral-200 font-mono tabular-nums">{selectedCar.horsepower} HP / {selectedCar.torque}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800/50">
                  <span className="text-neutral-400">Curb Weight</span>
                  <span className="text-neutral-200 font-mono">{selectedCar.curbWeight}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400">Drivetrain</span>
                  <span className="text-neutral-200 font-mono">{selectedCar.drivetrain}</span>
                </div>
              </div>
            </div>

            {/* Interactive Workshop Calibration (Tuning Bay) */}
            <div className="p-6 bg-neutral-900/60 rounded-xl border border-neutral-800 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800/80">
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Paddock Workshop Calibration
                  </h3>
                  <button
                    onClick={() => {
                      setCamber(selectedCar.tuningDefaults.camber);
                      setDownforce(selectedCar.tuningDefaults.downforce);
                      setGearRatio(selectedCar.tuningDefaults.gearRatio);
                      setTireCompound(selectedCar.tuningDefaults.tireCompound);
                    }}
                    className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Setup</span>
                  </button>
                </div>

                {/* Slider 1: Camber */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300">Front Camber Angle</span>
                    <span className="font-mono text-amber-400 tabular-nums">{camber.toFixed(1)}°</span>
                  </div>
                  <input
                    type="range"
                    min="-4.5"
                    max="-1.0"
                    step="0.1"
                    value={camber}
                    onChange={(e) => setCamber(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>-1.0° Straight line speed</span>
                    <span>-4.5° Aggressive corner bite</span>
                  </div>
                </div>

                {/* Slider 2: Downforce */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300">Aero Wing Downforce</span>
                    <span className="font-mono text-amber-400 tabular-nums">{downforce}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={downforce}
                    onChange={(e) => setDownforce(parseInt(e.target.value))}
                    className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>20% Low Drag</span>
                    <span>100% Maximum Apex Load</span>
                  </div>
                </div>

                {/* Slider 3: Gear Ratio */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-300">Final Drive Ratio</span>
                    <span className="font-mono text-amber-400 tabular-nums">{gearRatio.toFixed(2)}:1</span>
                  </div>
                  <input
                    type="range"
                    min="2.80"
                    max="4.20"
                    step="0.05"
                    value={gearRatio}
                    onChange={(e) => setGearRatio(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>2.80 Tall Top Speed</span>
                    <span>4.20 Short Acceleration</span>
                  </div>
                </div>

                {/* Compound Selection */}
                <div>
                  <span className="text-xs text-neutral-300 block mb-1.5">Tire Compound</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Soft Slick', 'Medium Compound', 'Rain Tread'] as const).map((compound) => (
                      <button
                        key={compound}
                        onClick={() => setTireCompound(compound)}
                        className={`py-1.5 px-2 text-[11px] font-medium rounded-md border transition-all text-center whitespace-nowrap truncate ${
                          tireCompound === compound
                            ? 'bg-amber-400 text-black border-amber-400 font-semibold shadow-sm'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                        }`}
                      >
                        {compound}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                <p>
                  Telemetry calculations reflect real tire contact patch kinematics and aerodynamic drag polar curves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
