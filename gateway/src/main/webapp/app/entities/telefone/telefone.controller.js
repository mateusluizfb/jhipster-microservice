(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('TelefoneController', TelefoneController);

    TelefoneController.$inject = ['Telefone'];

    function TelefoneController(Telefone) {

        var vm = this;

        vm.telefones = [];

        loadAll();

        function loadAll() {
            Telefone.query(function(result) {
                vm.telefones = result;
                vm.searchQuery = null;
            });
        }
    }
})();
