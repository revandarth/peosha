const mongoose = require('mongoose'),
counter 	= 	require('./counter'),
bcrypt 				 = 	require('bcrypt'),
fs             = require('fs');
var UserSchema = mongoose.Schema({
  email:{
    type:String,
    unique:true,
    required:true,
    lowercase: true,
    trim:true
  },
  name:{
    type:String,
    trim:true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  _id:{
    type:Number,
    required:true
  },
  random:{
    type:String
  }
},{timestamps: true}
);
var counterSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  seq:{
    type:Number,
    default:0
  }
},{ versionKey: false});
UserSchema.pre('save',function(next){
   var data = this;
    if (!data.isModified('password')) return next(err);
    bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
         // hash the password using our new salt
         bcrypt.hash(data.password, salt, function(err, hash) {
             if (err) return next(err);
             data.password = hash;
             next();
         });
     });
});
module.exports = user = mongoose.model('user',UserSchema);
module.exports.incrementUser = (callback) =>{
  counter.findByIdAndUpdate({_id: 'user_id'},{$inc:{ seq: 1}},{new: true},callback);
}
module.exports.all = (callback) => {
  user.find({},callback);
}
module.exports.comparePassword = (password,hash) => {
 	return bcrypt.compareSync(password,hash);
}
module.exports.getUserByQuery = (query,callback) => {
	user.findOne(query,callback);
}
module.exports.getUserById = (query,callback) => {
//  console.log({_id: parseInt(query)});
	user.findOne({_id: parseInt(query)},callback);
}
