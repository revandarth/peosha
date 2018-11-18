const mongoose = require('mongoose').set('debug', true),
counter 	= 	require('./counter');
var organization = mongoose.Schema({
  owner_id:{type:Number,required:true},
  org_id:{type:Number},
  agreed:{type:Boolean,default:false,required:true},
  name:{type:String,trim:true,required:true},
  logo:{
    path:{type:String},
    name:{type:String}
  },
  cover:{
    path:{type:String},
    name:{type:String}
  },
  website:{type:String,trim:true},
  founded:{type:Number,maxLength: 4},
  size:{type:Number},
  company_type:{type:Number},
  industry:{type:String},
  desc:{type:String},
  specialities:{type:Array},
  location:[
      {
        building_name:{type:String,trim:true},
        address2:{type:String,trim:true},
        address1:{type:String,trim:true,required:true},
        state:{type:String,trim:true},
        city:{type:String,trim:true},
        country:{type:String,trim:true},
        head_quarters:{type:Boolean,default:false}
    }
  ],
  admins:{type:Array},
  employee_count:{type:Number,default:0}
},{timestamps: true});
module.exports = organization = mongoose.model('employer',organization);
module.exports.getOrg = (obj,callback) => {
	const query = obj;
	organization.findOne(query,callback);
}

module.exports.getEmployersByUser = (obj,callback) => {
	const query = obj;
	organization.find(query,callback);
}
