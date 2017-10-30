(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('telefone', {
            parent: 'entity',
            url: '/telefone',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Telefones'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/telefone/telefones.html',
                    controller: 'TelefoneController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('telefone-detail', {
            parent: 'telefone',
            url: '/telefone/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Telefone'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/telefone/telefone-detail.html',
                    controller: 'TelefoneDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Telefone', function($stateParams, Telefone) {
                    return Telefone.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'telefone',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('telefone-detail.edit', {
            parent: 'telefone-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/telefone/telefone-dialog.html',
                    controller: 'TelefoneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Telefone', function(Telefone) {
                            return Telefone.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('telefone.new', {
            parent: 'telefone',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/telefone/telefone-dialog.html',
                    controller: 'TelefoneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                ddd: null,
                                numero: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('telefone', null, { reload: 'telefone' });
                }, function() {
                    $state.go('telefone');
                });
            }]
        })
        .state('telefone.edit', {
            parent: 'telefone',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/telefone/telefone-dialog.html',
                    controller: 'TelefoneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Telefone', function(Telefone) {
                            return Telefone.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('telefone', null, { reload: 'telefone' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('telefone.delete', {
            parent: 'telefone',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/telefone/telefone-delete-dialog.html',
                    controller: 'TelefoneDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Telefone', function(Telefone) {
                            return Telefone.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('telefone', null, { reload: 'telefone' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
