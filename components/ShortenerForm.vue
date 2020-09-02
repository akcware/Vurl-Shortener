<template>
  <v-form ref="form" lazy-validation mt-4>
    <v-text-field
      v-model="url"
      label="URL"
      placeholder="https://"
      class="url_text"
      solo
      rounded
      clearable
      required
    />

    <v-row>
      <v-col cols="12" md="8">
        <v-text-field label="Alias" class="alias_text" v-model="alias" />
      </v-col>
      <v-col cols="12" md="4">
        <v-btn raised color="primary" elevation="12" @click="shortBtn">Short</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      alias: "",
    };
  },
  methods: {
    shortBtn() {
      this.$emit("add-url", {
        urlRedirect: this.url,
        alias: this.alias || Math.floor(Math.random() * 10000 + 1),
        date: Date.now(),
      });
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 600px) {
  .url_text {
    width: 800px;
  }
}
@media screen and (max-width: 400px) {
  .url_text {
    width: 90%;
  }
}

.alias_text {
  margin-left: 24px;
}
</style>