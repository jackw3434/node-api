let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let FriendsListSchema = require("./friendsList").Schema;
let FriendRequestSchema = require("./friendRequest").Schema;

let UserSchema = new Schema({
  first_name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  friendsList: { type: [FriendsListSchema] },
  friend_requests: { type: [FriendRequestSchema] },
  role: { type: String, required: true },
  password: { type: String, required: true },
  secret: { type: String, required: false }
});

module.exports = mongoose.model("User", UserSchema);
