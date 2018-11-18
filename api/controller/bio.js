'use strict';
const user_bio = 	require('../models/user.bio'),
ObjectId = require('mongoose').Types.ObjectId,
job = require('../models/job.model'),
orgModel = require('../models/company'),
errorHandler 	= 	require('../controller/error.controller');
exports.update = (req,res) => {
    const errors = req.validationErrors();
    if (errors) {
        return res.status(200).send(
          { err:true,
            errText:errors
          }
        )
    } else {
      var postdata = {
        'firstname':req.body.firstname,
        'lastname':req.body.lastname,
        'headline':req.body.headline,
        'education':req.body.education,
        'industrytype':req.body.industrytype,
        'summary':req.body.summary,
        'current_designation':req.body.current_designation,
        'country':req.body.country,
        'state':req.body.state,
        'city':req.body.city
      }
      user_bio.findOneAndUpdate({"_id":parseInt(req.params.id)},{$set:{"bio":postdata}},{new: true},function(err, data){
        var bio = data.bio;
          if (err)
            return res.status('200').json({'err':true,errText:"Invalid Request"});
          else
            return res.status('200').json({'err':false,bio});
      });
    }
};

exports.get = (req,res) => {
  	var errors = req.validationErrors();
  	if(errors){
  		return res.status(200).send({
  			err:true,
  			errText:errors[0].msg
  		});
  	}else{
      // user_bio.aggregate([
      //   {"$unwind" : "$org_id"},
      //   { "$sort" : { "createdAt": -1 } },
      //   {  "$lookup" : {
      //      from: "employers",
      //      localField: "_id",    // field in the user bio collection
      //      foreignField: "org_id",  // field in the employers collection
      //      as: "org_details"
      //     }
      //   },
      //   {
      //       "$project" : {
      //         "_id" : 1,
      //         "updatedAt":1,
      //         "saved_jobs":1,
      //         "createdAt": 1,
      //         "createdId" : 1,
      //         "teamname":1,
      //         "description":1,
      //         "notification":1,
      //         "location":1,
      //         "org_id" : 1,
      //         "skills":1,
      //         "experience":1,
      //         "employment_type":1,
      //         "designation":1,
      //         "teamname" : 1,
      //         "org_details.name" : 1,
      //         "org_details.logo" : 1,
      //         "org_details._id" : 1,
      //         "org_details.org_id" : 1,
      //         "org_details.desc" : 1,
      //         "org_details.website" : 1
      //       }
      //   }
      // ]
  		user_bio.findOne({_id:parseInt(req.params.id)},function(err,data) {
  			if (err)
  				return res.status('400').json({'err':true,errText:errorHandler.getErrorMessage(err)});
  			else
  				return res.status('200').json({'err':false,data});
  		});
    }
}
exports.all = (req,res) => {
  user_bio.all((err,user) => {
      if (err)
        return err;
      user.forEach(users => {
        users.education = undefined;
        users.experience = undefined;
        users.skill = undefined;
        users.certification = undefined;
        users.company = undefined;
      })
      return res.status(200).send({err:false,user});
  })
}

exports.save_jobs = (req,res) => {
  var id = ObjectId.isValid(req.body.jobId);
  if(!id)
    return res.status('400').json({'err':true,errText:"Something went wrong"});
  user_bio.findByIdAndUpdate(req.params.id,
  { $push: {"saved_jobs":req.body.jobId}},
  { safe: true, upsert: true,new: true},
    function(err, model) {
      job.findByIdAndUpdate(req.body.jobId,
        { $push: {"saved_jobs":req.params.id}},
        {  safe: true, upsert: true,new: true},
          function(err, savedjob) {
            //return res.status('200').json({'err':false,'saved_jobs':savedjob});
          });
      if(err){
        return res.status('400').json({'err':true,errText:err});
      }
      return res.status('200').json({'err':false,'saved_jobs':model.saved_jobs});
   });
}

exports.getsavedjobs = (req,res) => {
  user_bio.findById(req.params.id)
  .populate('saved_jobs', 'designation description employment_type experience teamname skills location createdAt updatedAt orgId')
  .select('saved_jobs')
  .exec(function (err, jobs) {
    // var saved_jobs = [];
    // jobs.saved_jobs.forEach(a => {
    //     orgModel.getOrg({_id:a.orgId},function(err1,data){
    //         a.org_details = data;
    //         saved_jobs.push(a);
    //     });
    //  })
     if (err)
         return res.status('400').json({'err':true,errText:err});
       else
           return res.status('200').json({'err':false,jobs});
   })
}
