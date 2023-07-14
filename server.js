const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Kateryna:bZhXvoA6ZHRWui0x@cluster0.2ekhmee.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// bZhXvoA6ZHRWui0x;
