<template>
  <template v-for="(value, name) in noteFreq" :value="freq" :key="name">
    <button @mousedown="playNote(value)">{{name}}</button>
  </template><br>
  <template v-for="(value, name) in sequence" :value="freq" :key="name">
    <button @mousedown="playNote(value)">{{name}}</button>
  </template>
</template>

<script lang="ts">
import { notes303 } from '@/static/notes';
import { Sequence } from '@/types/custom';
import { defineComponent, PropType } from "vue";
import { Step } from '@/modules/step';
export default defineComponent({
  name: "Sequencer",
  props: {
    playNote: Function,
  },
  beforeMount() {
    this.sequence = Array.from({length: 16}, u => (new Step))
  },
  data() {
    return {
      noteFreq: notes303[0],
      sequence: Object as PropType<Sequence>
    }
  }
})
</script>

<style scoped>

</style>
