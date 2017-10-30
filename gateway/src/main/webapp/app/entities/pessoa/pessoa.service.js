(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Pessoa', Pessoa);

    Pessoa.$inject = ['$resource', 'DateUtils'];

    function Pessoa ($resource, DateUtils) {
        var resourceUrl =  'api/pessoas/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.nascimento = DateUtils.convertLocalDateFromServer(data.nascimento);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.nascimento = DateUtils.convertLocalDateToServer(copy.nascimento);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.nascimento = DateUtils.convertLocalDateToServer(copy.nascimento);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
