import { SoundEffect } from '../types';

class AudioService {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private audioContext: AudioContext | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    // Load voices
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }

  // Initialize Audio Context on first user interaction to allow playing sounds
  public initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public speak(text: string) {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    // Try to find a Turkish voice
    const trVoice = this.voices.find(v => v.lang.includes('tr'));
    if (trVoice) {
      utterance.voice = trVoice;
    }
    utterance.lang = 'tr-TR';
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.1; // Slightly higher/friendlier

    this.synth.speak(utterance);
  }

  public stopSpeaking() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }

  public playSound(effect: SoundEffect) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;

    switch (effect) {
      case SoundEffect.CLICK:
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, now);
        oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
        break;

      case SoundEffect.SUCCESS:
        oscillator.type = 'triangle';
        // Simple arpeggio
        oscillator.frequency.setValueAtTime(523.25, now); // C5
        oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
        oscillator.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.3);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        
        oscillator.start(now);
        oscillator.stop(now + 0.6);
        break;

      case SoundEffect.POP:
         oscillator.type = 'sine';
         oscillator.frequency.setValueAtTime(800, now);
         gainNode.gain.setValueAtTime(0.1, now);
         gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
         oscillator.start(now);
         oscillator.stop(now + 0.05);
         break;

      case SoundEffect.ERROR:
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.linearRampToValueAtTime(100, now + 0.2);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;
    }
  }
}

export const audioService = new AudioService();