<template>
  <div class="white">
    <v-list-item
      @click="$store.dispatch('toggleTaskDone', task.id)"
      :class="{ 'blue lighten-5': task.done }"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
            >{{ task.title }}</v-list-item-title
          >
        </v-list-item-content>

        <v-list-item-action v-if="task.dueDate">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ task.dueDate | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <task-menu :task="task" />
        </v-list-item-action>

        <v-list-item-action v-if="$store.state.sorting" @click.stop>
          <v-btn icon class="handle">
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>

    <v-divider />
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    task: Object,
  },
  filters: {
    niceDate(date) {
      return format(new Date(date), "d MMM");
    },
  },
  components: {
    "task-menu": require("./TaskMenu.vue").default,
  },
};
</script>

<style lang="sass">
.sortable-ghost
  opacity: 0
.sortable-chosen.sortable-drag
  opacity: 1 !important
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
</style>