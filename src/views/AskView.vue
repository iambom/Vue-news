<template>
  <div>
    <p v-for="item in fetchedAsk">
      <a :href="item.url">{{ item.title }}</a>
      <small>{{ item.time_ago }} by {{ item.user }}</small>
    </p>
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