const mongoose = require('mongoose').set('debug', true),
employer = require('./company'),
userbio = require('./user.bio');
var jobSchema = mongoose.Schema({
  designation:{
    type:String,
    required:true,
    trim:true
  },
  teamname:{
    type:String,
    trim:true,
    required:true
  },
  employment_type:{
    type:Number,
    required:true
  },
  experience:{
    type:Number,
    required:true
  },
  skills:{
    type:String,
    required:true
  },
  location: {
    type:String,
    required:true
	},
  description:{
    type:String,
    required:true,
    trim:true
  },
  owner_id:{
    type:Number,
    required:true
  },
  org_id:{
    type:Number,
    required:true
  },
  applicants:[{
    applicant_id:{
      type:Number,
      required:true,
      ref:'userbio'
    },
    email:{
      type: String,
      lowercase: true,
      trim:true,
      required:true
    },
    phone:{
        type: Number,
        required:true
    },
    document :{
        type: String
    }
  }],
  notification:{
    notify_type:{
      type:Boolean,
      required:true
    },
    url:{
      type:String
    },
    email_id:{
      type:String
    }
  },
  saved_jobs:[]
},{timestamps: true});
module.exports = mongoose.model('job',jobSchema);
