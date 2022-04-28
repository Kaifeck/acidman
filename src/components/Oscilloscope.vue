<template>
<canvas id="oscilloscope" width="300" height="300"></canvas>
</template>

<script lang="ts">
import { Component, defineComponent } from 'vue';

export default defineComponent({
  name: "Oscilloscope",
  props: {
    audioSource: OscillatorNode,
    audioCtx: AudioContext
  },
  data() {
    return {
      //audioCtx: new window.AudioContext,
      analyser: {} as AnalyserNode,
      canvasCtx: {} as any,
      dataArray: {} as any
    }
  },
  beforeMount() {
    this.analyser = this.audioCtx!.createAnalyser();
    this.audioSource?.connect(this.analyser);
  },
  mounted(){
    this.analyser.fftSize = 2048;
    let bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
    const canvas = document.getElementById('oscilloscope');
    this.canvasCtx =  (canvas as HTMLCanvasElement).getContext('2d');
    this.canvasCtx?.clearRect(0, 0, 300, 300);
    this.draw();

  },
  methods: {
    draw(){
      let drawVisual = requestAnimationFrame(this.draw);
      this.analyser.getByteTimeDomainData(this.dataArray);
      this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      this.canvasCtx.fillRect(0, 0, 300, 300);
      this.canvasCtx.lineWidth = 2;
      this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
      this.canvasCtx.beginPath();
      let sliceWidth = 300 / this.analyser.frequencyBinCount;
      let x = 0;
      for(var i = 0; i < this.analyser.frequencyBinCount; i++) {
        var v = this.dataArray[i] / 128.0;
        var y = v * 300/2;
        if(i === 0) {
          this.canvasCtx.moveTo(x, y);
        } else {
          this.canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      this.canvasCtx.lineTo(300, 300/2);
      this.canvasCtx.stroke();
    }
  }
})
</script>

<style scoped>

</style>
