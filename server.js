const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const homeRouter = require("./routes/home");
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/firstdb")
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.use("/api", homeRouter);

app.listen(port, () => {
  console.log("Server is listening at http://192.168.31.5:" + port);
});
