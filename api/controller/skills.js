'use strict';
const user_bio = 	require('../models/user.bio');

exports.add = (req,res) => {
    const skill = req.body.skill;
    req.checkBody('skill','Please enter skills').notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        return res.status(200).send({ err:true,errText:errors})
    } else {
      user_bio.findByIdAndUpdate(req.params.id,
      { $push: {"skill": req.body}},
      {  safe: true, upsert: true,new: true},
        function(err, model) {
          if(err){
            return res.status('400').json({'err':true,errText:err});
          }
          var length = model.skill.length - 1;
          return res.status('200').json({'err':false,skill:model.skill[length]});
       });
    }
};

exports.get = (req,res) => {
    user_bio.findOne(
        { _id: req.params.id},
        function(err,bio) {
          if (err)
            return res.status('400').json({'err':true,errText:err});
          else{
            var skill = bio.skill;
            return res.status('200').json({'err':false,skill});
          }
        }
    )
}
exports.update = (req,res) => {
    req.checkBody('skill', 'Skills are missing').notEmpty();
  	var errors = req.validationErrors();
  	if(errors){
  		return res.status(200).send({
  			err:true,
  			errText:errors[0].msg
  		});
  	}else{
      const skill = req.body.skill;
      user_bio.findOne(
          { _id: req.params.id},
          function(err,bio) {
            if (err)
              return res.status('400').json({'err':true,errText:err});
            else{
              var count = 0;
              bio.skill = [];
              skill.forEach(function(obj) {
                  obj.index = count + 1;
                  bio.skill.push(obj);
              });
              bio.save(function(err,final){
                var skill = final.skill;
                return res.status('200').json({'err':false,skill});
              })
            }
          }
      )
    }
}
