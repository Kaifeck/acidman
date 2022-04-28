<template>
  <div class="container" @mousemove="mouseDrag" @mouseup="mouseUpPass" @click.once="oninteraction">
    <!--    <img src="../assets/TB-303.jpg">-->
    <!--  <oscilloscope :audio-source="osci" :audio-ctx="audioCtxDos"></oscilloscope>-->
    <sequencer :play-note="playNote"></sequencer>
    <button @click="mute">Mute</button>
    <button @click="unmute">Unmute</button>
    <div>
      <label>Filter</label>
      <input type="range" v-model="filter" min="0" max="1" step="0.01" @input="filterDelta"/>
    </div>
    <div>
      <label>Waveform</label>
      <input type="radio" v-model="waveform" value="square" @input="oscShapeDelta"/>
      <input type="radio" v-model="waveform" value="sawtooth" @input="oscShapeDelta"/>
    </div>
    <!--    <Knob :max="1" :min="0" ref="childKnob" :changeVol="volumeDelta"/>-->
  </div>
</template>

<script lang="ts">
import {Component, defineComponent} from 'vue';
import {notes303} from '../static/notes';
import {
  playNoteOsc,
  initOsc, volumeDelta, filterDelta, startOsc, waveformDelta
} from '../modules/oscillator'
import Knob from './Knob.vue';
import Oscilloscope from "@/components/Oscilloscope.vue";
import Sequencer from './Sequencer.vue';

export default defineComponent({
  name: 'Background',
  components: {
    Sequencer,
    /*Oscilloscope*/
    /*Knob*/
  },
  data() {
    return {
      //notes: [] as Note[],
      noteFreq: notes303[0],
      filter: 1000,
      waveform: 'triangle' as OscillatorType
    }
  },
  beforeMount() {
    initOsc();
  },
  methods: {
    playNote(freq: number) {
      playNoteOsc(freq);
    },
    playSlide() {
      //oscillator.frequency.linearRampToValueAtTime(oscillator.frequency.value*2, audioContext.currentTime + 0.2);
    },
    mute() {
      volumeDelta(0.00)
    },
    unmute() {
      volumeDelta(0.03);
    },
    volumeDelta(volume: number) {
      volumeDelta(volume);
    },
    filterDelta() {
      filterDelta(this.filter);
    },
    oninteraction() {
      startOsc();
    },
    oscShapeDelta() {
      waveformDelta(this.waveform);
    }
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

img {
  width: 100%;
}

</style>
