import React, { useState } from 'react';
import { Copy, Check, Volume2, VolumeX } from 'lucide-react';
import { PORTFOLIO_DESCRIPTION_TEXT } from '../data/portfolioData';
import { engineAudio } from '../utils/audioSynthesizer';

interface HeaderProps {
  onCopySuccess: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCopySuccess }) => {
  const [copied, setCopied] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DESCRIPTION_TEXT);
      setCopied(true);
      onCopySuccess();
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const toggleAudio = () => {
    const nextState = !muted;
    setMuted(nextState);
    engineAudio.setMuted(nextState);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090B0E]/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="font-display text-lg font-bold tracking-wider text-white uppercase whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors">
          ASD Racing Hub
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <a href="#portfolio-text" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Portfolio Description
          </a>
          <a href="#fleet" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Iconic Fleet
          </a>
          <a href="#physics" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Chassis Physics
          </a>
          <a href="#environments" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Living Circuits
          </a>
          <a href="#investor" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Investor Brief
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleAudio}
            title={muted ? 'Enable Engine Sound' : 'Mute Engine Sound'}
            aria-label={muted ? 'Enable Engine Sound' : 'Mute Engine Sound'}
            className="p-2 text-neutral-400 hover:text-white transition-colors rounded-md hover:bg-neutral-800/60"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 text-xs font-semibold rounded-md flex items-center gap-2 transition-all whitespace-nowrap shrink-0 ${
              copied
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-amber-400 text-black hover:bg-amber-300 shadow-md shadow-amber-400/10'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Portfolio Text</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
