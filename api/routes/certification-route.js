module.exports = (app) => {
    var certification = require('../controller/certification');
  	app.route('/user/:id/certificate').post(certification.add);
    app.route('/user/:id/certificate').get(certification.get);
    app.route('/user/:id/certificate/:certification_id').put(certification.update);
    app.route('/user/:id/certificate/:certification_id').delete(certification.delete);
}
