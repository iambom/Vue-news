<template>
  <div>
    <div v-for="item in fetchedAsk">{{ item.title }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    //#4
    ...mapGetters([
      'fetchedAsk'
    ])

    //#3
    // ...mapGetters({
    //   fetchedAsk: 'fetchedAsk',
    // }),

    //#2
    // ...mapState({
    //   fetchedAsk: state => state.ask
    // })

    // #1
    // fetchedAsk() {
    //   return this.$store.state.ask
    // }
  },
  created() {
    this.$store.dispatch('FETCH_ASK');
  }
}
</script>

<style>

</style>