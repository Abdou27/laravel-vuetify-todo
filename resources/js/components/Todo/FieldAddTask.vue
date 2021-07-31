<template>
  <v-text-field
    class="pa-4"
    label="Add Task"
    hide-details
    clearable
    v-model="newTaskTitle"
    @keyup.enter="addNewTask"
  >
    <template v-slot:append>
      <v-icon color="primary" @click="addNewTask" :disabled="!newTaskTitle">mdi-plus</v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data: () => ({
    newTaskTitle: "",
  }),
  methods: {
    addNewTask() {
      if (!this.newTaskTitle) {
        return;
      }
      this.$store.dispatch("addNewTask", this.newTaskTitle);
      this.newTaskTitle = "";
    },
  },
};
</script>