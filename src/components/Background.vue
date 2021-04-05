<template>
<div class="container" @mousemove="mouseDrag" @mouseup="mouseUpPass">
    <img src="../assets/TB-303.jpg">
    <template v-for="(value, name) in noteFreq" :value="freq" :key="name">
      <button @mousedown="playNote(value)">{{name}}</button>
    </template>
    <button @click="mute">Mute</button>
    <button @click="unmute">Unmute</button>
    <input type="range" v-model="volume" min="0" max="1" step="0.01" @input="volumeDelta"/>
    <Knob :max="1" :min="0" ref="childKnob"/>
</div>
</template>

<script lang="ts">
import { Component, defineComponent } from 'vue';
import { notes303 } from '../static/notes';
import Knob from './Knob.vue'; 

let audioContext: AudioContext = new window.AudioContext();
let mainGainNode: GainNode = audioContext.createGain();

let oscTypes: OscillatorType[] = ['sawtooth', 'square'];
mainGainNode.connect(audioContext.destination);
mainGainNode.gain.value = 0.03;

/* let oscillator : OscillatorNode = audioContext.createOscillator();
oscillator.type = 'square';
oscillator.connect(mainGainNode); */


export default defineComponent({
  name: 'Background',
  components: {
    Knob
  },
  data() {
    return {
      //notes: [] as Note[],
      noteFreq : notes303[0],
      chosenOsc: 'sawtooth' as OscillatorType,
      osci: audioContext.createOscillator() as OscillatorNode,
      running: false as boolean,
      volume: mainGainNode.gain.value
    }
  },
  beforeMount() {
    console.dir(this.noteFreq);
  },
  methods: {
    playNote(freq: number) {
      if(this.running){
        this.osci.stop();
      }
      mainGainNode.gain.value = this.volume;
      this.osci = audioContext.createOscillator();
      this.osci.type = this.chosenOsc;
      this.osci.connect(mainGainNode);
      this.osci.frequency.value = freq;
      this.osci.start();
      this.running = true;
    },
    playSlide(){
      //oscillator.frequency.linearRampToValueAtTime(oscillator.frequency.value*2, audioContext.currentTime + 0.2);
    },
    mute(){
      mainGainNode.gain.value = 0;
    },
    unmute(){
      mainGainNode.gain.value = 0.03;
    },
    volumeDelta(){
      mainGainNode.gain.value = this.volume;
    },
    mouseDrag(event: MouseEvent){
      this.$refs.childKnob.mouseDrag(event.pageY);
    },
    mouseUpPass(event: MouseEvent){
      this.$refs.childKnob.endDrag();
    } 
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: relative;
  width: 100%;
}
img{
  width: 100%;
}
</style>
