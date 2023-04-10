const express = require("express");
const path = require("path");
const ejs = require("ejs");
const https = require("https");
const reload = require("reload");

const app = express();

const PORT = process.env.PORT || 3002;
const HOST = "localhost";

app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: false,
    maxAge: 0,
  })
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/user", (req, res) => {
  res.render("user");
});

app.listen(PORT, HOST, () => {
  console.log("Server is running at", "http://" + HOST + ":" + PORT);
});

reload(app);
