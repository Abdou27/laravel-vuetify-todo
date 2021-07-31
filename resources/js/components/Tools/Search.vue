<template>
  <v-text-field
    :value="$store.state.search"
    class="expanding-search mt-1"
    :class="{ closed: closed && !$store.state.search }"
    @focus="closed = false"
    @blur="closed = true"
    @input="$store.commit('setSearch', $event)"
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    dense
    filled
    clearable
    :disabled="$store.state.sorting"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      search: null,
      closed: true,
    };
  },
};
</script>

<style lang="sass">
.expanding-search
  transition: all 0.3s
  .v-input__slot
    cursor: pointer !important
    &:before, &:after
      border-color: transparent !important
      border-style: unset !important
  &.closed
    max-width: 45px
    .v-input__slot
      background: transparent !important
</style>