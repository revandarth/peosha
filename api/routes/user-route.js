module.exports = (app) => {
  var user = require('../controller/users');
  app.route("/user/signup").post(user.signup);
  app.route("/user/signin").post(user.signin);
  //app.route("/user/getall").get(user.getAllUsers);
  app.route("/user/:id").get(user.getUserById);
  //app.route("/user/:id/all").get(user.all);
};
