const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const expressValidator 	= 	require('express-validator');
const flash  = 	require('connect-flash');
const morgan = require('morgan');
const multer  = require('multer');
const db = mongoose.connection;

mongoose.connect(config.name,{auth:{authdb:"UsaIndia"}});
// mongoose.connect(config.name,
//   {
//     server: {
//       socketOptions: {
//         connectTimeoutMS: 500
//       }
//     },function(err, db) {
//        if (err) throw err;
//        console.log("Database created!");
//      }
// });
db.on("connected",() =>{
  console.log("Database is connected"+config.name);
});
db.on("error",(err) =>{
  console.log("Database is connected"+err);
});
db.on('disconnected', function() {
   console.log('MongoDB disconnected!');
   mongoose.connect(config.name, {server:{auto_reconnect:true}});
 });
mongoose.set('debug', true);
app.use('/image',express.static(path.join(__dirname, 'api/templates/jobs_attachment')));
 // Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//Connect Flash
app.use(flash());
// log every request to the console
app.use(morgan('dev'));

//api routes
app.use(cors());
//console.log(apis)
//parsers for post api
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use('/uploads', express.static('uploads'))

app.use('/uploads', express.static('uploads'));

require('./api/routes/main')(app);

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
