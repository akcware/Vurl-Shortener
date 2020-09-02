const express = require("express");
const port = process.env.port || 5000;
const cors = require("cors");

const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(require('connect').bodyParser());

// app.use(cookieParser());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

const apiRouter = require("./routes/api");

app.use("/api", apiRouter);

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.da4vi.mongodb.net/url_shortener?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
