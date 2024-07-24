const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB is Connected");
  })
  .catch((err) => {
    console.log("DB is not Connected", err);
  });

module.exports = mongoose;
