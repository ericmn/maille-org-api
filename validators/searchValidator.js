const { query, matchedData, validationResult } = require('express-validator');

const VALID = {
    'limit': { min: 1, max: 20 },
    'offset': { min: 0 }
};


exports.validate = [
    query('limit').optional().isInt(VALID['limit']),
    query('offset').optional().isInt(VALID['offset']),
    //query('sort').optional()
];

exports.reject = (req, res, next) => {
    const validation = validationResult(req);
    return validation.isEmpty() ? next() : res.json(validation.errors);
}

exports.sanitize = [
    query('limit').optional().toInt(),
    query('offset').optional().toInt()
];

//exports.redirect = (req, res, next) => {
//    console.log('redirect');
//    const validation = validationResult(req);
//    console.log(validation.errors);
//    const data = matchedData(req,{includeOptionals: true});
//    console.log(data)
//    next();
//}

