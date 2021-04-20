<template>
<img :style="cssVars" src="../assets/knob.png" @mousedown="beginDrag" draggable="false"/>
<input type="range" v-model="volume" min="0" max="1" step="0.01" @input="changeV"/>
<p>Foobar</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'Knob',
  data() {
    return {
        foo: 'bar',
        isDragging: false as boolean,
        value: Number,
        startY: 0 as number,
        angle: 0 as number,
        startAngle: 0 as number,
        volume: 0.5 as number,
        startVolume: 0.5 as number,
        degMin: -150,
        degMax: 150,
    }
  },
  props: {
      min: Number,
      max: Number,
      changeVol: Function,
      //degMin: Number,
      //degMax: Number,
  },
  beforeMount() {
    //console.dir(this.noteFreq);
  },
  methods: {
    beginDrag(event: MouseEvent){
      this.startY = event.pageY;
      this.startAngle = this.angle;
      this.isDragging = true;
      console.log('start');
    },
    mouseDrag(value: number){
        if(this.isDragging){
            console.log(this.startY - value)
            const calcdeg: number = this.startAngle + ((this.startY - value) /2);
            if ((calcdeg >= this.degMin) && (calcdeg <= this.degMax)){
                this.angle = calcdeg;
                this.volume = (calcdeg + 150) / 300;
                this.changeVol!(this.volume);
            }
        }
    },
    endDrag(){
      this.isDragging = false;
      console.log('end');
    },
    changeV(){
        this.changeVol!(this.volume);
    }
  },
  computed: {
    cssVars(): any {
      return {
        '--angle': this.angle + "deg"
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: relative;
  width: 100%;
}
img{
  width: 11%;
  transform: rotate(var(--angle));
  right: 82px;
  top: 120px;
  position: absolute;
}
input[type="range"]{
  display: none;
}
</style>
