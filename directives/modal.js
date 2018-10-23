angular.module('modals', [])
    .directive('modal', function () {
        return {
            scope: {
                title: '@',
            },
            replace: true, 
            restrict:'E',
            transclude: true,
            templateUrl: 'views/shared/modal.html'
        }
    });