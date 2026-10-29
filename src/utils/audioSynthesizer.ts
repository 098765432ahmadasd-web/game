/**
 * Web Audio API synthesizer for realistic engine RPM sounds, turbo spool,
 * and exhaust pops without external audio dependencies.
 */

class EngineSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private activeOscillators: OscillatorNode[] = [];
  private filterNode: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private revInterval: number | null = null;
  private currentRpm: number = 1000;
  private maxRpm: number = 8500;
  private isRevving: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else if (!muted && this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startRev(soundType: 'v12' | 'inline6' | 'v6tt' | 'v8flat' | 'v8tt' = 'v12', onRpmUpdate?: (rpm: number) => void) {
    if (this.isRevving) return;
    this.initContext();
    if (!this.ctx) return;

    this.isRevving = true;
    this.stopEngine();

    const now = this.ctx.currentTime;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.28, now);
    this.masterGain.connect(this.ctx.destination);

    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(450, now);
    this.filterNode.Q.setValueAtTime(soundType === 'v12' ? 6 : 4, now);
    this.filterNode.connect(this.masterGain);

    // Multi-oscillator setup for rich engine harmonic overtones
    const baseFreqs = soundType === 'v12' 
      ? [65, 130, 260, 390] 
      : soundType === 'inline6' 
      ? [50, 100, 150, 300] 
      : soundType === 'v8flat'
      ? [55, 110, 220, 440]
      : [48, 96, 192, 288];

    this.activeOscillators = baseFreqs.map((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = idx === 0 ? 'sawtooth' : idx === 1 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      
      const oscGain = this.ctx!.createGain();
      oscGain.gain.setValueAtTime(0.5 / (idx + 1), now);
      
      osc.connect(oscGain);
      oscGain.connect(this.filterNode!);
      osc.start(now);
      return osc;
    });

    // RPM acceleration loop
    this.currentRpm = 1200;
    this.maxRpm = soundType === 'v12' ? 9500 : soundType === 'inline6' ? 7600 : 8200;

    const intervalTime = 30;
    this.revInterval = window.setInterval(() => {
      if (this.currentRpm < this.maxRpm) {
        this.currentRpm += 160;
        if (this.currentRpm > this.maxRpm) this.currentRpm = this.maxRpm;
      }

      const rpmRatio = this.currentRpm / 1000;
      const t = this.ctx ? this.ctx.currentTime : 0;

      if (this.filterNode && this.ctx) {
        this.filterNode.frequency.setTargetAtTime(350 + rpmRatio * 420, t, 0.05);
      }

      this.activeOscillators.forEach((osc, idx) => {
        if (this.ctx) {
          const mult = (idx + 1);
          const targetFreq = (soundType === 'v12' ? 18 : 14) * rpmRatio * mult;
          osc.frequency.setTargetAtTime(targetFreq, t, 0.05);
        }
      });

      if (onRpmUpdate) {
        onRpmUpdate(Math.round(this.currentRpm));
      }
    }, intervalTime);
  }

  public stopRev(onRpmUpdate?: (rpm: number) => void) {
    if (!this.isRevving) return;
    this.isRevving = false;

    if (this.revInterval) {
      clearInterval(this.revInterval);
      this.revInterval = null;
    }

    // Trigger turbo blowoff chuff / exhaust pop sound
    this.triggerTurboBlowoff();

    // Ramp down RPM
    const decInterval = window.setInterval(() => {
      this.currentRpm -= 240;
      if (this.currentRpm <= 1000) {
        this.currentRpm = 1000;
        clearInterval(decInterval);
        this.stopEngine();
      }
      if (onRpmUpdate) {
        onRpmUpdate(Math.round(this.currentRpm));
      }
    }, 30);
  }

  private triggerTurboBlowoff() {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      // White noise buffer for blowoff hiss
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2800, now);
      noiseFilter.Q.setValueAtTime(3.5, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start(now);
    } catch {
      // Audio fallback silent
    }
  }

  public stopEngine() {
    if (this.revInterval) {
      clearInterval(this.revInterval);
      this.revInterval = null;
    }
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Safe disconnect
      }
    });
    this.activeOscillators = [];
    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch {
        // Safe disconnect
      }
      this.masterGain = null;
    }
  }
}

export const engineAudio = new EngineSoundSynthesizer();
