(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('TelefoneDetailController', TelefoneDetailController);

    TelefoneDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Telefone', 'Pessoa'];

    function TelefoneDetailController($scope, $rootScope, $stateParams, previousState, entity, Telefone, Pessoa) {
        var vm = this;

        vm.telefone = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gatewayApp:telefoneUpdate', function(event, result) {
            vm.telefone = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
