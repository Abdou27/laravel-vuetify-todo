<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app :mobile-breakpoint="768">
      <v-img
        height="170"
        src="mountains-1412683.svg"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mt-8 ms-8 mb-2">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <div class="ms-8 white--text text-subtitle-1 font-weight-bold">
          Rahim
        </div>
        <div class="ms-8 white--text text-subtitle-2">benmelouka@live.fr</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      prominent
      :height="appBarHeight"
      color="primary"
      src="mountains-1412683.svg"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container fluid class="px-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search />
        </v-row>
        <v-row>
          <v-toolbar-title class="ms-16">{{
            $store.state.appTitle
          }}</v-toolbar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
        <v-row v-if="$route.name == 'Todo'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <!-- If using vue-router -->
      <router-view></router-view>
      <snackbar></snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
    right: null,
  }),
  mounted() {
    this.$store.dispatch("getTasks");
  },
  computed: {
    appBarHeight() {
      let height = 170;
      switch (this.$route.name) {
        case 'Todo':
          height = 200;
          break;
      }
      return height;
    },
  },
  components: {
    "field-add-task": require("./components/Todo/FieldAddTask.vue").default,
    snackbar: require("./components/Shared/Snackbar.vue").default,
    "live-date-time": require("./components/Tools/LiveDate.vue").default,
    search: require("./components/Tools/Search.vue").default,
  },
};
</script>