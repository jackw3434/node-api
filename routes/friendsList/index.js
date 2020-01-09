module.exports = function (router) {
  require("./friendsList.delete")(router);
  require("./friendsList.get")(router);
  require("./friendsList.post")(router);
};
