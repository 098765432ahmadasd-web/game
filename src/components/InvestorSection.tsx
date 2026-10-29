import React, { useState } from 'react';
import { INVESTOR_METRICS } from '../data/portfolioData';
import { TrendingUp, Users, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export const InvestorSection: React.FC = () => {
  const [inquiryType, setInquiryType] = useState<'investor' | 'player' | 'studio'>('investor');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid business email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="investor" className="py-16 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wider uppercase mb-2">
              <span>Market Moat & Business Case</span>
              <span aria-hidden="true">·</span>
              <span>For Strategic Investors & Partners</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Why ASD Racing Hub Wins
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Capturing the lucrative white space between sterile hardcore simulators and shallow arcade drift titles.
            </p>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span>Market Segment:</span>
            <span className="font-mono text-white font-semibold">Enthusiast Sim-Cade & Live-Ops</span>
          </div>
        </div>

        {/* 4 Quantitative Investor Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {INVESTOR_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs text-neutral-400 block mb-2">{metric.label}</span>
                <span className="font-display text-3xl font-extrabold text-white tabular-nums block mb-2">
                  {metric.value}
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed pt-3 border-t border-neutral-800/80">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Strategic Pillars of Differentiation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-[#0C0F14] rounded-xl border border-neutral-800">
            <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">The Sim-Cade Sweet Spot</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Hardcore simulators scare off 80% of players with punishing setup curves. Arcade titles suffer steep 30-day drop-offs. ASD Racing Hub matches 360Hz physics with instant controller tactile accessibility, delivering massive addressable audience retention.
            </p>
          </div>

          <div className="p-6 bg-[#0C0F14] rounded-xl border border-neutral-800">
            <div className="w-10 h-10 rounded-lg bg-blue-400/10 text-blue-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">Paddock Syndicates & UGC Economy</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Driver clubs operate as sovereign syndicates: co-owning garages, competing for regional championship purses, and trading verified suspension tuning blueprints on a player-governed marketplace.
            </p>
          </div>

          <div className="p-6 bg-[#0C0F14] rounded-xl border border-neutral-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">Esports-Grade Netcode</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Sub-frame deterministic physics simulation eliminates vehicle ghosting, rubberbanding, and arbitration disputes, creating the gold standard for sponsored sim-racing tournaments and creator leagues.
            </p>
          </div>
        </div>

        {/* Lead Capture / Interactive Pitch Deck Request */}
        <div className="p-8 bg-neutral-900 rounded-xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              Join the ASD Racing Hub Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Request the full Executive Pitch Deck, Technical Architecture Whitepaper, or Closed Alpha Paddock Pass.
            </p>
          </div>

          <div className="w-full md:w-auto md:min-w-[360px]">
            {submitted ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-lg flex items-center gap-3 text-emerald-300 text-xs">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="font-semibold text-white">Inquiry Received</p>
                  <p>Our studio team will dispatch the pitch deck to {email} within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2 p-1 bg-black/40 rounded-lg border border-neutral-800">
                  {(['investor', 'player', 'studio'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInquiryType(type)}
                      className={`flex-1 py-1 text-[11px] font-medium rounded capitalize transition-colors ${
                        inquiryType === type
                          ? 'bg-amber-400 text-black font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {type === 'investor' ? 'Investor' : type === 'player' ? 'Alpha Driver' : 'Publisher'}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <span>Request Deck</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-red-400">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
