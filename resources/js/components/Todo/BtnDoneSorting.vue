<template>
  <v-btn class="btn-done-sorting" color="primary" @click="$store.commit('toggleSorting')">Done Sorting</v-btn>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
.btn-done-sorting
    position: fixed
    bottom: 16px
    left: 50%
    transform: translateX(-50%)
</style>