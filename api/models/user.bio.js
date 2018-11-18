const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const job 	 = 	require('./job.model');
var bioSchema = Schema({
  _id:{
    type:Number,
    required:true
  },
  bio:{
    firstname:{
      type:String,
      trim:true
    },
    lastname:{
      type:String,
      trim:true
    },
    headline:{
      type:String
    },
    education:{
      type:String
    },
    country: {
      type:String,
    },
    state: {
      type:String
    },
    city: {
      type:String
    },
    marital_status:{
      type:String
    },
    dob:{
        type:Date
    },gender:{
        type:String
    },
    summary:{
      type:String
    },
    display_pic:{
       data: Buffer,
       contentType: String
    },banner_pic:{
       data: Buffer,
       contentType: String
    },current_designation:{
      type:String
    }
  },
  education:[
  {
      degree:{
        type:String//Number
      },
      major :{
        type:String//Number,
      },
      institution_name:{
        type:String
      },
      start_year:{
        type:Number
      },
      end_year:{
        type:Number
      },
      gpa:{
        type:Number
      },
      verifed:{
        type:Boolean,
        default:false
      },
      document :{
        type: String
      },
      filename :{
          type: String
      },
      description:{
        type: String
      },
      reference:{
        type:Array
      }
  }
 ],
  skill:[{
    skillset:{
      type:String,
      trim:true
    },
    rating:{
      type:Number,
      default:0
    },
    ratedusers:{
      type:Array,
      default:[]
    }
  }],
  certification:[{
    certification_name:{
      type:String,
      trim:true
    },
    authority:{
      type:String,
      trim:true
    },
    license_number:{
      type:String
    },
    start_year:{
      type:Number
    },
    end_year:{
      type:Number
    },
    certification_url:{
      type:String
    },
    certification_expire:{
      type:Boolean,
      default:false
    }
  }],
  saved_jobs:[
    {
      type:Schema.Types.ObjectId,
      ref:'job'
    }
  ],
  experience:[{
    name:{
      type:String,
      trim:true,
      required:true
    },
    title:{
        type:String,
        trim:true,
        required:true
    },
    fromMonth:{
      type:Number,
      trim:true,
      required:true
    },
    toMonth:{
      type:Number,
      trim:true
    },
    fromYear:{
      type:Number,
      trim:true,
      required:true
    },
    toYear:{
      type:Number,
      trim:true
    },
    current:{
      type:Boolean,
      required:true,
      default:false
    },
    desc:{
      type:String
    },location:{
      type:String,
      required:true
    },
    verify:{
      type:Boolean
    },
    reference:{
      type:Array
    },
    document :{
      type: String
    },
    filename :{
        type: String
    }
  }],
  company:[]
},{timestamps: true});
module.exports = user_profile = mongoose.model('userbio',bioSchema);
module.exports.all = (callback) => {
  user_profile.find({},callback);
}
