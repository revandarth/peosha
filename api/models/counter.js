const mongoose = require('mongoose');
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

module.exports =  counter = mongoose.model('counter',counterSchema);
