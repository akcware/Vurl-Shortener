<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center mt-4">
        <Logo />
        <ShortenerForm @add-url="addUrl" />

        <div class="mt-10">
          <ShortenedUrl
            v-for="url in urls"
            :url="url"
            @delete-url="deleteUrl"
            :key="url.id"
            class="mt-4"
          />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import nuxtStorage from "nuxt-storage";

import Logo from "~/components/Logo.vue";
import ShortenerForm from "~/components/ShortenerForm";
import ShortenedUrl from "~/components/ShortenedUrl";

export default {
  components: {
    Logo,
    ShortenerForm,
    ShortenedUrl,
  },
  data() {
    return {
      urls: [],
    };
  },
  mounted() {
    this.urls = nuxtStorage.localStorage.getData("urls") || [];
  },
  methods: {
    deleteUrl($event) {
      this.urls.splice($event, 1);
      console.log($event);
    },
    addUrl($event) {
      const urlModel = $event;

      const axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };

      if (urlModel.alias == "" || urlModel.alias == null)
        urlModel.alias = Math.floor(Math.random * 10000 + 1);

      axios
        .post("/api/add_url", urlModel, axiosConfig)
        .then((res) => {
          if (res.data.success) {
            this.urls.push(urlModel);
            nuxtStorage.localStorage.setData("urls", this.urls);
          }
        })
        .catch(console.error);
    },
  },
};
</script>         
