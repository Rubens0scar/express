//MONGO

const mongoose = require("mongoose");
const Product = require("./models/Product");
const app = require("./app");
const port = process.env.PORT;
mongoose.connect(process.env.DATABASE, {}).then((con) => {
  console.log("Connected to mongo");
  //const p = new Product({ productName: "producto 2", price: 10 });  //testear la conexion a mongo
  //p.save().then(() => {
  //  console.log("saved");
  //});
});
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
