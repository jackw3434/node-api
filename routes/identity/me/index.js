module.exports = function (router) {
  require("./me.delete")(router);
  require("./me.friend-request.get")(router);
  require("./me.friend-request.post")(router);
  require("./me.friendMessage.post")(router);
  require("./me.friend.delete")(router);
  require("./me.friendsList.get")(router);
  require("./me.get")(router);
  require("./me.put")(router);
};
