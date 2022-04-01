<template>
<div class="container" @mousemove="mouseDrag" @mouseup="mouseUpPass">
<!--    <img src="../assets/TB-303.jpg">-->
  <sequencer :play-note="playNote"></sequencer>
    <button @click="mute">Mute</button>
    <button @click="unmute">Unmute</button>
    <div>
      <label>Filter</label>
      <input type="range" v-model="filter" min="0" max="1" step="0.01" @input="filterDelta"/>
    </div>
<!--    <Knob :max="1" :min="0" ref="childKnob" :changeVol="volumeDelta"/>-->
</div>
</template>

<script lang="ts">
import { Component, defineComponent } from 'vue';
import { notes303 } from '../static/notes';
import { audioContext, mainGainNode, filter} from '../modules/oscillator'
import Knob from './Knob.vue';
import Sequencer from './Sequencer.vue';

export default defineComponent({
  name: 'Background',
  components: {
    Sequencer,
    /*Knob*/
  },
  data() {
    return {
      //notes: [] as Note[],
      noteFreq : notes303[0],
      chosenOsc: 'sawtooth' as OscillatorType,
      osci: audioContext.createOscillator() as OscillatorNode,
      running: false as boolean,
      volume: mainGainNode.gain.value,
      filter: 1000,
    }
  },
  beforeMount() {
    //console.dir(this.noteFreq);
  },
  methods: {
    playNote(freq: number) {
      console.info(freq);
      if(this.running){
        this.osci.stop();
      }
      mainGainNode.gain.value = this.volume;
      this.osci = audioContext.createOscillator();
      this.osci.type = this.chosenOsc;
      this.osci.connect(filter);
      this.osci.frequency.value = freq;
      this.osci.start();
      filter.connect(mainGainNode);
      //filter.frequency.value = 1000;

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
    volumeDelta(volume: number){
      this.volume = volume;
      mainGainNode.gain.value = this.volume;
    },
    filterDelta(){
      let max = audioContext.sampleRate / 2;
      let min = 40;
      let octaves = Math.log(max/min) / Math.LN2;
      let multiplier = Math.pow(2, octaves * (this.filter - 1.0))
      filter.frequency.value = max * multiplier;
    },
/*    mouseDrag(event: MouseEvent){
      (this.$refs.childKnob as any).mouseDrag(event.pageY);
    },
    mouseUpPass(){
      (this.$refs.childKnob as any).endDrag();
    }*/
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
