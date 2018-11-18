'use strict';
const user_bio = 	require('../models/user.bio');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
exports.add = (req,res) => {
    const degree = req.body.degree;
    const major = req.body.major;
    const institution_name = req.body.institution_name;
    const start_year = req.body.start_year;
    const end_year = req.body.end_year;
    const gpa = req.body.gpa;
    const verifed = req.body.verifed;
    const reference = req.body.reference;
    const description = req.body.description;
    req.checkBody('degree','Please enter degree').notEmpty();
    req.checkBody('major','Please enter major').notEmpty();
    req.checkBody('start_year','Please select start year').notEmpty();
    req.checkBody('end_year','Please select end year').notEmpty();
    req.checkBody('gpa','Please enter gpa').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(200).send(
          { err:true,
            errText:errors
          }
        )
    } else {
      var education = {
        degree:degree,
        major:major,
        institution_name:institution_name,
        start_year:start_year,
        end_year:end_year,
        gpa:gpa,
        document:"",
        filename:"",
        verifed:verifed,
        reference:reference,
        description:description
      }
      user_bio.findOne({_id:req.params.id},function(err,bio){
        if(err)
          return res.status(400).send(
            { err:true,
              errText:errorHandler.getErrorMessage(err)
            }
          )
          // if(req.body.verify)
          //   sendMail(req.body)
          console.log(education)
          bio.education.push(education)
          bio.save(function(err1,data){
            console.log(data)
            if(err)
              return res.status(400).send(
                { err:true,
                  errText:errorHandler.getErrorMessage(err1)
                }
              )
               return res.status(200).json({'err':false,education:data.education[data.education.length - 1]})
          });
      });
    }
};
exports.upload = (req,res) => {
    const filePath = (typeof req.file !== "undefined")?req.file.path:"";
    user_bio.update({'education._id': ObjectId(req.params.education_id)},
      {'$set': {'education.$.document':req.file.path,'education.$.filename':req.file.originalname}},function(err,model) {
      if(err){
        return res.status('400').json({'err':true,errText:err});
      }
      user_bio.findById(req.params.id, function (err, data) {
        var result = data.education.filter(d => d._id == req.params.education_id)
        return res.status('200').json({'err':false,education:result});
      });
    });
};
exports.get = (req,res) => {
		user_bio.findOne({_id:req.params.id},function(err,bio) {
			if (err)
				return res.status('400').json({'err':true,errText:err});
			else{
          const education = bio.education;
          return res.status('200').json({'err':false,education});
      }
		});
}
exports.update = (req,res) => {
  const degree = req.body.degree;
  const major = req.body.major;
  const institution_name = req.body.institution_name;
  const start_year = req.body.start_year;
  const end_year = req.body.end_year;
  const gpa = req.body.gpa;
  //const verifed = req.body.verifed;
  //const document = req.body.document;
  const reference = req.body.reference;
  const description = req.body.description;
  //const filename = req.body.filename;
    user_bio.update({'education._id': req.params.education_id},
      {'$set': {'education.$.degree':degree,'education.$.major':major,'education.$.institution_name':institution_name,
      'education.$.start_year':start_year,'education.$.end_year':end_year,'education.$.gpa':gpa,'education.$.reference':reference,
      'education.$.description':description}},function(err,model) {
      if(err){
        return res.status('400').json({'err':true,errText:err});
      }
      user_bio.findById(req.params.id, function (err, data) {
        var result = data.education.filter(d => d._id == req.params.education_id)
        return res.status('200').json({'err':false,education:result});
      });
    });
}

exports.delete = (req,res) => {
  user_bio.findByIdAndUpdate(req.params.id,
    { $pull: { 'education': {  _id: req.params.education_id } }},{ upsert: true,new: true},function(err,model){
      if(err){
       	return res.status('400').json({'err':true,errText:err});
        }
        return res.status(200).send({err:false,data:true});
    });
}
