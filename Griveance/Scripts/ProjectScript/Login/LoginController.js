﻿angular.module('GR').controller('LoginController', LoginController);

function LoginController($scope, Service) {
    var form = $(".login100-form");
    $scope.UserCredentialModel = {};
    
    $scope.Initialize = function () {
        
        Service.Get("api/Login/GetUser").then(function (result) { 
           
            $scope.UserCredentialModel.UserName = result.data.UserName
        })
    }

    $scope.SetRememberme = function () {
        $("#hdRememberme").val() === "True" ? $scope.UserCredentialModel.Rememberme = true : $scope.UserCredentialModel.Rememberme = false;        
        $scope.UserCredentialModel.Email = $("#hdEmail").val();
        $scope.UserCredentialModel.RandomSeed = $("#hdRandomSeed").val();
    };

    $scope.ValidateUser = function () {
         
        /*if (form.valid())*/ {

            //if ($scope.UserCredentialModel.Password !== "" && $scope.UserCredentialModel.Password !== null) {
            //    var hash = md5($scope.UserCredentialModel.RandomSeed + md5($scope.UserCredentialModel.Password).toUpperCase());
            //    $scope.UserCredentialModel.Password = hash.toUpperCase();
            //}

            Service.Post("api/Login/ValidateUserLogin", $scope.UserCredentialModel).then(function (rd) {
               
                if (rd.data.IsSucess) { 
                    location.href = baseURL +"Admin/Dashboard/Index"
                    
                } else { 
                    alert(rd.data);
                }
            });
        }
    };

    $scope.ValidateAndSendMail = function () {        
        Service.Post("Login/ValidateAndSendMail", { email: $("#forgorPasswordEmail").val() }).then(function (rd) {
            if (rd.data.result) {
                $("#forgorPasswordEmail").val('');
                alert("Reset password link sent your email, please reset your password using this link");               
            } else {
                var error = "";
                angular.forEach(rd.data.ErrorList, function (value, key) {
                    error = error + "<span>" + value + "</span><br>";
                });
                alert(error);            
            }
        });
    };
}