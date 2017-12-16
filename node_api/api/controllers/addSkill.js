/*FUNCTION TO PROCESS AND PUSH NEW JSON DATA IN DATA.JSON ARRAY
INPUT : DATA OF DATA.JSON FILE,REQUEST OF API
OUTPUT : DATA OF DATA.JSON FILE*/
var addDataInArray = function(data, request) {
    var deferred = q.defer();
    // console.log("in delete file function -->", filename)
    var maxId = _.max(data, function(singleData) { return parseInt(singleData.id); }).id;
    var newId = parseInt(maxId) + 1;
    // console.log("iddddddddddddddddd", maxId, newId);
    var json = { id: newId.toString(), name: request.name.trim(), status: request.status }
    data.push(json);
    deferred.resolve(data)
    return deferred.promise;
}

/*FUNCTION TO VALIDATE INPUT IN REQUEST
INPUT : REQUEST OF API
OUTPUT : ERROR / REQUEST BODY ON SUCCESS*/
var validateInput = function(request) {
    // console.log("validation---->+++++", request)
    var deferred = q.defer();
    if (request.name == undefined && request.status == undefined) {
        // console.log("inside if")
        deferred.reject("Please provide the request body")
    } else {
        if (!request.name || !_.isString(request.name)) {
            deferred.reject("Please provide name in request body of type string")
        } else if (_.isString(request.status) || _.isNumber(request.status)) {
            deferred.reject("Please provide status of type boolean in request body")
        } else {
            deferred.resolve(request)
        }
    }

    return deferred.promise;
}

/*MAIN FUNCTION CALLED ON RECEIVING REQUEST
INPUT : REQUEST OF API
OUTPUT : RESPONSE OF API*/
var addSkill = function(req, res) {
    var reqBody = req.body
    validateInput(reqBody)
        .then(function(validationResponse) {
            return commonFunc.getData()
        })
        .then(function(getSkillsResponse) {
            return addDataInArray(getSkillsResponse, reqBody)
        })
        .then(function(addDataInArrayResponse) {
            // console.log(addDataInArrayResponse)
            return commonFunc.insertData(JSON.stringify(addDataInArrayResponse))
        })
        .then(function(insertResponse) {
            // console.log(insertResponse)
            var toSend = { code: 200, message: insertResponse }
            res.status(200).send(toSend);
        })
        .catch(function(err) {
            var toSend = { code: 400, message: err }
            res.status(200).send(toSend);
        })
}



module.exports.start = addSkill;