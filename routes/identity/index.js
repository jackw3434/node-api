module.exports = function(router) {
  require("./login.post")(router); 
  require("./register.post")(router); 
};
