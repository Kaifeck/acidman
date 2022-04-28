export const audioContext: AudioContext = new window.AudioContext();
export const mainGainNode: GainNode = audioContext.createGain();
export const oscillator: OscillatorNode = audioContext.createOscillator();
export const filter: BiquadFilterNode = audioContext.createBiquadFilter();

const oscTypes: OscillatorType[] = ['sawtooth', 'square'];
let currentNote = 440;
let tune = 0;

//Simple Setups
const defaultGain = 0.06;
oscillator.type = 'sawtooth';
filter.type = "lowpass";

export const initOsc = () : void => {
  //TODO: set init stuff, like OscType, Base Gain/Filter/Accent Etc
  //Maybe also add 303 quirks

  //Init WebAudio stuff
  mainGainNode.gain.value = 0.00;
  oscillator.connect(filter);
  filter.connect(mainGainNode);
  mainGainNode.connect(audioContext.destination);
  //oscillator.start();
}

export function playNoteOsc(frequency: number) {
  //TODO: Check everything that is required for playing; Frequency, Accent, Slide, OctUp/OctDown, rhythm
  //if note running and no slide stop
  mainGainNode.gain.setValueAtTime(0, audioContext.currentTime);
  console.info(frequency);
  console.info('oscillator.ts');
  currentNote = frequency;
  oscillator.frequency.value = frequency + frequency * tune;
  mainGainNode.gain.value = defaultGain;

}

export const filterDelta = (filterVal: number) : void => {
  const max = audioContext.sampleRate / 2;
  const min = 80;
  const octaves = Math.log(max/min) / Math.LN2;
  const multiplier = Math.pow(2, octaves * (filterVal - 1.0))
  filter.frequency.value = max * multiplier;
}

export const volumeDelta = (volume: number) : void => {
  mainGainNode.gain.value = volume;
}

export const startOsc = () : void => {
  oscillator.start();
}

export const waveformDelta = (waveform: OscillatorType) : void => {
  oscillator.type = waveform;
}

export const changeTuning = (tuning: number) : void => {
  tune = tuning/12;
  oscillator.frequency.value = currentNote + currentNote * tune;
}

export const changeResonance = (resonance: number) : void => {
  filter.Q.value = resonance;
}

/* let oscillator : OscillatorNode = audioContext.createOscillator();
oscillator.type = 'square';
oscillator.connect(mainGainNode); */
