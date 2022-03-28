<template>
  <div>
    <button v-for="(item, index) in singleStep">
      {{item+index}}
    </button>
  </div>
</template>

<script lang="ts">
import {Step} from '@/modules/step';
import {PropType} from "vue";
export default {
  name: "Step",
  props: {
    singleStep: Object as PropType<Step>
  }
}
</script>

<style scoped>

</style>
