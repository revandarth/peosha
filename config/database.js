var config = {
  "USER"    : "app",
  "PASS"    : "UsaIndia",
  "HOST"    : "34.213.252.82",
  "PORT"    : "27017",
  "DATABASE" : "blockedin"
};
module.exports = {
  name:"mongodb://localhost:27017/blockchain",
  //name:"mongodb://"+config.HOST + ":"+ config.PORT + "/"+ config.DATABASE,
  secret:""
}
// var dbPath  = "mongodb://"+config.USER + ":"+
//     config.PASS + "@"+
//     config.HOST + ":"+
//     config.PORT + "/"+
//     config.DATABASE;

//db = mongoose.connect(dbPath);
