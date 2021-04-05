<template>
    <button @click="dosth" >{{frequency}}</button>
</template>

<script lang="ts">
 import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Key',
  props:{
    frequency: Number
  },

  methods: {
    dosth: () => {
      alert('foo');
    }  
  },
  data() {
    return {
      bar: 'foo'
    }
  },
});


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button{
  background-color: red;
}
</style>
