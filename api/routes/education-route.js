module.exports = (app) => {
    var multer  = require('multer');
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/education')
      },
      filename: function(req, file, cb) {
        console.log(file)
        const ext = file.originalname.split(".")[1];
    		cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    	}
    })
    var upload = multer({ storage: storage }).single('document');
    var education = require('../controller/education');
  	app.route('/user/:id/education').post(education.add);
    app.route('/user/:id/:education_id/uploadeducation').put(upload,education.upload);
    app.route('/user/:id/education').get(education.get);
    app.route('/user/:id/education/:education_id').put(education.update);
    app.route('/user/:id/education/:education_id').delete(education.delete);
}
