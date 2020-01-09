let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let FriendsListSchema = new Schema({
    friendObjects: [{
        _id: mongoose.Types.ObjectId,
        first_name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true }
    }],
    messageLog: [{
        message_id: mongoose.Types.ObjectId,
        emailOfMessageSender: { type: String, required: true },
        nameOfMessageSender: { type: String, required: true },
        message: { type: String, required: true },
        date_sent: { type: Date, default: new Date(), required: true }
    }]
});

module.exports = mongoose.model("FriendsList", FriendsListSchema);
