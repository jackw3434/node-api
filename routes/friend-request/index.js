module.exports = function (router) {
    require("./friend-request.delete")(router);
    require("./friend-request.get")(router);
    require("./friend-request.post")(router);
    require("./friend-request.status.put")(router);
    require("./friend-requests.get")(router);
  };
  