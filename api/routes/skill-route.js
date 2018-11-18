module.exports = (app) => {
    var skill = require('../controller/skills');
  	app.route('/user/:id/skill').post(skill.add);
    app.route('/user/:id/skill').get(skill.get);
    app.route('/user/:id/skill').put(skill.update);
}
/*
{"skills":"dotnet,php,angular,mongo,cloud.aws,css,javascript","userId":"5a20ba691aa19c1b50eee4f1"}*/
