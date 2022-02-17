const db = require('../../data/db-config');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  let result = await db('schemes')
    .where('scheme_id', req.params.scheme_id).first();
  if(result){
    next();
  }else{
    next({status: 404, message: `scheme with scheme_id ${req.params.scheme_id} not found`});
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body;
  if(typeof scheme_name === 'string' && scheme_name){
    next();
  }else{
    next({status: 400, message:'invalid scheme_name'});
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const {step_number, instructions} = req.body;
  if(typeof step_number === 'number' && step_number > 1 && typeof instructions === 'string' && instructions){
    next();
  }else{
    next({status: 400, message:'invalid step'});
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
