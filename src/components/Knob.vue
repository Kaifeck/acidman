<template>
<img :style="cssVars" src="../assets/knob.png" @mousedown="beginDrag" draggable="false"/>
<input type="range" v-model="volume" min="0" max="1" step="0.01"/>
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
        angle: 180 as number,
        volume: 0.5 as number
    }
  },
  props: {
      min: Number,
      max: Number,
      degMin: Number,
      degMax: Number,
  },
  beforeMount() {
    //console.dir(this.noteFreq);
  },
  methods: {
    beginDrag(event: MouseEvent){
      this.startY = event.pageY;
      this.isDragging = true;
      console.log('start');
    },
    mouseDrag(value: number){
        if(this.isDragging){
            console.log(this.startY - value)
        }
    },
    endDrag(){
      this.isDragging = false;
      console.log('end');
    }
  },
  computed: {
      cssVars() {
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
  width: 10%;
  transform: rotate(var(--angle));
}
</style>
