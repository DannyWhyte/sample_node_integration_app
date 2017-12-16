/*FUNCTION TO SEARCH IN DATA OF DATA.JSON
INPUT : DATA OF DATA.JSON FILE,REQUEST OF API
OUTPUT : DATA FOUND FROM DATA.JSON FILE*/
var findData = function(data, request) {
    var deferred = q.defer();
    var specificJson = _.where(data, { name: request });
    // console.log(specificJson)
    if (_.isEmpty(specificJson)) { deferred.reject('No data found') }
    deferred.resolve(specificJson)
    return deferred.promise;
}

/*FUNCTION TO VALIDATE INPUT IN REQUEST
INPUT : REQUEST OF API
OUTPUT : ERROR / REQUEST BODY ON SUCCESS*/
var validateInput = function(request) {
    // console.log("validation---->+++++", request)
    var deferred = q.defer();
    if (!request || request == null || !_.isString(request)) {
        deferred.reject("Please provide name in request body of type string")
    } else {
        deferred.resolve(request)
    }
    return deferred.promise;
}

/*MAIN FUNCTION CALLED ON RECEIVING REQUEST
INPUT : REQUEST OF API
OUTPUT : RESPONSE OF API*/
var searchSkills = function(req, res) {
    var reqBody = req.query.name
    validateInput(reqBody)
        .then(function(validationResponse) {
            return commonFunc.getData()
        })
        .then(function(getSkillsResponse) {
            return findData(getSkillsResponse, reqBody)
        })
        .then(function(searchResponse) {
            // console.log(insertResponse)
            var toSend = { code: 200, message: searchResponse }
            res.status(200).send(toSend);
        })
        .catch(function(err) {
            var toSend = { code: 400, message: err }
            res.status(200).send(toSend);
        })
}



module.exports.start = searchSkills;