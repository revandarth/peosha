module.exports = (app) => {
    var multer  = require('multer');
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/job')
      }
    })
    var upload = multer({ storage: storage }).single('document');
    var job = require('./../controller/jobs');
  	app.route('/user/:id/job').post(job.create);
    app.route('/user/:id/job/all').get(job.getAll);
    app.route('/user/:id/job').get(job.getByid);
    app.route('/user/:id/job/:jobId').get(job.get);
    app.route('/user/:id/job/:jobId/:email/:phone').put(upload,job.apply);
}
