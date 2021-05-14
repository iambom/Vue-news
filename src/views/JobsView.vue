<template>
  <div>
    <div v-for="item in jobs">{{ item.domain }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      jobs: state => state.jobs
    })
  },
  created() {
    this.$store.dispatch('FETCH_JOBS')
  }
}
</script>

<style>

</style>