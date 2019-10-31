module.exports = function (router) {
  require("./users.get")(router);
  require("./user.post")(router);
  require("./user.get")(router);
  require("./user.put")(router);
  require("./user.delete")(router);
};
