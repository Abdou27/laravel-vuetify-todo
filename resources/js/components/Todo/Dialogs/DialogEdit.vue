<template>
  <v-dialog :value="true" max-width="290">
    <v-card>
      <v-card-title class="text-h5">
        Edit Task
      </v-card-title>
      <v-card-text>
        <v-text-field
          autofocus
          v-model="newTitle"
          label="Edit the title of this task"
          @keyup.enter="updateTask"
          @keyup.esc="$emit('closeDialogEdit')"
        ></v-text-field>
      </v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="darken-1" text @click="$emit('closeDialogEdit')">
          Cancel
        </v-btn>
        <v-btn color="primary darken-1" text @click="updateTask" :disabled="disabled">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      newTitle: "",
    };
  },
  computed: {
    disabled() {
      return this.newTitle == this.task.title || this.newTitle == "";
    }
  },
  mounted() {
    this.newTitle = this.task.title;
  },
  methods: {
    updateTask() {
      if (this.disabled) {
        return;
      }
      let payload = {
        ...this.task,
        title: this.newTitle,
      };
      this.$store.dispatch('updateTask', payload);
      this.$emit('closeDialogEdit');
    }
  }
};
</script>