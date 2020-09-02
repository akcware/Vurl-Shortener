const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const mongoose = require("mongoose");

const apiRouter = require("./routes/api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", apiRouter);

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.da4vi.mongodb.net/url_shortener?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = app;

if (require.main === module) {
  const port = process.env.port || 3001;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}
