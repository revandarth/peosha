'use strict';
const user 			= 	require('./../models/user'),
userbio         = 	require('./../models/user.bio'),
errorHandler 	  = 	require('./error.controller'),
//nodemailer 		= 	require('nodemailer'),
passport 			  = 	require('passport'),
path				    =	  require('path'),
jwt 			 	    = 	require('jsonwebtoken'),
db              =   require('./../../config/database'),
//crypto				=	  require('crypto'),
async 				  = 	require('async');

exports.signup = function(req,res){
  req.checkBody('name','Please enter username').notEmpty();
  req.checkBody('email','Please enter email').notEmpty();
  //req.checkBody('type','Please enter registration type').notEmpty();
  req.checkBody('email','Please enter valid email').isEmail();
  //req.checkBody('password','Please enter password').notEmpty();
  const errors = req.validationErrors();
	//console.log(errors[0].msg)
	if (errors) {
		return res.status(400).send({
			err:true,
			errText:errors
		});
	}
  else{
      var newdata = {
        'name':req.body.name,
        'email':req.body.email,
        'password':req.body.password,
        'role':1
      }
      var query = {email:req.body.email}
      user.getUserByQuery(query,(err,isData) =>{
          if (err){
            return res.status(400).send(
              { err:true,
                errText:errorHandler.getErrorMessage(err)
              }
            )
          }
          if(isData)
            return res.status(400).send({err:true,errText:'User is already registered'});
          else if(!isData){
             user.incrementUser((err,counter) => {
                if (err)
                  return res.status(400).send({ err:true,errText:errorHandler.getErrorMessage(err)});

                  newdata._id = counter.seq;
                  var newUser = new user(newdata);
                  newUser.save(newdata,(err,data) => {
                    if (err) {
                        return res.status(400).send(
                          { err:true,
                            errText:errorHandler.getErrorMessage(err)
                          }
                        )
                    } else {
                      data.password = undefined;
                      var dataBio = {_id:data._id,bio:{firstname:data.name}}
                      var newbio = new userbio(dataBio);
                      newbio.save(dataBio);
                      return res.status(200).send({err:false,data});
                    }
                  });
              });
          }
      })
    }
};

exports.signin = (req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    req.checkBody('email','Please enter email').notEmpty();
    req.checkBody('email','Please enter valid email').isEmail();
    req.checkBody('password','Please enter password').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(
          { err:true,
            errText:errors
          }
        )
    } else {
      var query = {email:email}
        user.getUserByQuery(query,(err,data) =>{
            if (err)
              return err;
            if(!data)
              return res.status(400).send({err:true,errText:'User is not registered'});
            else if(data){
              const isValid = user.comparePassword(password,data.password);
              data.password = undefined;
              if(!isValid)
                  return res.status(400).send({err:true,errText:'Password is incorrect'});
              else
                return res.status(200).send({err:false,data});
            }
        })
    }
};
exports.getusers = (req,res) =>{
    const query = {'email':email}
    user.getUserByQuery(query,(err,data) =>{
        if (err)
          return err;
        if(!data)
          return res.status(400).send({err:true,errText:'User is not registered'});
        else if(data){
          const isValid = user.comparePassword(password,data.password);
          data.password = undefined;
          if(!isValid)
              return res.status(400).send({err:true,errText:'Password is incorrect'});
          else
            return res.status(200).send({err:false,data});
        }
    })
};
exports.all = (req,res) => {
  user.all((err,user) => {
      if (err)
        return err;
      user.forEach(users => {
        users.password = undefined;
      })
      return res.status(200).send({err:false,user});
  })
}
exports.getUserById = (req,res) => {
  user.getUserById(req.params.id,(err,data) => {
      if (err)
        return res.status(400).send({err:true,errText:err});
          data.password = undefined;
          return res.status(200).send({err:false,data});
  })
}
