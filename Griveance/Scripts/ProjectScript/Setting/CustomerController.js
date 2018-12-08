angular.module('CPApp').controller('CRUDController', CRUDController);

function CRUDController($scope, $filter, NgTableParams, Service) {

    var form = $("#frmCRUD");
    $scope.Model = {};
    $scope.Selected = false;

    GetList();

    function GetList() {
        Service.Get("Customer/GetList").then(function (rd) {
            if (rd.data.result !== 0) {
                $scope.Columns = rd.data.columns;
                $scope.List = IntializeTable($filter, NgTableParams, rd.data.list);
            } else {
                ShowMessage(rd.data.result, rd.data.ErrorList);
            }
        });
    }

    $scope.Select = function (item) {
        $scope.Selected = true;
        $scope.Model = angular.copy(item);
        ActiveRow(item);
    };

    $scope.AddUpdate = function () {
        if (!$scope.Selected) {
            if (form.valid()) {
                Service.Post("Customer/Add", { objModel: $scope.Model }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        GetList();
                        CustomizeApp.AddMessage();
                    } else {
                        ShowMessage(rd.data.result, rd.data.ErrorList);
                    }
                });
            }
        } else {
            if (form.valid()) {
                Service.Post("Customer/Update", { objModel: $scope.Model }).then(function (rd) {
                    if (rd.data.result === 1) {
                        $scope.Clear();
                        GetList();
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
                Service.Post("Customer/Delete", { objModel: angular.copy(item) }).then(function (rd) {
                    if (rd.data.result === 1) {
                        GetList();
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