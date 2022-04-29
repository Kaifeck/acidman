export default class Oscillator {

  audioContext: AudioContext;
  mainGainNode: GainNode;
  oscillator: OscillatorNode;
  filter: BiquadFilterNode;
  oscTypes: OscillatorType[] = ['sawtooth', 'square'];
  vcaEnvelope = new Envelope();
  filterEnvelope = new Envelope();
  currentNote = 440;
  tune = 0.0;
  defaultGain = 0.06;

  constructor() {
    this.audioContext = new window.AudioContext();
    this.mainGainNode = this.audioContext.createGain();
    this.oscillator = this.audioContext.createOscillator();
    this.filter = this.audioContext.createBiquadFilter();

    this.oscillator.type = 'sawtooth';
    this.filter.type = 'lowpass';
  }

  initOsc() : void {
    //TODO: set init stuff, like OscType, Base Gain/Filter/Accent Etc
    //Maybe also add 303 quirks

    //Init WebAudio stuff
    this.mainGainNode.gain.value = 0.00;
    this.oscillator.connect(this.filter);
    this.filter.connect(this.mainGainNode);
    this.mainGainNode.connect(this.audioContext.destination);
    //oscillator.start();
  }

  startOsc() : void {
    this.oscillator.start();
  }

  playNoteOsc(frequency: number) : void {
    //TODO: Check everything that is required for playing; Frequency, Accent, Slide, OctUp/OctDown, rhythm
    //if note running and no slide stop
    this.mainGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    console.info(frequency);
    console.info('oscillator.ts');
    this.currentNote = frequency;
    this.oscillator.frequency.value = frequency + frequency * this.tune;
    this.mainGainNode.gain.value = this.defaultGain;
  }

  setTuning (tuning: number) : void {
    this.tune = tuning/12;
    this.oscillator.frequency.value = this.currentNote + this.currentNote * this.tune;
  }

  setFilter (filterVal: number) : void {
    const max = this.audioContext.sampleRate / 2;
    const min = 80;
    const octaves = Math.log(max/min) / Math.LN2;
    const multiplier = Math.pow(2, octaves * (filterVal - 1.0))
    this.filter.frequency.value = max * multiplier;
  }

  setVolume (volume: number) : void {
    this.mainGainNode.gain.value = volume;
  }

  setWaveForm (waveform: OscillatorType) : void  {
    this.oscillator.type = waveform;
  }

  setResonance (resonance: number) : void {
    this.filter.Q.value = resonance;
  }


}

class Envelope {

  private attack: number;
  private decay: number;
  private sustain: number;
  private release: number;

  constructor(attack = 0.1, decay = 0, sustain = 0, release = 0.1) {
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
  }
}

/**
 * Todo: Create envelopes
 * 1. Volume/Amp Envelope - fixed
 * 2. Main Envelope
 * "Env Mod" knob is connected to the filter - Controls Intensity of filter
 * "Decay" is also connected to the filter - Controls time (D - Time)
 *
 */


/* let oscillator : OscillatorNode = audioContext.createOscillator();
oscillator.type = 'square';
oscillator.connect(mainGainNode); */
