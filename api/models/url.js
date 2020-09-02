const mongoose = require("mongoose");

const Url = mongoose.model(
  "Url",
  mongoose.Schema({
    alias: {
      type: String,
      required: true,
    },
    urlRedirect: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    visitor: {
      type: Number,
      required: false,
      default: 0,
    },
  })
);

module.exports = Url;
