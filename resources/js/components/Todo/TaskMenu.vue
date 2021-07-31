<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list flat>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
          active-class="disable-active"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <dialog-edit
      v-if="dialogs.edit"
      :task="task"
      @closeDialogEdit="dialogs.edit = false"
    />

    <dialog-due-date
      v-if="dialogs.dueDate"
      :task="task"
      @closeDialogDueDate="dialogs.dueDate = false"
    />

    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @closeDialogDelete="dialogs.delete = false"
    />
  </div>
</template>


<script>
export default {
  props: {
    task: Object,
  },
  data: () => ({
    dialogs: {
      edit: false,
      dueDate: false,
      delete: false,
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: "Due Date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.dueDate = true;
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
        },
      },
      {
        title: "Sort",
        icon: "mdi-drag-horizontal-variant",
        click() {
          if (!this.$store.state.search) {
            this.$store.commit("toggleSorting");
          } else {
            this.$store.commit("showSnackbarWithText", "Can't sort while searching !");
          }
        },
      },
    ],
  }),
  components: {
    "dialog-edit": require("./Dialogs/DialogEdit.vue").default,
    "dialog-due-date": require("./Dialogs/DialogDueDate.vue")
      .default,
    "dialog-delete": require("./Dialogs/DialogDelete.vue")
      .default,
  },
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
};
</script>

<style lang="sass" scoped>
.v-list-item--active.disable-active
  color: rgba(0, 0, 0, 0.87) !important
  .v-icon
    color: rgba(0, 0, 0, 0.54)
</style>