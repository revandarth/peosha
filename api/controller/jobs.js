'use strict';
const job = require('./../models/job.model'),
user = require('./../models/user.bio'),
mongoose = require('mongoose'),
nodemailer  = require("nodemailer"),
errorHandler 	= 	require('../controller/error.controller'),
creds 	= 	require('./cred'),
EmailTemplate = require('email-templates'),
path = require('path'),
Promise = require('bluebird');
//previewEmail = require('preview-email');
exports.create = (req,res) => {
    req.checkBody('designation','Please enter designation').notEmpty();
    req.checkBody('experience','Please select experience').notEmpty();
    req.checkBody('employment_type','Please enter employment type').notEmpty();
    req.checkBody('description','Please enter job description').notEmpty();
    req.checkBody('teamname','Please enter company name').notEmpty();
    req.checkBody('skills','Please select start month').notEmpty();
    req.checkBody('location','Please select start year').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(200).send(
          { err:true,
            errText:errors
          }
        )
    } else {
      var postdata = {
        'owner_id':req.params.id,
        'org_id':req.body.org_id,
        'designation':req.body.designation,
        'description':req.body.description,
        'employment_type':req.body.employment_type,
        'experience':req.body.experience,
        'teamname':req.body.teamname,
        'skills':req.body.skills,
        'location':req.body.location,
        'notification':{
          'notify_type':req.body.notify_type,
          'url':req.body.notify_url,
          'email_id':req.body.notify_email,
        }
      }
      var newJob = new job(postdata);
      newJob.save(postdata,(err,job) => {
        console.log(err)
          if(err)
            return res.status(400).send(
              { err:true,
                errText:errorHandler.getErrorMessage(err)
              }
            )
          else
          return res.status(200).json({'err':false,job})
      });
    }
};

exports.get = (req,res) => {
  job.aggregate([
    {"$match":{"_id":mongoose.Types.ObjectId(req.params.jobId)}},
    {  "$lookup" : {
       from: "employers",
       localField: "org_id",    // field in the jobs collection
       foreignField: "org_id",  // field in the employers collection
       as: "org_details"
      }
    },
    {
        "$project" : {
            "_id" : 1,
            "updatedAt":1,
            "saved_jobs":1,
            "createdAt": 1,
            "createdId" : 1,
            "teamname":1,
            "description":1,
            "notification":1,
            "location":1,
            "org_id" : 1,
            "skills":1,
            "experience":1,
            "employment_type":1,
            "designation":1,
            "teamname" : 1,
            "org_details.name" : 1,
            "org_details.logo" : 1,
            "org_details._id" : 1,
            "applicants":1
        }
    }
  ],function(err,data){
    if (err)
      return res.status('400').json({'err':true,errText:errorHandler.getErrorMessage(err)});
      data[0].applied = data[0].applicants.find(x => x.applicant_id == req.params.id);
      data[0].applied = (data[0].applied != null)?true:false;
      data[0].applicants = undefined;
      return res.status('200').json({'err':false,'jobs':data});
  });
}

exports.getByid = (req,res) => {
		job.find({owner_id:req.params.id},function(err,results) {
			if (err)
				return res.status('400').json({'err':true,errText:errorHandler.getErrorMessage(err)});
      var jobs = [];
      results.forEach(function(result){
          jobs.push(result);
      });
      return res.status('200').json({'err':false,jobs});

		});
}
exports.getAll = (req,res) => {
  job.aggregate([
    {"$unwind" : "$org_id"},
    { "$sort" : { "createdAt": -1 } },
    { "$limit" : 20 },
    {  "$lookup" : {
       from: "employers",
       localField: "org_id",    // field in the jobs collection
       foreignField: "org_id",  // field in the employers collection
       as: "org_details"
      }
    },
    {
        "$project" : {
          "_id" : 1,
          "updatedAt":1,
          "saved_jobs":1,
          "createdAt": 1,
          "createdId" : 1,
          "teamname":1,
          "description":1,
          "notification":1,
          "location":1,
          "org_id" : 1,
          "skills":1,
          "experience":1,
          "employment_type":1,
          "designation":1,
          "teamname" : 1,
          "org_details.name" : 1,
          "org_details.logo" : 1,
          "org_details._id" : 1,
          "org_details.org_id" : 1,
          "org_details.desc" : 1,
          "org_details.website" : 1
        }
    }
  ],function(err,data){
    if (err)
      return res.status('400').json({'err':true,errText:errorHandler.getErrorMessage(err)});
      return res.status('200').json({'err':false,'jobs':data});
  });
}
function sendEmail(data){
  let email = new EmailTemplate();
  var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: creds.data.user,
          pass: creds.data.pass
      }
  });
  email.renderAll('./../api/templates/jobs_attachment',{
      name: 'Elon'
    }).then((data) => {
      var opt = {
         from: '"Info team" <info@blockedin.com>',
         to: "blockedinteam@gmail.com",
         subject: data.subject,
         html:data.html,
         attachments: [{
            filename: 'image.jpg',
            path: './api/templates/jobs_attachment/user-icon.jpg',
            cid: 'unique@kreata.ee'
        }]
      }
      transport.sendMail(opt,(error, info) => {
        console.log(error)
        console.log(info)
           // if (error) {
           //     return res.status('400').json({err:true,errText:error});
           // }
           // console.log('Message sent: %s', info);
           // return res.status('200').json({data:data});
      });
   });
}

exports.apply = (req,res) => {
  var path = (req.file && req.file.path != "")? req.file.path:"";
  var postdata = {
    applicant_id:req.params.id,
    email:req.params.email,
    document:path
  }
  job.findByIdAndUpdate({"_id":req.params.jobId},
    { $push: {"applicants":postdata}},
    { safe: true, upsert: true,new: true},
    function(err, model) {
      if(err)
        return res.status('400').json({'err':true,errText:err});
        user.findById(model.owner_id,function(){

        });
        sendEmail(model)
        return res.status('200').json({'err':false,data:model});
   });
}
