const mongoose = require("mongoose");

require("dotenv").config();

console.log(process.env.DATABASE_URL);

exports.dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("db connection successfull"))
    .catch((err) => {
      console.log("error in db connection");
      console.error(err);
      process.exit(1);
    });
};
