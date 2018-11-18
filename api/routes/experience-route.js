module.exports = (app) => {
    var multer  = require('multer');
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/experience')
      },
      filename: function(req, file, cb) {
        const ext = file.originalname.split(".")[1];
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
      }
    })
    var upload = multer({ storage: storage }).single('document');
    var experience = require('../controller/experience');
  	app.route('/user/:id/experience').post(experience.add);
    app.route('/user/:id/experience').get(experience.get);    
    app.route('/user/:id/experience/:experience_id').put(experience.update);
    app.route('/user/:id/experience/:experience_id/upload').put(upload,experience.upload);
    app.route('/user/:id/experience/:experience_id').delete(experience.delete);
}
/*
{"name":"One point global","userId":"5a20ba691aa19c1b50eee4f1"
,"title":"UI engineer","fromMonth":2,"fromYear":2010,"isCurrentCompany":true,"location":"Bangalore,Karnatka"}*/
