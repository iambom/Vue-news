<template>
<div>
  <list-item></list-item>
</div>
</template>

<script>
import ListItem from '../components/ListItem.vue';
import bus from '../utils/bus.js';

export default {
  components: { 
    ListItem 
  },
  
  // created() {
  //   bus.$emit('start:spinner');
  //   this.$store.dispatch('FETCH_NEWS')
  //   .then(() => {
  //     console.log('fected');
  //     bus.$emit('end:spinner');
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

}
</script>