<template>
  <template v-for="(value, name) in noteFreq" :value="freq" :key="name">
    <button @mousedown="playNote(value)">{{ name }}</button>
  </template>
  <br>
<!--  <template v-for="(value, index) in sequence" :value="stepObj" :key="index">
    <button @mousedown="showInfo(value)">{{ index }}</button>
    <StepComponent :single-step="value"></StepComponent>
  </template>-->
</template>

<script lang="ts">
import {notes303} from '@/static/notes';
import {Sequence} from '@/types/custom';
import {defineComponent, PropType} from "vue";
import {Step} from '@/modules/step';
import StepComponent from "@/components/Step.vue";

export default defineComponent({
  name: "Sequencer",
  /*components: {StepComponent},*/
  props: {
    playNote: Function,
  },
  beforeMount() {
    this.sequence = Array.from({length: 16}, () => (new Step))
  },
  data() {
    return {
      noteFreq: notes303[0],
      sequence: null as any
    }
  },
  methods: {
    showInfo(step: Step) {
      console.info(step);
      //console.info(this.sequence[step]);
    }
  }
})
</script>

<style scoped>

</style>
