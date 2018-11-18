const user_bio = 	require('../models/user.bio'),
errorHandler 	 = 	require('../controller/error.controller');
module.exports.add = (req,res) => {
  const errors = req.validationErrors();
  if (errors) {
  		return res.status(400).send({
  			err:true,
  			errText:errors
  		});
	}else{
      var certification = {
          certification_name : req.body.certification_name,
          authority : req.body.authority,
          license_number : req.body.license_number,
          start_year : req.body.start_year,
          end_year : req.body.end_year,
          certification_url : req.body.certification_url,
          certification_expire : req.body.certification_expire
      }
      user_bio.findOne({_id:req.params.id},function(err,bio){
        if(err)
          return res.status('400').json({'err':true,errText:err});
        bio.certification.push(certification);
        bio.save(function(err, cer) {
            if(err)
              return res.status('400').json({'err':true,errText:err});
            var length = cer.certification.length - 1;
            return res.status('200').json({'err':false,certification:cer.certification[length]});
         });
      });
    }
}
module.exports.get = (req,res) => {
  const errors = req.validationErrors();
  if (errors) {
		return res.status(200).send({
			err:true,
			errText:errors
		});
	}else{
    user_bio.findById(req.params.id)
    //.populate('certification')
    .exec(function(err,bio) {
        if (err)
          return res.status('400').json({'err':true,errText:err});
        else{
          ///certification.index = bio.certification.length;
          var certification = bio.certification;
            return res.status('200').json({'err':false,'certification':certification});
        }
    })
  }
}

module.exports.update = (req,res) => {
  const errors = req.validationErrors();
  if (errors) {
		return res.status(400).send({
			err:true,
			errText:errors
		});
	}else{
    const certification_name = req.body.certification_name;
    const authority = req.body.authority;
    const license_number = req.body.license_number;
    const start_year = req.body.start_year;
    const end_year = req.body.end_year;
    const certification_url = req.body.certification_url;
    const certification_expire = req.body.certification_expire;
    user_bio.update({'certification._id': req.params.certification_id},
      {'$set': {'certification.$.certification_name':certification_name,'certification.$.authority':authority,'certification.$.license_number':license_number,
      'certification.$.start_year':start_year,'certification.$.end_year':end_year,'certification.$.certification_url':certification_url,'certification.$.certification_expire':certification_expire}},function(err,model) {
      if(err){
        return res.status('400').json({'err':true,errText:err});
      }
      user_bio.findById(req.params.id, function (err, data) {
        var result = data.certification.filter(d => d._id == req.params.certification_id)
        return res.status('200').json({'err':false,certification:result});
      });
    });
  }
}

exports.delete = (req,res) => {
  user_bio.findByIdAndUpdate(req.params.id,
    { $pull: { 'certification': {  _id: req.params.certification_id } }},{ upsert: true,new: true},function(err,model){
      if(err){
       	return res.status('400').json({'err':true,errText:err});
        }
        return res.status(200).send({err:false,data:true});
    });
}
