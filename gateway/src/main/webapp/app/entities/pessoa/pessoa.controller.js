(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('PessoaController', PessoaController);

    PessoaController.$inject = ['Pessoa'];

    function PessoaController(Pessoa) {

        var vm = this;

        vm.pessoas = [];

        loadAll();

        function loadAll() {
            Pessoa.query(function(result) {
                vm.pessoas = result;
                vm.searchQuery = null;
            });
        }
    }
})();
