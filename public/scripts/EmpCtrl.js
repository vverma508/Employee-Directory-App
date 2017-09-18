var empCtrl = function($http, $scope) {
    $scope.Employees = [];

    $scope.employee = {};
    $scope.employee.name = "";
    $scope.employee.email = "";
    $scope.employee.dob = "";
    $scope.employee.department = "";
    $scope.employee.gender = "";
    $scope.employee.age = 0;

    $scope.getEmployees = function() {

        $http.get("/read").then(function(response) {
            $scope.Employees = response.data;
        });
    }
    $scope.getEmployees();

    $scope.UpdateEmploye = function(emp) {
        $http.post("/update", { employee: emp }).then(function(response) {
            $scope.Employees = response.data;
        })
    }

    $scope.CreateEmploye = function(emp) {
        $http.post("/create", { employee: emp }).then(function(response) {
            $scope.Employees = response.data;
        })
    }

    $scope.DeleteEmploye = function(emailId, index) {
        $http.post("/delete", { email: emailId }).then(function(response) {
            if (response.data) {
                $scope.Employees.splice(index, 1);
            }
        })
    }

    $scope.getAge = function(emp) {

        var date = new Date();
        var empBirthYear = emp.dob.getFullYear();
        var latestYear = date.getFullYear();
        emp.age = latestYear - empBirthYear;
    }

    $scope.populateForm = function(emp) {
        $scope.employee.name = emp.Name;
        $scope.employee.email = emp.Email;
        $scope.employee.dob = emp.DOB;
        $scope.employee.department = emp.Department
        $scope.employee.gender = emp.Gender;
        $scope.employee.age = emp.Age;
    }

}