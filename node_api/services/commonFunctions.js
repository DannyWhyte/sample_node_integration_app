var fs = require('fs');
/*JS FILE TO PLACE COMMONLY USED FUNCTIONS*/



/*FUNCTION TO GET DATA FROM A FILE USING FS
INPUT : -
OUTPUT : DATA FROM A FILE 
 */
var getData = function() {
    var deferred = q.defer();
    fs.readFile(absolutePath + '/config/data.json', 'utf-8', function(err, data) {
        if (err) {
            deferred.resolve({
                status: "fail",
                error: err,
                message: "Error while reading file"
            })
        } else {
            deferred.resolve(JSON.parse(data))
        }
    });
    return deferred.promise;
}

/*FUNCTION TO INSERT DATA/CREATE NEW FILE USING FS
INPUT : DATA
OUTPUT : SUCCESS/FAIL 
 */
var insertData = function(data) {
    var deferred = q.defer();
    fs.writeFile(absolutePath + '/config/data.json', data, function(err) {
        if (err) {
            deferred.reject({
                status: "fail",
                error: err.message,
                message: "Error while creating file"
            });
        } else {
            deferred.resolve('Success')
        }
    });
    return deferred.promise;
}

module.exports.getData = getData;
module.exports.insertData = insertData;