module.exports = function(router) {
  require("./users.get")(router);
  require("./user.post")(router);
};
