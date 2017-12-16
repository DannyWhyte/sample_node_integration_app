/*MAIN FUNCTION CALLED ON RECEIVING REQUEST
INPUT : REQUEST OF API
OUTPUT : RESPONSE OF API*/
var getSkilss = function(req, res) {
    var reqBody = req.body
    commonFunc.getData()
        .then(function(getSkillsResponse) {
            var toSend = { code: 200, message: getSkillsResponse }
            res.status(200).send(toSend);
        })
        .catch(function(err) {
            var toSend = { code: 400, message: err }
            res.status(200).send(toSend);
        })
}



module.exports.start = getSkilss;