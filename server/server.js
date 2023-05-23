require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req, res);
  next();
});

//routes
app.use("/mwb", router);

//connect to database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
