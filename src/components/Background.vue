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
      <label>Tuning</label>
      <input type="range" v-model="tuning" min="-1" max="1" step="0.01" @input="tuningDelta"/>
    </div>
    <div>
      <label>Resonance</label>
      <input type="range" v-model="resonance" min="0" max="30" step="0.5" @input="resonanceDelta"/>
    </div>
    <div>
      <label>Filtergain</label>
      <input type="range" v-model="filterGain" min="-40" max="40" step="0.5" @input="filtergainDelta"/>
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
import Voice from '../modules/voice'
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
      filterGain: 1,
      tuning: 0,
      resonance: 0,
      waveform: 'sawtooth' as OscillatorType,
      voice: new Voice()
    }
  },
  beforeMount() {
    this.voice.initVoice();
  },
  methods: {
    playNote(freq: number) {
      this.voice.playNoteOsc(freq);
    },
    playSlide() {
      //oscillator.frequency.linearRampToValueAtTime(oscillator.frequency.value*2, audioContext.currentTime + 0.2);
    },
    mute() {
      this.voice.setVolume(0.00);
    },
    unmute() {
      this.voice.setVolume(0.06);
    },
    volumeDelta(volume: number) {
      this.voice.setVolume(volume);
    },
    filterDelta() {
      this.voice.setFilter(this.filter);
    },
    oninteraction() {
      this.voice.startOsc();
    },
    oscShapeDelta() {
      this.voice.setWaveForm(this.waveform);
    },
    tuningDelta() {
      this.voice.setTuning(this.tuning);
    },
    resonanceDelta() {
      this.voice.setResonance(this.resonance);
    },
    filtergainDelta() {
      this.voice.setFilterGain(this.filterGain);
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
