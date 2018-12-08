angular.module('CPApp').controller('ClientTaskController', ClientTaskController);

function ClientTaskController($scope, $filter, NgTableParams, Service, $rootScope) {

    var form = $("#frmCRUD");

    $scope.ClientTaskModel = { IsBillable: 'Yes', BillingStatusId: 1, Priority: 'Low', CreateSubTask: 0, ViewCreateSubTask: true };

    $scope.Selected = false;

    $scope.GetList = function (id) {
        Service.Get("ClientTask/GetList/" + id).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.Columns = rd.data.columns;
                $scope.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetListForBilling = function (id) {
        Service.Get("ClientTask/GetListForBilling/" + id).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.Columns = rd.data.columns;
                $scope.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetSingal = function (id) {
        Service.Get("ClientTask/GetSingle/" + id).then(function (rd) {
            if (rd.data.result === 1) {
                $scope.ClientTaskModel = rd.data.model;
                $scope.ClientTaskModel.StartDate = $filter('formatedDate')($scope.ClientTaskModel.StartDate, shortDateFormat);
                $scope.ClientTaskModel.EndDate = $filter('formatedDate')($scope.ClientTaskModel.EndDate, shortDateFormat);
                $scope.ClientTaskModel.DueDate = $filter('formatedDate')($scope.ClientTaskModel.DueDate, shortDateFormat);
                $scope.ClientTaskModel.CreatedDate = $filter('formatedDate')($scope.ClientTaskModel.CreatedDate, fullDateFormat);
                $scope.ClientTaskModel.ModifiedDate = $filter('formatedDate')($scope.ClientTaskModel.ModifiedDate, fullDateFormat);
                $scope.GetDivisionByEntityDropdown();
                $scope.GetBranchByDivisionDropdown();
                $scope.GetClientByBranchDropdown();                
                $scope.GetFinancialYeaByClientDropdown();
                $scope.GetClientComplianceByClientAuditTypeDropdown();               
                $scope.GetClientLinkTaskByClientComplianceDropdown();               
                $rootScope.ClientTaskModel = $scope.ClientTaskModel;
            }
            else if (rd.data.result === -1) {
                $rootScope.ClientTaskModel = null;
                ShowMessage(rd.data.result, "There is no record found, redirecting to List Page.", function () {
                    document.location.href = baseURL + "Client/List ";
                });
            }
            else {
                $rootScope.ClientTaskModel = null;
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
        Service.Get("ClientTask/GetAllDropdown").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.EntityList = rd.data.EntityList;
                $scope.ClientAuditTypeList = rd.data.ClientAuditTypeList;
                $scope.WorkStatusList = rd.data.WorkStatusList;
                $scope.BillingStatusList = rd.data.BillingStatusList;  
                $scope.AssignedByList = rd.data.EmployeeList;
                $scope.AssignedToList = rd.data.EmployeeList;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetDivisionByEntityDropdown = function () {
        Service.Get("Dropdown/GetDivisionByEntityDropdown/" + $scope.ClientTaskModel.EntityId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.DivisionList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetBranchByDivisionDropdown = function () {
        Service.Get("Dropdown/GetBranchByDivisionDropdown/" + $scope.ClientTaskModel.DivisionId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.BranchList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetClientByBranchDropdown = function () {
        Service.Get("Dropdown/GetClientByBranchDropdown/" + $scope.ClientTaskModel.BranchId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    }; 

    $scope.GetClientComplianceByClientAuditTypeDropdown = function () {
        Service.Get("Dropdown/GetClientComplianceByClientAuditTypeDropdown/" + $scope.ClientTaskModel.ClientAuditTypeId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientComplianceList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetFinancialYeaByClientDropdown = function () {
        Service.Get("Dropdown/GetFinancialYeaByClientDropdown/" + $scope.ClientTaskModel.ClientId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.FinancialYearList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetClientLinkTaskByClientComplianceDropdown = function () {
        Service.Get("Dropdown/GetClientLinkTaskByClientComplianceDropdown/" + $scope.ClientTaskModel.ClientComplianceId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientLinkTaskList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetClientSubTaskHdrByClientComplianceDropdown = function () {

        if ($scope.ClientTaskModel.CreateSubTask === 0) $scope.ClientTaskModel.CreateSubTask = 1;
        else if ($scope.ClientTaskModel.CreateSubTask === 1) $scope.ClientTaskModel.CreateSubTask = 0;
        if ($scope.ClientTaskModel.CreateSubTask > 0) {
            Service.Get("Dropdown/GetClientSubTaskHdrByClientComplianceDropdown/" + $scope.ClientTaskModel.ClientComplianceId).then(function (rd) {
                if (rd.data.result !== 0) {
                    $scope.ClientSubTaskHdrList = rd.data.list;
                } else {
                    ShowMessage(rd.data.result, rd.data.ErrorList);
                }
            });
        }
    };

    $scope.ChangeIsBillable = function () {        
        if ($scope.ClientTaskModel.IsBillable === "Yes") {
            $scope.ClientTaskModel.BillingStatusId = 1;
        } else {
            $scope.ClientTaskModel.BillingStatusId = null;
        }
    };

    $scope.AddUpdate = function () {
        if (!$scope.Selected) {
            if (form.valid()) {
                Service.Post("ClientTask/Add", { objModel: $scope.ClientTaskModel }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        CustomizeApp.AddMessage();
                        document.location.href = baseURL + "ClientTask/Index/" + rd.data.ClientTaskId;
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        } else {
            if (form.valid()) {
                Service.Post("ClientTask/Update", { objModel: $scope.ClientTaskModel }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        $scope.GetSingal(rd.data.ClientTaskId);
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
                Service.Post("ClientTask/Delete", { objModel: angular.copy(item) }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.GetList(0);
                        CustomizeApp.DeleteMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        });
    };

    $scope.Clear = function () {
        $scope.ClientTaskModel = { IsBillable: 'Yes', BillingStatusId: 1, Priority: 'Low', CreateSubTask: 0, ViewCreateSubTask: true  };        
    };

    //Search

    var frmSearchClientTaskList = $("#frmSearchClientTaskList");
    frmSearchClientTaskList.validate();

    $scope.GetEntityDropdown = function () {
        Service.Get("Dropdown/GetEntityDropdown").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.EntityList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.GetBranchByEntityDropdown = function () {
        Service.Get("Dropdown/GetBranchByEntityDropdown/" + $scope.ClientTaskModel.EntityId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.BranchList = rd.data.list;
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

    $scope.GetSearchClientComplianceDropdown = function () {
        Service.Get("Dropdown/GetClientComplianceByClientAuditTypeDropdown/" + $scope.ClientTaskModel.ClientAuditTypeId).then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.ClientComplianceList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.Search = function () {
        if (frmSearchClientTaskList.valid()) {
            $scope.GetList($scope.ClientTaskModel.ClientComplianceId);
        }
    };

    $scope.BillingSearch = function () {
        if (frmSearchClientTaskList.valid()) {
            $scope.GetListForBilling($scope.ClientTaskModel.ClientComplianceId);
        }
    };

    var frmClientSubTaskTrxn = $("#frmClientSubTaskTrxn");
    $scope.ClientSubTaskTrxn = {};
    $scope.ClientSubTaskTrxn.ViewSubTask = false;
    $scope.ClientSubTaskTrxn.Model = {};

    $scope.ClientSubTaskTrxn.GetEmployeeDropdown = function () {
        Service.Get("Dropdown/GetEmployeeDropdown").then(function (rd) {
            if (rd.data.result !== 0) {                
                $scope.ClientSubTaskTrxn.AssignedToList = rd.data.list;
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };
    
    $scope.ClientSubTaskTrxn.GetList = function (id) {
        Service.Get("ClientSubTaskTrxn/GetList/" + id).then(function (rd) {
            if (rd.data.result !== 0) {
                if (rd.data.list.length > 0) $scope.ClientSubTaskTrxn.ViewSubTask = true;
                $scope.ClientSubTaskTrxn.Columns = rd.data.columns;
                $scope.ClientSubTaskTrxn.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.ClientSubTaskTrxn.Update = function (item) {
        Service.PostFile("ClientSubTaskTrxn/Update", item).then(function (rd) {
            if (rd.data.result === 1) {
                $scope.ClientSubTaskTrxn.GetList($rootScope.ClientTaskModel.ClientTaskId);
                CustomizeApp.UpdateMessage();
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    };

    $scope.ClientSubTaskTrxn.Delete = function (item) {
        bootbox.confirm(recordConfirmDelete, function (result) {
            if (result) {
                Service.Post("ClientSubTaskTrxn/Delete", { objModel: angular.copy(item) }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.ClientSubTaskTrxn.GetList($rootScope.ClientTaskModel.ClientTaskId);
                        CustomizeApp.DeleteMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        });
    };
}