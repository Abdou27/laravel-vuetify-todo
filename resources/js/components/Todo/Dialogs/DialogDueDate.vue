<template>
  <v-dialog ref="dialog" :value="true" :return-value.sync="date" width="290px">
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="$emit('closeDialogDueDate')">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="updateTask"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      date: null,
    };
  },
  methods: {
    updateTask() {
      if (!this.date) {
        return;
      }
      let payload = {
        ...this.task,
        dueDate: this.date,
      };
      this.$store.dispatch('updateTask', payload);
      this.$emit('closeDialogDueDate');
    }
  },
  mounted() {
      if (this.task.dueDate) {
          this.date = this.task.dueDate;
      }
  }
};
</script>