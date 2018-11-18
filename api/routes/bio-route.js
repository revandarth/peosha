module.exports = (app) => {
    var bio = require('../controller/bio');
  	app.route('/user/:id/bio').put(bio.update);
    app.route('/user/:id/bio').get(bio.get);
    app.route('/user/:id/all').get(bio.all);
    app.route('/user/:id/savejob').post(bio.save_jobs);
    app.route('/user/:id/savejob').get(bio.getsavedjobs);
}
