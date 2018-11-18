const org_model = require('../models/company'),
counter 	= 	require('../models/counter'),
errorHandler 	 = 	require('../controller/error.controller');
module.exports.addCompany = (req,res) => {
  req.checkBody('name','Please enter Organization name').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
		return res.status(400).send({
			err:true,
			errText:errorHandler.getErrorMessage(errors)
		});
	}else{
    var id = 0
    counter.findByIdAndUpdate({_id:'org_id'}, {$inc: { seq: 1} },{ new: true }, function(error, count){
      if(error)
      return res.status(400).send({err:true,errText:error});
      var body = {
        owner_id : req.params.id,
        name : req.body.name,
        agreed:req.body.agreed,
        org_id:count.seq
      }
      var newOrg = new org_model(body);
      newOrg.save(newOrg,(err,company) => {
          if(err)
            return res.status(400).send({
              err:true,
              errText:errorHandler.getErrorMessage(err)
            })
          else{
            return res.status(200).send({
              err:false,company
            })
          }
      })
    });
 }
}
module.exports.getCompany = (req,res) => {
  req.checkParams('id','user id is missing').notEmpty();
  req.checkParams('orgid','org id is missing').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
		return res.status(400).send({
			err:true,
			errText:errors
		});
	}else{
    var body = {
        "org_id": req.params.orgid
    }
    org_model.getOrg(body,function(err,company){
        if(err)
          return res.status(400).send({
            err:true,
            errText:errorHandler.getErrorMessage(err)
          })
          return res.status(200).send({err:false,company});
    })
  }
}
module.exports.addLocation = (req,res) => {
  req.checkParams('id','user id is missing').notEmpty();
  req.checkParams('orgid','org id is missing').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
		return res.status(400).send({
			err:true,
			errText:errors
		});
	}else{
    var location = {
      building_name:req.body.building_name,
      address1:req.body.address1,
      address2:req.body.address2,
      state:req.body.state,
      city:req.body.city,
      country:req.body.country,
      head_quarters:req.body.head_quarters
    }
    user_bio.update({'org_id':req.params.orgid},
    { $push: {"location":location}},
    {  safe: true, upsert: true,new: true},
      function(err, model) {
        if(err){
          return res.status('400').json({'err':true,errText:err});
        }
        var length = model.location.length - 1;
        return res.status('200').json({'err':false,location:model.location[length]});
     });
  }
}

module.exports.update = (req,res) => {
  req.checkParams('id','user id is missing').notEmpty();
  req.checkParams('orgid','org id is missing').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
		return res.status(400).send({
			err:true,
			errText:errors
		});
	}else{
    var postData = {
        'location.$.building_name':req.body.building_name,
        'location.$.address1':req.body.address1,
        'location.$.address2':req.body.address2,
        'location.$.country':req.body.country,
        'location.$.state':req.body.state,
        'location.$.city':req.body.city,
        'location.$.head_quarters':req.body.head_quarters
    }
    org_model.update({'location._id': req.params.locId},
      {'$set': postData},function(err,model) {
        console.log(model)
      if(err){
        return res.status('400').json({'err':true,errText:err});
      }
      org_model.find({'org_id':req.params.orgid,'location._id': req.body._id}, function (err, data) {
        return res.status('200').json({'err':false,location:data});
      });
    });
  }
}

module.exports.deleteLocation = (req,res) => {
  req.checkParams('id','user id is missing').notEmpty();
  req.checkParams('orgid','org id is missing').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
		return res.status(400).send({
			err:true,
			errText:errors
		});
	}else{
    var body = {
        "org_id": req.params.orgid,
        "owner":req.params.id
    }
    org_model.getOrg({ _id: req.params.orgid},function(err,employee){
      if(err)
        return res.status(400).send({
          err:true,
          errText:errorHandler.getErrorMessage(err)
        })
        var index = -1;
        employee.location.filter(emp =>{
            if(req.body.index == emp.index)
              index = emp.index;
        });
        //console.log(index);
        employee.location.splice(index,1);
        employee.save(function(err,company){
          if(err)
            return res.status(400).send({
              err:true,
              errText:errorHandler.getErrorMessage(err)
            })
            var location = company.location;
            return res.status(200).send({err:false,location});
        })
    })
  }
}

module.exports.updateCompany = (req,res) => {
  req.checkBody('website','Please enter website').notEmpty();
  req.checkBody('industry','Please enter industry type').notEmpty();
  req.checkBody('founded','Please founded year').notEmpty();
  req.checkBody('size','Please enter employee strength').notEmpty();
  req.checkBody('company_type','companytype cannot empty').notEmpty();
  req.checkBody('desc','Please enter description').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
		return res.status(400).send({
			err:true,
			errText:errors
		});
	}else{
    org_model.findOne({"org_id":parseInt(req.params.orgid),"owner_id":parseInt(req.params.id)},function(err,employer){
        if (err)
          return res.status('400').json({'err':true,errText:errorHandler.getErrorMessage(err)});
          employer.website = req.body.website;
          employer.founded = req.body.founded;
          employer.size = req.body.size;
          employer.company_type = req.body.company_type;
          employer.industry = req.body.industry;
          employer.desc = req.body.desc;
          employer.specialities = req.body.specialities;
          employer.save(function(error,emp){
            if (error)
              return res.status('400').json({'err':true,errText:errorHandler.getErrorMessage(error)});
            else
              return res.status('200').json({'err':false,emp});
          })
    });
  }
}

module.exports.getAllEmployers = (req,res) => {
  org_model.getEmployersByUser({"owner_id":req.params.id},function(err,result){
      if (err)
        return res.status('400').json({'err':true,errText:errorHandler.getErrorMessage(err)});
        var employers = [];
        result.forEach((employee) => {
            employers.push({
              org_id:employee.org_id,
              name:employee.name,
              _id:employee._id,
              admins:employee.admins
            })
        })
        return res.status('200').json({'err':false,employers});
  });
}
