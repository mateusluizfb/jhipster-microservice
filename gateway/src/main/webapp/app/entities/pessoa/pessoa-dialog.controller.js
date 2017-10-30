(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('PessoaDialogController', PessoaDialogController);

    PessoaDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pessoa', 'Telefone'];

    function PessoaDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pessoa, Telefone) {
        var vm = this;

        vm.pessoa = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.telefones = Telefone.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.pessoa.id !== null) {
                Pessoa.update(vm.pessoa, onSaveSuccess, onSaveError);
            } else {
                Pessoa.save(vm.pessoa, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gatewayApp:pessoaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.nascimento = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
