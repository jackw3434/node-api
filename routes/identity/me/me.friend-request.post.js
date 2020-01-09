let FriendRequest = require('../../../models/friendRequest');
let FriendsList = require('../../../models/friendsList');
let User = require('../../../models/user');
let auth = require('../../../utils/auth');
let mongoose = require("mongoose");

module.exports = function (router) {
    router.route('/friendRequest/me').post(auth.required, function (req, res) {

        let loggedInUser = req.tokenData;
        let userID = mongoose.Types.ObjectId(loggedInUser.user_id);
      
        let newRequest = new FriendRequest(req.body);
        let sender = newRequest.sender;
        let receiver = newRequest.receiver;
        let requestStatus = newRequest.status;
        let friendToInvite = newRequest.receiver;

        if (loggedInUser.user_email == receiver) {
            return res.status(400).send('Validation_error, cannot invite yourself');
        }

        User.findById({ _id: userID }, 'friend_requests', function (err, usersFriendRequests) {

            if (err) {
                return res.status(400).send(err);
            }

            usersFriendRequests = usersFriendRequests.friend_requests;

            if (usersFriendRequests.length == 0) {

                //console.log("user has no friend requests, no need to check for duplicates");
                
                User.find({ 'email': { $in: [friendToInvite, sender] } }, function (err, users) {

                    if (err || !users[0] || users[0].length == 0) {
                        return res.status(400).send('Validation_error, No email matching for ' + friendToInvite);
                    }
                    if (err || !users[1] || users[1].length == 1) {
                        return res.status(400).send('Validation_error, No email matching for ' + sender);
                    }

                    let requestSender;
                    users.map((user) => {
                        if (user.email == sender) {
                            return requestSender = user;
                        }
                    })

                    newRequest.save(function (err, newFriendRequest) {

                        if (err) {
                            if (err.code == 11000) {
                                //console.log(err);
                                return res.status(409).send('friend_request_rejection_error, A Friend Request to ' + friendToInvite + ' has already been made.');
                            }
                            return res.status(400).send(err);
                        }

                        newRequest._id = mongoose.Types.ObjectId(newRequest._id)

                        users[0].friend_requests.push(newRequest._id);
                        users[1].friend_requests.push(newRequest._id);

                        users[0].save(function (err, newUser) {

                            if (err) {
                                return res.status(400).send(err);
                            }

                            users[1].save(function (err, newUser) {

                                if (err) {
                                    return res.status(400).send(err);
                                }
                            })
                        })

                        return res.status(200).json("Friend Request: " + newFriendRequest + " has been created.");
                    })
                })
            } else {

               // console.log("users has friend requests, checking for duplicates");

                FriendRequest.find({ '_id': { $in: usersFriendRequests } }, function (err, friendRequests) {

                    if (err) {
                        return res.status(400).send(err);
                    }

                    // if any of the receiver emails match loggedInUser.user_id
                    // then someone is already adding you 
                    // so change status to accept and add to friend list

                    let alreadyBeenInvited = friendRequests.some(function (request) {
                        return request.sender == receiver;
                    });

                    if (alreadyBeenInvited) {//user has already been invited by the reciever so add friend                 

                        let acceptingFriendRequest;

                        friendRequests.map(function (request) {
                            if (request.sender == receiver) {
                                return acceptingFriendRequest = request;
                            }
                        });

                        if (acceptingFriendRequest.status == "Accepted") {
                            return res.status(400).send('Validation_error, cannot invite existing friends');
                        }

                        acceptingFriendRequest.status = "Accepted";

                        acceptingFriendRequest.save(function (err, acceptedFriendRequest) {

                            if (err) {
                                return res.status(400).send(err);
                            }

                            // save users to friends list
                            User.find({ 'friend_requests': acceptedFriendRequest._id }, function (err, users) {

                                if (err || !users[0] || users[0].length == 0) {
                                    return res.status(400).send('Validation_error,aaa No email matching for ' + friendToInvite);
                                }
                                if (err || !users[1] || users[1].length == 1) {
                                    return res.status(400).send('Validation_error,bbb No email matching for ' + sender);
                                }

                                // Found both users
                                // Add to friends list

                                let newFriendListObject = new FriendsList({
                                    friendObjects: [{
                                        first_name: users[0].first_name,
                                        surname: users[0].surname,
                                        email: users[0].email
                                    },
                                    {
                                        first_name: users[1].first_name,
                                        surname: users[1].surname,
                                        email: users[1].email
                                    }],
                                    messageLog: {
                                        emailOfMessageSender: "Chappie.admin@support.com",
                                        nameOfMessageSender: "Chappie Admin",
                                        message: "A new Friendship has started between " + users[0].first_name + " and " + users[1].first_name + ", have fun chatting! :)",
                                        date_sent: new Date()
                                    }
                                });

                                newFriendListObject.save(function (err, friendObject) {

                                    if (err) {
                                        return res.status(400).send(err);
                                    }

                                    users[0].friendsList.push(newFriendListObject._id);
                                    users[1].friendsList.push(newFriendListObject._id);

                                    users[0].save(function (err, user) {

                                        if (err) {
                                            return res.status(400).send(err);
                                        }

                                        users[1].save(function (err, user) {

                                            if (err) {
                                                return res.status(400).send(err);
                                            }

                                            return res.status(200).json({ friendRequestStatus: "Accepted", message: "Friend Request has been accepted. Users are now friends." });

                                        })
                                    })
                                })
                            })
                        })
                    } else {

                        // if any friend request . receiver emails match newRequest.sender
                        // then its a duplicate friend request                  

                        let doesRequestExist = friendRequests.some(function (request) {
                            return request.receiver == receiver;
                        });

                        if (doesRequestExist) {//request does exist so dont send
                            console.log("dont send friend request ", doesRequestExist);
                            return res.status(200).send("User has already sent a request to " + receiver + " cannot resend.");

                        } else {//request doesnt exist, so send the new request                                       

                            User.find({ 'email': { $in: [friendToInvite, sender] } }, function (err, users) {

                                if (err || !users[0] || users[0].length == 0) {
                                    return res.status(400).send('Validation_error,aaa No email matching for ' + friendToInvite);
                                }
                                if (err || !users[1] || users[1].length == 1) {
                                    return res.status(400).send('Validation_error,bbb No email matching for ' + sender);
                                }

                                let requestSender;
                                users.map((user) => {
                                    if (user.email == sender) {
                                        return requestSender = user;
                                    }
                                })

                                newRequest.save(function (err, newFriendRequest) {

                                    if (err) {
                                        if (err.code == 11000) {
                                            return res.status(409).send('friend_request_rejection_error, A Friend Request to ' + friendToInvite + ' has already been made.');
                                        }
                                        return res.status(400).send(err);
                                    }

                                    newRequest._id = mongoose.Types.ObjectId(newRequest._id)

                                    users[0].friend_requests.push(newRequest._id);
                                    users[1].friend_requests.push(newRequest._id);

                                    users[0].save(function (err, user) {

                                        if (err) {
                                            return res.status(400).send(err);
                                        }

                                        users[1].save(function (err, user) {

                                            if (err) {
                                                return res.status(400).send(err);
                                            }
                                        })
                                    })

                                    return res.status(200).json("Friend Request: " + newFriendRequest + " has been created.");
                                })
                            })
                        }
                    }
                })
            }
        });
    });
}