(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('PessoaDetailController', PessoaDetailController);

    PessoaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pessoa', 'Telefone'];

    function PessoaDetailController($scope, $rootScope, $stateParams, previousState, entity, Pessoa, Telefone) {
        var vm = this;

        vm.pessoa = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gatewayApp:pessoaUpdate', function(event, result) {
            vm.pessoa = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
