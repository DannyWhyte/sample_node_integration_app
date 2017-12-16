/*FUNCTION TO PROCESS AND EDIT JSON DATA IN DATA.JSON ARRAY
INPUT : DATA OF DATA.JSON FILE,REQUEST OF API
OUTPUT : DATA OF DATA.JSON FILE*/
var editStatusArrray = function(data, request) {
    var deferred = q.defer();
    var specificJson = _.findWhere(data, { id: request.id });
    if (!specificJson) {
        deferred.reject("ID not present")
    } else {
        var indexOfArray = data.indexOf(specificJson)
        data[indexOfArray].status = request.status
        deferred.resolve(data)
    }
    return deferred.promise;
}

/*FUNCTION TO VALIDATE INPUT IN REQUEST
INPUT : REQUEST OF API
OUTPUT : ERROR / REQUEST BODY ON SUCCESS*/
var validateInput = function(request) {
    // console.log("validation---->+++++", request)
    var deferred = q.defer();
    if (request.status == undefined && request.id == undefined) {
        // console.log("inside if")
        deferred.reject("Please provide the request body")
    } else {
        if (!_.isBoolean(request.status)) {
            deferred.reject("Please provide status in request body of type boolean")
        } else if (!request.id) {
            deferred.reject("ID not present in body")
        } else {
            deferred.resolve(request)
        }
    }

    return deferred.promise;
}

/*MAIN FUNCTION CALLED ON RECEIVING REQUEST
INPUT : REQUEST OF API
OUTPUT : RESPONSE OF API*/
var editStatus = function(req, res) {
    var reqBody = req.body
    reqBody.id = req.query.id
    validateInput(reqBody)
        .then(function(validationResponse) {
            return commonFunc.getData()
        })
        .then(function(getSkillsResponse) {
            return editStatusArrray(getSkillsResponse, reqBody)
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



module.exports.start = editStatus;