app.controller('testController', function($scope, $http) {

    $scope.skillList = [];
    $scope.searchSkill = {}
    $scope.showAdd = false;
    $scope.showError = false;
    $scope.addSkills = {
        "id": "",
        "name": "",
        "status": null
    }
    $scope.getData = function() {
        $http.get('http://127.0.0.1:1234/api/skills').then(function(res) {
                $scope.skillList = res.data.message;
                $scope.error = "";
                $scope.showError = false;

            })
            .catch(function(error) {
                $scope.showError = true;
                $scope.error = error;
            })
    }
    $scope.getData();


    $scope.addSkill = function() {
        $http
            .post('http://127.0.0.1:1234/api/addSkill', { name: $scope.addSkills.name, status: $scope.addSkills.status })
            .then(function(res) {
                if (res.data.code != 400) {
                    alert('Skill added successfully!');
                    $scope.addSkills = {}
                    $scope.showError = false;
                    $scope.error = "";
                    $scope.getData();
                } else {
                    $scope.showError = true;
                    $scope.error = res.data.message;
                }
            })
            .catch(function(error) {
                $scope.showError = true;
                $scope.error = error;
            })
    }

    $scope.changeSkill = function(obj) {
        // var a = $scope.skillList.indexOf(obj);
        // $scope.skillList[a] = {
        //     "id": obj.id,
        //     "name": obj.name,
        //     "status": obj.status
        // }
        $http
            .put('http://127.0.0.1:1234/api/update?id=' + obj.id, { name: obj.name })
            .then(function(res) {
                if (res.data.code != 400) {
                    alert('Skill updated successfully!');
                    $scope.showError = false;
                    $scope.error = "";
                    $scope.getData();
                } else {
                    $scope.showError = true;
                    $scope.error = res.data.message;
                }
            })
            .catch(function(error) {
                $scope.showError = true;
                $scope.error = error;
            })
        $scope.openEdit = false;

    }

    $scope.changeStatus = function(jsonData, obj) {
        var statusInput = obj === 'approved' ? true : (obj === 'rejected' ? false : "")
        if (jsonData != 'add') {
            $http
                .put('http://127.0.0.1:1234/api/approve?id=' + jsonData.id, { status: statusInput })
                .then(function(res) {
                    if (res.data.code != 400) {
                        alert("Your skill is " + obj)
                        $scope.showError = false;
                        $scope.error = "";
                        $scope.getData();
                    } else {
                        $scope.showError = true;
                        $scope.error = res.data.message;
                    }
                })
                .catch(function(error) {
                    $scope.showError = true;
                    $scope.error = error;
                })
        }
    }

    $scope.search = function(search) {
        $http
            .get('http://127.0.0.1:1234/api/search?name=' + search)
            .then(function(res) {
                if (res.data.code != 400) {
                    $scope.skillList = res.data.message;
                    $scope.error = "";
                    $scope.searchSkill = {}
                    $scope.showError = false;
                } else {
                    $scope.showError = true;
                    $scope.error = res.data.message;
                }
            })
            .catch(function(error) {
                $scope.showError = true;
                $scope.error = error;
            })
    }

    $scope.clearSearch = function() {
        $scope.searchSkill = {};
        $scope.getData();
        $scope.error = "";
        $scope.showError = false;
    }
})