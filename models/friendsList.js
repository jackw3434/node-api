let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FriendsListSchema = new Schema({
    friendship_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    friendsName: { type: String, required: true },
    messageLog: [{
        messageSender: String,
        message: String,
        date_sent: { type: Date, default: new Date(), required: true }
    }],

});

module.exports = mongoose.model("FriendsList", FriendsListSchema);
