<template></template>

<script>
import axios from "axios";

export default {
  created() {
    const alias = this.$route.params.url;

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    let redirect_url;

    axios
      .post(
        "http://localhost:5000/api/get_redirect_url",
        { alias: alias },
        axiosConfig
      )
      .then((res) => {
        console.log(res);
        if (res.data.redirect_url == null || !res.data.success)
          return this.$router.push("/");

        redirect_url = res.data.redirect_url;

        return axios.post(
          "http://localhost:5000/api/add_visitor",
          { alias: alias },
          axiosConfig
        );
      })
      .then((res) => {
        window.location = redirect_url;
      })
      .catch(console.error);
  },
};
</script>