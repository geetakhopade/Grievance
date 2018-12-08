angular.module('GR').service('Service', Service);

function Service($http) {

    this.Post = function (url, data) {
        console.log(data)
        return $http.post(baseURL + url, data);
    };

    this.Get = function (url) {
        return $http.get(baseURL + url);
    };

    this.PostFile = function (url, data) {
        return $http.post(baseURL + url, GetModelAsFormData(data), { headers: { 'Content-Type': undefined } });
    };

    //------------------------- Common Function --------------------------//

    var GetModelAsFormData = function (data) {
        var dataAsFormData = new FormData();
        angular.forEach(data, function (value, key) {
            if (key === 'Files') {
                angular.forEach(value, function (value1) { dataAsFormData.append("Files", value1); });
            } else {
                dataAsFormData.append(key, value);
            }
        });
        return dataAsFormData;
    };
}