require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("./config/database");

const userRouter = require("./routes/userRouter");
const poserRouter = require("./routes/poserRouter");
const adminRouter = require("./routes/adminRouter");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views/public")));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(userRouter);
app.use(poserRouter);
app.use(adminRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "views/public/index.html"));
});

app.listen(port, () => console.log(`Connected to port: ${port}`));
