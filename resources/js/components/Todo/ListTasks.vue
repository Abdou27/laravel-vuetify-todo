<template>
  <v-list flat class="pt-0">
    <v-list-item-group v-model="settings" multiple active-class="">
      <draggable
        v-model="tasks"
        handle=".handle"
        v-bind="dragOptions"
      >
        <task
          v-for="task in tasks"
          :key="task.id"
          :task="task"
        ></task>
      </draggable>
    </v-list-item-group>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";

export default {
  data: () => ({
    settings: [],
  }),
  components: {
    task: require("./Task.vue").default,
    draggable,
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.tasksFiltered;
      },
      set(value) {
        this.$store.dispatch('setTasks', value);
      }
    },
    dragOptions() {
      return {        
        animation: 200,
      }
    }
  }
};
</script>