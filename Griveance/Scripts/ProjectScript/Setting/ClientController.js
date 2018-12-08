angular.module('CPApp').controller('ClientController', ClientController);
angular.module('CPApp').controller('ClientContactInfoController', ClientContactInfoController);
angular.module('CPApp').controller('ClientStatutoryInfoController', ClientStatutoryInfoController);
angular.module('CPApp').controller('ClientServiceController', ClientServiceController);
angular.module('CPApp').controller('ClientEmployeeController', ClientEmployeeController);
angular.module('CPApp').controller('DueDateController', DueDateController);
angular.module('CPApp').controller('ClientGroupMemberController', ClientGroupMemberController);
angular.module('CPApp').controller('ClientPortalController', ClientPortalController);

function ClientController($scope, $filter, NgTableParams, Service, $rootScope) {

    var form = $("#frmCRUD");

    $scope.ClientModel = { Gender: 'NA', PackageFrequency: '' };

    $scope.Selected = false;

    $scope.GetList = function (id) {
        Service.Get("Client/GetList/" + id).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.Columns = rd.data.columns;
                $scope.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetSingal = function (id) {
        Service.Get("Client/GetSingle/" + id).then(function (rd) {
            if (rd.data.result === 1) {
                $scope.ClientModel = rd.data.model;
                $scope.ClientModel.BirthOrStartDate = $filter('formatedDate')($scope.ClientModel.BirthOrStartDate, shortDateFormat);
                $scope.ClientModel.CreatedDate = $filter('formatedDate')($scope.ClientModel.CreatedDate, fullDateFormat);
                $scope.ClientModel.ModifiedDate = $filter('formatedDate')($scope.ClientModel.ModifiedDate, fullDateFormat);
                $scope.GetDivisionByEntityDropdown();
                $scope.GetBranchByDivisionDropdown();
                $scope.GetClientStateByCountryDropdown();
                $scope.GetClientCityByStateDropdown();
                $rootScope.ClientModel = $scope.ClientModel;
            }
            else if (rd.data.result === -1) {
                $rootScope.ClientModel = null;
                ShowMessage(rd.data.result, "There is no record found, redirecting to List Page.", function () {
                    document.location.href = baseURL + "Client/List ";
                });
            }
            else {
                $rootScope.ClientModel = null;
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.IntialiseData = function (id) {

        $scope.GetAllDropdown();

        if (id > 0) {
            $scope.GetSingal(id);
            $scope.Selected = true;
        } else {
            $scope.Selected = false;
        }
    };

    $scope.GetAllDropdown = function () {
        Service.Get("Client/GetAllDropdown").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.EntityList = rd.data.EntityList;
                $scope.ClientBusinessTypeList = rd.data.ClientBusinessTypeList;
                $scope.ClientExtraDrodownList = rd.data.ClientExtraDrodownList;
                $scope.ClientBusinessVerticalList = rd.data.ClientBusinessVerticalList;
                $scope.ClientBusinessCategoryList = rd.data.ClientBusinessCategoryList;
                $scope.ClientCountryList = rd.data.ClientCountryList;
                $scope.ClientStatusList = rd.data.ClientStatusList;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetDivisionByEntityDropdown = function () {
        Service.Get("Dropdown/GetDivisionByEntityDropdown/" + $scope.ClientModel.EntityId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.DivisionList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetBranchByDivisionDropdown = function () {
        Service.Get("Dropdown/GetBranchByDivisionDropdown/" + $scope.ClientModel.DivisionId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.BranchList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetClientStateByCountryDropdown = function () {
        Service.Get("Dropdown/GetClientStateByCountryDropdown/" + $scope.ClientModel.ClientCountryId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientStateList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetClientCityByStateDropdown = function () {
        Service.Get("Dropdown/GetClientCityByStateDropdown/" + $scope.ClientModel.ClientStateId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientCityList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.AddUpdate = function () {
        if (!$scope.Selected) {
            if (form.valid()) {
                Service.Post("Client/Add", { objModel: $scope.ClientModel }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        CustomizeApp.AddMessage();
                        document.location.href = baseURL + "Client/Index/" + rd.data.ClientId;
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        } else {
            if (form.valid()) {
                Service.Post("Client/Update", { objModel: $scope.ClientModel }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        $scope.GetSingal(rd.data.ClientId);
                        CustomizeApp.UpdateMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        }
    };

    $scope.Delete = function (item) {
        bootbox.confirm(recordConfirmDelete, function (result) {
            if (result) {
                Service.Post("Client/Delete", { objModel: angular.copy(item) }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.GetList();
                        CustomizeApp.DeleteMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        });
    };

    $scope.Clear = function () {
        $scope.ClientModel = { Gender: 'NA', PackageFrequency: '' };
    };

    //Search

    var frmSearchClientList = $("#frmSearchClientList");
    frmSearchClientList.validate();

    $scope.GetEntityDropdown = function () {
        Service.Get("Dropdown/GetEntityDropdown").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.EntityList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.Search = function () {
        if (frmSearchClientList.valid()) {
            $scope.GetList($scope.ClientModel.BranchId);
        }
    };
}

function ClientContactInfoController($scope, $filter, NgTableParams, Service, $rootScope) {

    var frmClientContactInfo = $("#frmClientContactInfo"); frmClientContactInfo.validate();

    $scope.Model = {};

    $scope.Selected = false;

    $scope.GetList = function () {        
        Service.Get("ClientContactInfo/GetList").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.Columns = rd.data.columns;
                $scope.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.Select = function (item) {
        $scope.Selected = true;
        $scope.Model = angular.copy(item);  
        ActiveRow(item);
    };

    $scope.AddUpdate = function () {

        if ($rootScope.ClientModel !== null && $rootScope.ClientModel !== undefined) {
            $scope.Model.EntityId = $rootScope.ClientModel.EntityId;
            $scope.Model.DivisionId = $rootScope.ClientModel.DivisionId;
            $scope.Model.BranchId = $rootScope.ClientModel.BranchId;
            $scope.Model.ClientId = $rootScope.ClientModel.ClientId;
        }

        if (!$scope.Selected) {
            if (frmClientContactInfo.valid()) {
                Service.Post("ClientContactInfo/Add", { objModel: $scope.Model }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        $scope.GetList();
                        CustomizeApp.AddMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        } else {
            if (frmClientContactInfo.valid()) {
                Service.Post("ClientContactInfo/Update", { objModel: $scope.Model }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        $scope.GetList();
                        CustomizeApp.UpdateMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        }
    };

    $scope.Delete = function (item) {
        bootbox.confirm(recordConfirmDelete, function (result) {
            if (result) {
                Service.Post("ClientContactInfo/Delete", { objModel: angular.copy(item) }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.GetList();
                        CustomizeApp.DeleteMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        });
    };

    $scope.Clear = function () {
        $scope.Model = null;
        $scope.Selected = false;        
    };
}

function ClientStatutoryInfoController($scope, $filter, NgTableParams, Service, $rootScope) {

    var frmClientStatutoryInfo = $("#frmClientStatutoryInfo"); frmClientStatutoryInfo.validate();

    $scope.Model = { RenewalRequired: "No", StatutaryStatus: "Active" };

    $scope.Selected = false;

    $scope.GetClientStatutoryByClientDropdown = function () {
        Service.Get("Dropdown/GetClientStatutoryByClientDropdown/" + $rootScope.ClientModel.ClientId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.StatutoryList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetList = function () {
        Service.Get("ClientStatutoryInfo/GetList").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.Columns = rd.data.columns;
                $scope.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.Select = function (item) {
        $scope.Selected = true;
        $scope.Model = angular.copy(item);
        ActiveRow(item);
    };

    $scope.AddUpdate = function () {

        if ($rootScope.ClientModel !== null && $rootScope.ClientModel !== undefined) {
            $scope.Model.EntityId = $rootScope.ClientModel.EntityId;
            $scope.Model.DivisionId = $rootScope.ClientModel.DivisionId;
            $scope.Model.BranchId = $rootScope.ClientModel.BranchId;
            $scope.Model.ClientId = $rootScope.ClientModel.ClientId;
        }

        if (!$scope.Selected) {
            if (frmClientStatutoryInfo.valid()) {
                Service.PostFile("ClientStatutoryInfo/Add", $scope.Model).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        $scope.GetList();
                        CustomizeApp.AddMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        } else {
            if (frmClientStatutoryInfo.valid()) {
                Service.PostFile("ClientStatutoryInfo/Update", $scope.Model).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        $scope.GetList();
                        CustomizeApp.UpdateMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        }
    };

    $scope.Delete = function (item) {
        bootbox.confirm(recordConfirmDelete, function (result) {
            if (result) {
                Service.Post("ClientStatutoryInfo/Delete", { objModel: angular.copy(item) }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.GetList();
                        CustomizeApp.DeleteMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        });
    };

    $scope.Clear = function () {
        $scope.Model = { RenewalRequired: "No", StatutaryStatus: "Active" };
        $scope.Selected = false;
        $("#fuFile").val("");
    };
}

function ClientServiceController($scope, $filter, NgTableParams, Service, $rootScope) {    

    $scope.Model = {};   

    $scope.GetList = function () {
        Service.Get("ClientService/GetList").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ServiceList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetClientAuditTypeDropdown = function () {
        Service.Get("Dropdown/GetClientAuditTypeDropdown").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientAuditTypeList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetClientComplianceList = function () {
        Service.Get("ClientService/GetClientComplianceList/" + $scope.Model.ClientAuditTypeId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientComplianceList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.Add = function () {
        
        if ($scope.Model.ClientAuditTypeId  === undefined) {           
            ShowMessage(1, 'Please select atleast One Service');
            return;
        }

        if ($scope.Model.ClientComplianceIds === undefined || $scope.Model.ClientComplianceIds.length === 0) {            
            ShowMessage(1, 'Please select atleast One Compliance');
            return;
        }

        if ($rootScope.ClientModel !== null && $rootScope.ClientModel !== undefined) {
            $scope.Model.EntityId = $rootScope.ClientModel.EntityId;
            $scope.Model.DivisionId = $rootScope.ClientModel.DivisionId;
            $scope.Model.BranchId = $rootScope.ClientModel.BranchId;
            $scope.Model.ClientId = $rootScope.ClientModel.ClientId;
        }

        Service.Post("ClientService/Add", { objModel: $scope.Model }).then(function (rd) {
            if (rd.data.result === 1) {
                $scope.GetList();
                $scope.GetClientComplianceList();
                CustomizeApp.AddMessage();                
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });

    };

    $scope.Delete = function () {

        if ($scope.Model.ClientServiceIds === undefined || $scope.Model.ClientServiceIds.length === 0) {           
            ShowMessage(1, 'Please select atleast One Selected Compliance');
            return;
        }

        if ($rootScope.ClientModel !== null && $rootScope.ClientModel !== undefined) {
            $scope.Model.EntityId = $rootScope.ClientModel.EntityId;
            $scope.Model.DivisionId = $rootScope.ClientModel.DivisionId;
            $scope.Model.BranchId = $rootScope.ClientModel.BranchId;
            $scope.Model.ClientId = $rootScope.ClientModel.ClientId;
        }

        bootbox.confirm(recordConfirmDelete, function (result) {
            if (result) {
                Service.Post("ClientService/Delete", { objModel: $scope.Model }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.GetList();
                        $scope.GetClientComplianceList();
                        CustomizeApp.DeleteMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        });
    };
}

function ClientEmployeeController($scope, $filter, NgTableParams, Service, $rootScope) {

    $scope.Model = {};

    $scope.GetList = function () {
        Service.Get("ClientEmployee/GetList").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientEmployeeList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetEmployeeList = function () {
        Service.Get("ClientEmployee/GetEmployeeList").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.EmployeeList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.Add = function () {

        if ($scope.Model.EmployeeIds === undefined || $scope.Model.EmployeeIds.length === 0) {
            ShowMessage(1, 'Please select atleast One Employee');
            return;
        }

        if ($rootScope.ClientModel !== null && $rootScope.ClientModel !== undefined) {
            $scope.Model.EntityId = $rootScope.ClientModel.EntityId;
            $scope.Model.DivisionId = $rootScope.ClientModel.DivisionId;
            $scope.Model.BranchId = $rootScope.ClientModel.BranchId;
            $scope.Model.ClientId = $rootScope.ClientModel.ClientId;
        }

        Service.Post("ClientEmployee/Add", { objModel: $scope.Model }).then(function (rd) {
            if (rd.data.result === 1) {
                $scope.GetList();
                $scope.GetEmployeeList();
                CustomizeApp.AddMessage();
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });

    };

    $scope.Delete = function () {

        if ($scope.Model.ClientEmployeeIds === undefined || $scope.Model.ClientEmployeeIds.length === 0) {
            ShowMessage(1, 'Please select atleast One Selected Employee');
            return;
        }

        if ($rootScope.ClientModel !== null && $rootScope.ClientModel !== undefined) {
            $scope.Model.EntityId = $rootScope.ClientModel.EntityId;
            $scope.Model.DivisionId = $rootScope.ClientModel.DivisionId;
            $scope.Model.BranchId = $rootScope.ClientModel.BranchId;
            $scope.Model.ClientId = $rootScope.ClientModel.ClientId;
        }

        bootbox.confirm(recordConfirmDelete, function (result) {
            if (result) {
                Service.Post("ClientEmployee/Delete", { objModel: $scope.Model }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.GetList();
                        $scope.GetEmployeeList();
                        CustomizeApp.DeleteMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        });
    };
}

function DueDateController($scope, $filter, NgTableParams, Service, $rootScope) {
    $scope.GetDueDateList = function () {
        Service.Get("Client/GetDueDateList").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.Columns = rd.data.columns;
                $scope.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };
}

function ClientGroupMemberController($scope, $filter, NgTableParams, Service, $rootScope) {
    $scope.GetClientGroupMemberList = function () {
        Service.Get("Client/GetClientGroupMemberList").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.Columns = rd.data.columns;
                $scope.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };
}

function ClientPortalController($scope, $filter, NgTableParams, Service, $rootScope) {
    var frmClientLogin = $("#frmClientLogin"); frmClientLogin.validate();

    $scope.ClientLoginModel = {};

    $scope.Selected = false;

    $scope.GetClientLogin = function () {
        if ($rootScope.ClientModel !== null && $rootScope.ClientModel !== undefined) {
            $scope.ClientLoginModel.RelativeId = $rootScope.ClientModel.ClientId;

            Service.Get("User/GetClientLogin/" + $scope.ClientLoginModel.RelativeId).then(function (rd) {
                if (rd.data.result !== 0) {
                    if (rd.data.result === 1) {                       
                        $scope.ClientLoginModel = rd.data.model;
                        $scope.ClientLoginModel.CreatedDate = $filter('formatedDate')($scope.ClientLoginModel.CreatedDate, fullDateFormat);
                        $scope.ClientLoginModel.ModifiedDate = $filter('formatedDate')($scope.ClientLoginModel.ModifiedDate, fullDateFormat);
                        $scope.Selected = true;
                    } else {
                        $scope.ClientLoginModel.Email = $rootScope.ClientModel.Email;
                    }
                } else {
                    ShowMessage(rd.data.result, rd.data.ErrorList);
                }
            });
        }
    };

    $scope.AddUpdate = function () {           
        if (!$scope.Selected) {
            if (frmClientLogin.valid()) {
                if ($scope.ClientLoginModel.Password !== $scope.ClientLoginModel.ConfirmPassword) {
                    ShowMessage(1, "Password and Confirm Password does not match.");
                    return;
                }
                if ($rootScope.ClientModel !== null && $rootScope.ClientModel !== undefined) {
                    $scope.ClientLoginModel.UserType = 4;
                    $scope.ClientLoginModel.RelativeId = $rootScope.ClientModel.ClientId;
                }
                Service.Post("User/Add", { objModel: $scope.ClientLoginModel }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.GetClientLogin();
                        CustomizeApp.AddMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        } else {
            if (frmClientLogin.valid()) {
                if ($scope.ClientLoginModel.Password !== $scope.ClientLoginModel.ConfirmPassword) {
                    ShowMessage(1, "Password and Confirm Password does not match.");
                    return;
                }
                Service.Post("User/Update", { objModel: $scope.ClientLoginModel }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.GetClientLogin();
                        CustomizeApp.UpdateMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        }
    };
}

$("#tabClient a").click(function (e) {
    switch (this.hash) {
        case "#tabClientContactInfo":
            $("#ancClientContactInfo").click();
            break;
        case "#tabClientStatutoryInfo":
            $("#ancClientStatutoryInfo").click();
            break;
        case "#tabClientService":
            $("#ancClientService").click();
            break;
        case "#tabClientEmployee":
            $("#ancClientEmployee").click();
            break; 
        case "#tabDueDate":
            $("#ancDueDate").click();
            break;
        case "#tabClientGroupMember":
            $("#ancClientGroupMember").click();
            break;     
        case "#tabClientPortal":
            $("#ancClientLogin").click();
            break;     
    }    
});