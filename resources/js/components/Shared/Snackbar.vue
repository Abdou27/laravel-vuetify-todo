<template>
  <v-snackbars :messages.sync="$store.state.snackbars" color="primary" />
</template>

<script>
import VSnackbars from "v-snackbars";

export default {
  components: {
    "v-snackbars": VSnackbars,
  },
};
</script>