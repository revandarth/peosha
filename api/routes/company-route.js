module.exports = (app) => {
    var org = require('./../controller/company');
  	app.route('/user/:id/company').post(org.addCompany);
    app.route('/user/:id/company').get(org.getAllEmployers);
    app.route('/user/:id/company/:orgid').get(org.getCompany);
    app.route('/user/:id/company/:orgid').put(org.updateCompany);
    app.route('/user/:id/company/:orgid/location').post(org.addLocation);
    app.route('/user/:id/company/:orgid/location').put(org.update);
    app.route('/user/:id/company/:orgid/location').delete(org.deleteLocation);
}
