<template>
  <div class="home">
    <list-tasks v-if="$store.state.tasks.length"></list-tasks>
    <no-tasks v-else></no-tasks>

    <btn-done-sorting v-if="$store.state.sorting" />
  </div>
</template>

<script>
export default {
  name: "Todo",
  components: {
    "list-tasks": require("../components/Todo/ListTasks.vue").default,
    "no-tasks": require("../components/Todo/NoTasks.vue").default,
    "btn-done-sorting": require("../components/Todo/BtnDoneSorting.vue").default,
  },
};
</script>
