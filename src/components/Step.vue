<template>
  <div>
    <template v-for="(value, index) in singleStep" :value="stepObj" :key="index">
      <button :class="istButtonActive(value)" @click="changeStepVal(singleStep, index, value)">{{index}}</button>
    </template>
  </div>
</template>

<script lang="ts">
import {Step} from '@/modules/step';
import {PropType} from "vue";
export default {
  name: "StepComponent",
  props: {
    singleStep: Object as PropType<Step>
  },
  methods: {
    changeStepVal(singleStep: Step, index: string, value: any){
      console.info(singleStep, index, !value);
      singleStep.setValue(index, !value);
    },
    istButtonActive(value: any){
      if (value && value !== "rest"){
        return "active";
      }
      return "inactive";
    }
  }
}
</script>

<style scoped>
.active {
  background-color: indianred;
}
</style>
