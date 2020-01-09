let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FriendRequestSchema = new Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    status: { type: String, default: "pending", required: true },
    date_request_sent: { type: Date, default: new Date(), required: true }
});

module.exports = mongoose.model("FriendRequest", FriendRequestSchema);
