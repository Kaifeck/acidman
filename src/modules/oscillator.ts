export const audioContext: AudioContext = new window.AudioContext();
export const mainGainNode: GainNode = audioContext.createGain();

const oscTypes: OscillatorType[] = ['sawtooth', 'square'];
mainGainNode.connect(audioContext.destination);
mainGainNode.gain.value = 0.03;

export const filter = audioContext.createBiquadFilter();
filter.type = "lowpass";



/* let oscillator : OscillatorNode = audioContext.createOscillator();
oscillator.type = 'square';
oscillator.connect(mainGainNode); */