<template>
  <div>
    <v-card shaped>
      <v-card-title>Shortened Link</v-card-title>
      <v-card-text>
        <v-text-field
          append-icon="mdi-content-copy"
          append-outer-icon="mdi-delete"
          v-model="currentPath"
          @click:append="copyUrl"
          @click:append-outer="deleteUrlDialog = true"
          filled
          readonly
        />
        <small>
          <a :href="url.urlRedirect">{{url.urlRedirect}}</a>
        </small>

        <v-dialog v-model="deleteUrlDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Delete the url?</v-card-title>

            <v-card-text>URL will be on the servers though. If you say yes, url will be deleted just on your computer</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="deleteUrlDialog = false">No</v-btn>
              <v-btn color="green darken-1" text @click="deleteUrl">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-snackbar v-model="copiedSnackbar">
          Copied ✔
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="copiedSnackbar = false">Close</v-btn>
          </template>
        </v-snackbar>
      </v-card-text>
    </v-card>
  </div>
</template>



<script>
export default {
  props: ["url"],
  data() {
    return {
      // path: $route.toPath(),
      currentPath: "https://vurl-shortener.herokuapp.com/",
      copiedSnackbar: false,
      deleteUrlDialog: false,
    };
  },
  methods: {
    copyUrl() {
      navigator.clipboard.writeText(this.url);
      this.copiedSnackbar = true;

      setTimeout(() => (this.copiedSnackbar = false), 2000);
    },
    deleteUrl() {
      this.deleteUrlDialog = false;

      this.$emit("delete-url", this.$props.url.id);
    },
  },
  created() {
    this.currentPath += this.$props.url.alias;
  },
};
</script>

<style scoped>
v-text-field {
  width: 80%;
}
</style>
