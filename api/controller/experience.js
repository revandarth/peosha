'use strict';
const user_bio     = 	require('../models/user.bio');
const nodemailer  = require("nodemailer");
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'premnair.r@gmail.com',
        pass: 'Premchand@34'
    }
});

function sendMail(exp) {
    var user = {firstname : exp.firstname,lastname:exp.lastname};
    var options = {
        from: "verify@blockedin",
        //replyTo: <replyto>,
        to: exp.reference,
        subject: "Please endorse the profile - Blockedin",
        html: `Hi,</br> ${exp.firstname} ${exp.lastname} wants to verify the experience`
    };
    transport.sendMail(options, function(error, info) {
      if(error) {
        console.log('Message not sent');
        console.log(info);
        return false;
      }
      else{
        console.log('Message sent: ' + info.response);
        console.log(info);
        return true;
      };
    });
}

exports.add = (req,res) => {
    req.checkBody('title','Please enter designation').notEmpty();
    req.checkBody('name','Please enter company name').notEmpty();
    req.checkBody('fromMonth','Please select start month').notEmpty();
    req.checkBody('fromYear','Please select start year').notEmpty();
    //req.checkBody('desc','Please enter company name').notEmpty();
    req.checkBody('current','Please check current company status').notEmpty();
    req.checkBody('location','Please enter location').notEmpty();
    req.checkBody('verify','Please enter verify type').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(200).send(
          { err:true,
            errText:errors
          }
        )
    } else {
      var experience = {
        'name':req.body.name,
        'title':req.body.title,
        'fromMonth':req.body.fromMonth,
        'toYear':req.body.toYear,
        'toMonth':req.body.toMonth,
        'fromYear':req.body.fromYear,
        'desc':req.body.desc,
        'current':req.body.current,
        'location':req.body.location,
        'verify':req.body.verify,
        'reference':req.body.reference
      }
      user_bio.findOne({_id:req.params.id},function(err,bio){
        if(err)
          return res.status(400).send(
            { err:true,
              errText:errorHandler.getErrorMessage(err)
            }
          )
          if(req.body.verify)
            sendMail(experience)
          bio.experience.push(experience)
          bio.save(function(err1,data){
            if(err)
              return res.status(400).send(
                { err:true,
                  errText:errorHandler.getErrorMessage(err1)
                }
              )
               return res.status(200).json({'err':false,experience:data.experience})
          });
      });
    }
};

exports.upload = (req,res) => {
    user_bio.update({'experience._id': ObjectId(req.params.experience_id)},
      {'$set': {'experience.$.document':req.file.path,'experience.$.filename':req.file.originalname}},function(err,model) {
      if(err){
        return res.status('400').json({'err':true,errText:err});
      }
      user_bio.findById(req.params.id, function (err, data) {
        var result = data.experience.filter(d => d._id == req.params.experience_id)
        return res.status('200').json({'err':false,experience:result});
      });
    });
};

exports.get = (req,res) => {
  	var errors = req.validationErrors();
  	if(errors){
  		return res.status(200).send({
  			err:true,
  			errText:errors[0].msg
  		});
  	}else{
  		user_bio.find({})
      .populate({path:'experience'})
      .exec(function(err,experience) {
          if (err)
            return res.status('400').json({'err':true,errText:err});
          else
            return res.status('200').json({'err':false,experience});
      });
    }
}

exports.update = (req,res) => {
  const name = req.body.name;
  const title = req.body.title;
  const fromMonth = req.body.fromMonth;
  const toYear = req.body.toYear;
  const toMonth = req.body.toMonth;
  const fromYear = req.body.fromYear;
  const desc = req.body.desc;
  const current = req.body.current;
  const location = req.body.location;
  // const verify = req.body.verify;
  // const reference = req.body.reference;
  // ,'experience.$.reference':reference,'experience.$.verify':verify
  user_bio.update({'experience._id': req.params.experience_id},
    {'$set': {'experience.$.name':name,'experience.$.title':title,'experience.$.fromMonth':fromMonth,
    'experience.$.toYear':toYear,'experience.$.toMonth':toMonth,'experience.$.fromYear':fromYear,
    'experience.$.desc':desc,'experience.$.current':current,'experience.$.location':location}},function(err,model) {
    if(err){
      return res.status('400').json({'err':true,errText:err});
    }
    user_bio.findById(req.params.id, function (err, data) {
      console.log(data)
      var result = data.experience.filter(d => d._id == req.params.experience_id);
      return res.status('200').json({'err':false,experience:result});
    });
  });
}

exports.delete = (req,res) => {
  user_bio.findByIdAndUpdate(
    req.params.id,
   { $pull: { 'experience': {  _id: req.params.experience_id } }},{ upsert: true,new: true},function(err,model){
      if(err){
       	return res.status('400').json({'err':true,errText:err});
        }
        return res.status(200).send({err:false,data:true});
    });
}
