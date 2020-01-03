let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  first_name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  //friends: { type: [String] },
  role: { type: String, required: true },
  password: { type: String, required: true },
  secret: { type: String, required: false }
});

module.exports = mongoose.model("User", UserSchema);
