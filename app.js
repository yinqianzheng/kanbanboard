const express = require("express");
const app = express();
const http = require("http").createServer(app);

const mongoose = require("mongoose");
const users = require("./routes/users");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const path = require("path");

let db;
if (process.env.NODE_ENV === "production") {
  db = require("./config/keys_prod").mongoURI;
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  db = require("./config/keys").mongoURI;
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", users);

http.listen(port, () => console.log(`Listening on port ${port}`));
